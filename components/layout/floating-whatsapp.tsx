import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/site.config";

/** Floating WhatsApp button, mobile and tablet only. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Oakteck on WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 inline-flex size-14 items-center justify-center rounded-full bg-[#128C4A] text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.45)] ring-4 ring-white/70 transition-transform active:scale-95 lg:hidden"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
