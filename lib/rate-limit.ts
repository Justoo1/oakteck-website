/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * It is per server instance: on Vercel each warm function instance keeps its
 * own counts, so this stops casual abuse, not a determined attacker. For a
 * shared limit, swap in Upstash Redis (@upstash/ratelimit) behind the same API.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false as const, retryAfterMs: windowMs - (now - recent[0]) };
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // bound memory
  return { ok: true as const };
}
