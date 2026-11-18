import { whatsappIcon } from "./brand-icons";

/** WhatsApp glyph (Simple Icons, CC0). Kept on its own so client components don't pull in other icons. */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d={whatsappIcon.path} />
    </svg>
  );
}
