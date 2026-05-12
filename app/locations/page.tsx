import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { LOCATIONS } from "@/lib/locations-data";

export const metadata: Metadata = {
  title: "Service Locations",
  description:
    "Orange County and nearby service cities covered by Glowing Home Cleaners.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Areas we proudly serve."
        lead="Premium cleaning across Orange County and neighboring communities — each enclave with its own character, every home treated with the same quiet precision."
      />
      <section
        className="mx-auto grid w-full max-w-site gap-6 px-5 pb-24 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:gap-8 lg:px-12 xl:px-16 2xl:px-20"
        aria-label="Service areas"
      >
        {LOCATIONS.map((loc, i) => (
          <Reveal key={loc.city} delay={(i % 6) * 0.02}>
            <article className="glass-panel-stained flex h-full flex-col gap-4 p-8">
              <h2 className="font-serif text-2xl text-ink">{loc.city}</h2>
              <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                {loc.blurb}
              </p>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
