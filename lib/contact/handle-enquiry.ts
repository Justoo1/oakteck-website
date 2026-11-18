/**
 * Contact-form handling shared by both hosting targets:
 *   - Vercel:     app/api/contact/route.vercel.ts (Next.js route handler)
 *   - Cloudflare: worker/index.ts (Worker in front of the static export)
 *
 * It must run in Node.js and in the Workers runtime, so it uses only web APIs
 * (fetch, FormData) and relative imports.
 */
import { z } from "zod";
import { contactMethods, enquiryOptions } from "../../content/enquiry-options";
import { rateLimit } from "../rate-limit";
import { siteConfig } from "../../site.config";
import type { ContactField, ContactState } from "./types";

export type EnquiryEnv = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  /** True locally: without an API key, enquiries are logged instead of emailed. */
  isDev: boolean;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s()-]{9,20}$/;
const FIELDS: ContactField[] = ["name", "company", "contact", "service", "message", "preferred"];
const MIN_FILL_MS = 2500;

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

/** Rejects posts from other sites (server actions did this for us before). */
export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // same-origin form posts from some browsers omit it
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function handleEnquiry(formData: FormData, clientIp: string, env: EnquiryEnv): Promise<ContactState> {
  const raw = Object.fromEntries(FIELDS.map((k) => [k, String(formData.get(k) ?? "")]));

  // Honeypot and fill-time checks: bots get a quiet "success" so they don't retry.
  const startedAt = Number(formData.get("startedAt"));
  if (String(formData.get("website") ?? "") !== "" || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return { status: "success" };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField;
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values: raw };
  }

  // Count only messages that would actually be sent, so typos never lock anyone out.
  const limited = rateLimit(`contact:${clientIp}`, { limit: 5, windowMs: 10 * 60 * 1000 });
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

  if (!env.RESEND_API_KEY) {
    if (env.isDev) {
      console.info("[contact] RESEND_API_KEY not set; enquiry not emailed:\n" + text);
      return {
        status: "success",
        message: "Development mode: RESEND_API_KEY is not set, so the enquiry was logged to the server console.",
      };
    }
    console.error("[contact] RESEND_API_KEY is not set");
    return { status: "error", message: "Our form is having trouble right now. Please reach us on WhatsApp or by phone.", values: raw };
  }

  // Resend REST API (https://resend.com/docs/api-reference/emails/send-email).
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || "Oakteck website <onboarding@resend.dev>",
      to: [env.CONTACT_TO_EMAIL || siteConfig.contact.email],
      reply_to: EMAIL.test(d.contact) ? d.contact : undefined,
      subject: `New enquiry: ${d.service} from ${d.name}${d.company ? ` (${d.company})` : ""}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
    return { status: "error", message: "We couldn't send your message. Please try again, or reach us on WhatsApp.", values: raw };
  }
  return { status: "success" };
}

/** JSON response helper used by both entry points. */
export function json(state: ContactState, status = 200) {
  return new Response(JSON.stringify(state), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}
