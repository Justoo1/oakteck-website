"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { contactMethods, enquiryOptions } from "@/content/enquiry-options";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/site.config";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "company" | "contact" | "service" | "message" | "preferred", string>>;
  values?: Record<string, string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s()-]{9,20}$/;

const schema = z
  .object({
    name: z.string().trim().min(2, "Please tell us your name.").max(100),
    company: z.string().trim().max(120).optional(),
    contact: z
      .string()
      .trim()
      .min(1, "Add a phone number or email so we can reply.")
      .refine((v) => EMAIL.test(v) || PHONE.test(v), "Enter a valid phone number or email address."),
    service: z.enum(enquiryOptions, { message: "Choose what you need." }),
    message: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(4000),
    preferred: z.enum(contactMethods.map((m) => m.value) as ["whatsapp", "call", "email"], {
      message: "Choose how we should contact you.",
    }),
  })
  .superRefine((d, ctx) => {
    if (d.preferred === "email" && !EMAIL.test(d.contact)) {
      ctx.addIssue({ code: "custom", path: ["contact"], message: "Add an email address, or choose WhatsApp or a call." });
    }
    if (d.preferred !== "email" && !PHONE.test(d.contact)) {
      ctx.addIssue({ code: "custom", path: ["contact"], message: "Add a phone number, or choose email." });
    }
  });

const MIN_FILL_MS = 2500;

export async function sendEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(
    ["name", "company", "contact", "service", "message", "preferred"].map((k) => [k, String(formData.get(k) ?? "")]),
  );

  // Honeypot and fill-time checks: bots get a quiet "success" so they don't retry.
  const startedAt = Number(formData.get("startedAt"));
  if (String(formData.get("website") ?? "") !== "" || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return { status: "success" };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["fieldErrors"]>;
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values: raw };
  }

  // Count only messages that would actually be sent, so typos never lock anyone out.
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  const limited = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limited.ok) {
    return {
      status: "error",
      message: "You've sent several messages in a short time. Please wait a few minutes, or reach us on WhatsApp.",
      values: raw,
    };
  }

  const d = parsed.data;
  const method = contactMethods.find((m) => m.value === d.preferred)?.label;
  const text = [
    `Name: ${d.name}`,
    `Company: ${d.company || "-"}`,
    `Phone or email: ${d.contact}`,
    `Preferred contact: ${method}`,
    `Needs: ${d.service}`,
    "",
    d.message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set; enquiry not emailed:\n" + text);
      return { status: "success", message: "Development mode: RESEND_API_KEY is not set, so the enquiry was logged to the server console." };
    }
    console.error("[contact] RESEND_API_KEY is not set");
    return { status: "error", message: "Our form is having trouble right now. Please reach us on WhatsApp or by phone.", values: raw };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Oakteck website <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL || siteConfig.contact.email,
    replyTo: EMAIL.test(d.contact) ? d.contact : undefined,
    subject: `New enquiry: ${d.service} from ${d.name}${d.company ? ` (${d.company})` : ""}`,
    text,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return { status: "error", message: "We couldn't send your message. Please try again, or reach us on WhatsApp.", values: raw };
  }
  return { status: "success" };
}
