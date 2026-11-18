import { services } from "./services";

/** Options for "What do you need?" on the contact form. */
export const enquiryOptions = [
  ...services.map((s) => s.title),
  "Kwanix demo",
  "FlexiFund demo",
  "WASSCE Analytics demo",
  "Nkabom pilot",
  "AgriConnect partnership or pilot",
  "Something else",
] as const;

/** Maps /contact?product=…&intent=… links from product pages to an option. */
export function optionFromQuery(product: string | null, intent: string | null): string | undefined {
  if (!product) return undefined;
  if (product === "Nkabom") return "Nkabom pilot";
  if (product === "AgriConnect") return "AgriConnect partnership or pilot";
  const match = `${product} ${intent ?? "demo"}`;
  return (enquiryOptions as readonly string[]).includes(match) ? match : undefined;
}

export const contactMethods = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Phone call" },
  { value: "email", label: "Email" },
] as const;
