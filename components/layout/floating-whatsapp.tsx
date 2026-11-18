import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { whatsappLink } from "@/site.config";

/** Floating WhatsApp button, mobile and tablet only. */
export function FloatingWhatsApp() {
  return (
    <aside aria-label="Quick contact" className="lg:hidden">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Oakteck on WhatsApp"
        className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 inline-flex size-14 items-center justify-center rounded-full bg-[#0E7A40] text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.45)] ring-4 ring-white/70 transition-transform active:scale-95"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </aside>
  );
}
