import { sectors } from "@/content/services";
import { industryIcons } from "@/components/icons";

export function TrustStrip() {
  return (
    <section aria-labelledby="sectors-title" className="border-b border-line bg-white">
      <div className="container-page py-10 lg:py-12">
        <h2 id="sectors-title" className="eyebrow text-center text-muted">
          Software built for Ghanaian businesses in
        </h2>
        <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {sectors.map((s) => {
            const Icon = industryIcons[s.icon];
            return (
              <li key={s.label} className="flex flex-col items-center gap-2.5 text-center">
                <span className="flex size-11 items-center justify-center rounded-full bg-paper text-blue-600 ring-1 ring-line">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="max-w-[11rem] text-sm leading-snug font-medium text-ink">{s.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
