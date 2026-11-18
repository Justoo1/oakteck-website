/**
 * POST /api/contact on the Vercel / Node.js build.
 *
 * The `.vercel.ts` extension is only in `pageExtensions` for that build (see
 * next.config.ts), so the Cloudflare static export leaves it out; there,
 * worker/index.ts serves this endpoint instead. Both share handleEnquiry().
 */
import { handleEnquiry, isSameOrigin, json } from "@/lib/contact/handle-enquiry";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json({ status: "error", message: "Forbidden." }, 403);

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  const state = await handleEnquiry(await request.formData(), ip, {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    isDev: process.env.NODE_ENV !== "production",
  });
  return json(state);
}
