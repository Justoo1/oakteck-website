/**
 * Cloudflare Worker for the static export (wrangler.jsonc).
 *
 * Static files in out/ are served by Cloudflare directly, before this Worker
 * runs (only /api/* reaches it, see `run_worker_first`), so page views use no
 * Worker requests or CPU. The Worker only handles the contact form.
 */
import { handleEnquiry, isSameOrigin, json } from "../lib/contact/handle-enquiry";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  /** Set to "development" in .dev.vars for local testing. */
  ENVIRONMENT?: string;
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
      if (!isSameOrigin(request)) return json({ status: "error", message: "Forbidden." }, 403);

      const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
      const state = await handleEnquiry(await request.formData(), ip, {
        RESEND_API_KEY: env.RESEND_API_KEY,
        CONTACT_TO_EMAIL: env.CONTACT_TO_EMAIL,
        CONTACT_FROM_EMAIL: env.CONTACT_FROM_EMAIL,
        isDev: env.ENVIRONMENT === "development",
      });
      return json(state);
    }

    // Anything else under /api/* that isn't a static file.
    return env.ASSETS.fetch(request);
  },
};

export default worker;
