"use client";

import { useActionState, useEffect, useRef, useSyncExternalStore } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { sendEnquiry, type ContactState } from "@/app/contact/actions";
import { contactMethods, enquiryOptions, optionFromQuery } from "@/content/enquiry-options";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/site.config";

const initial: ContactState = { status: "idle" };

// ?product=…&intent=… links from product-page CTAs preselect "What do you need?".
const noopSubscribe = () => () => {};
function readPrefill() {
  const q = new URLSearchParams(window.location.search);
  return optionFromQuery(q.get("product"), q.get("intent")) ?? "";
}

const field =
  "mt-2 block w-full rounded-xl border border-input bg-white px-4 py-3 text-base text-ink shadow-xs transition-colors placeholder:text-muted/70 hover:border-muted/60 focus:border-blue-600 focus:outline-none focus-visible:ring-3 focus-visible:ring-blue-500/25 aria-invalid:border-destructive";

function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-heading text-sm font-semibold text-ink">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const prefill = useSyncExternalStore(noopSubscribe, readPrefill, () => "");
  const startedAtRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const v = state.values ?? {};
  const err = state.fieldErrors ?? {};

  // When the form was opened, for the server's fill-time check. Written to
  // defaultValue so it survives React's automatic form reset.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.defaultValue = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error" && state.fieldErrors) {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-3xl bg-white p-8 text-center ring-1 ring-line outline-none sm:p-12"
      >
        <CheckCircle2 className="mx-auto size-12 text-emerald-600" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-bold text-ink">Thank you. Your message is on its way.</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          We&apos;ll get back to you using the contact method you chose. If it&apos;s urgent, message us on WhatsApp.
        </p>
        {state.message && <p className="mx-auto mt-4 max-w-md rounded-lg bg-paper p-3 text-sm text-muted">{state.message}</p>}
        <Button asChild variant="whatsapp" size="lg" className="mt-8">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-5" /> Chat on WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  const describe = (id: string, hint = false) =>
    [hint && `${id}-hint`, err[id as keyof typeof err] && `${id}-error`].filter(Boolean).join(" ") || undefined;

  return (
    <form
      ref={formRef}
      action={action}
      noValidate
      className="space-y-6 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-10"
      aria-describedby={state.status === "error" ? "form-status" : undefined}
    >
      {state.status === "error" && state.message && (
        <p id="form-status" role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-medium text-destructive ring-1 ring-red-200">
          {state.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Your name" error={err.name}>
          <input id="name" name="name" autoComplete="name" required defaultValue={v.name} aria-invalid={!!err.name} aria-describedby={describe("name")} className={field} />
        </Field>
        <Field id="company" label="Company" optional error={err.company}>
          <input id="company" name="company" autoComplete="organization" defaultValue={v.company} className={field} />
        </Field>
      </div>

      <Field id="contact" label="Phone or email" hint="We'll reply on this." error={err.contact}>
        <input
          id="contact"
          name="contact"
          autoComplete="on"
          inputMode="email"
          required
          defaultValue={v.contact}
          aria-invalid={!!err.contact}
          aria-describedby={describe("contact", true)}
          className={field}
          placeholder="+233 … or you@company.com"
        />
      </Field>

      <Field id="service" label="What do you need?" error={err.service}>
        <select
          id="service"
          name="service"
          required
          // Uncontrolled on purpose: React resets forms after an action, and a
          // defaultValue survives that reset where controlled state would not.
          // The key remounts it when the default changes (prefill or returned values).
          key={v.service || prefill || "none"}
          defaultValue={v.service || prefill || ""}
          aria-invalid={!!err.service}
          aria-describedby={describe("service")}
          className={cn(field, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234A5868%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10")}
        >
          <option value="" disabled>
            Choose one…
          </option>
          {enquiryOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Message" hint="What happens today, and what would you like to change?" error={err.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={v.message}
          aria-invalid={!!err.message}
          aria-describedby={describe("message", true)}
          className={cn(field, "resize-y")}
        />
      </Field>

      <fieldset aria-describedby={err.preferred ? "preferred-error" : undefined}>
        <legend className="font-heading text-sm font-semibold text-ink">How should we contact you?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {contactMethods.map((m) => (
            <label
              key={m.value}
              className="relative flex cursor-pointer items-center gap-2 rounded-full border border-input bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors has-checked:border-blue-600 has-checked:bg-blue-600/5 has-checked:text-blue-700 has-focus-visible:ring-3 has-focus-visible:ring-blue-500/30"
            >
              <input
                type="radio"
                name="preferred"
                value={m.value}
                defaultChecked={(v.preferred || "whatsapp") === m.value}
                className="size-4 accent-blue-600"
              />
              {m.label}
            </label>
          ))}
        </div>
        {err.preferred && (
          <p id="preferred-error" className="mt-1.5 text-sm font-medium text-destructive">
            {err.preferred}
          </p>
        )}
      </fieldset>

      {/* Spam protection: a field people never see, and the time the form was opened. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" />

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
          {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
          {pending ? "Sending…" : "Send message"}
        </Button>
        <p className="text-sm text-muted">
          We use your details only to reply. See our{" "}
          <a href="/privacy" className="link-underline text-blue-600">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
