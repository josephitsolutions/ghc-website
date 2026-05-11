import type { Metadata } from "next";
import { LightboxImage } from "@/components/media/ImageLightbox";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how Glowing Home Cleaners delivers elite residential and commercial cleaning services in Orange County.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="White-glove standards with an unmistakably Orange County sensibility."
        lead="We support affluent homeowners, executive households, and business operators who expect consistently high standards and polished results."
      />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <div className="space-y-6 text-lg leading-relaxed text-ink-muted">
            <h2 className="font-serif text-3xl text-ink md:text-4xl">
              Our promise
            </h2>
            <p>
              From floors and fixtures to overlooked detail zones, our teams
              deliver a clean that feels intentional, fresh, and camera-ready.
            </p>
            <p>
              We focus on discreet professionalism, schedule reliability, and
              service quality that reflects the lifestyle and brand image of our
              clients.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="glass-panel relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <LightboxImage
              src="/assets/images/sanitizer-spray.jpg"
              alt="Sanitizing surface"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Residential",
              body: "Estate homes, family homes, condos, and move-in/move-out projects.",
            },
            {
              title: "Commercial",
              body: "Offices, conference spaces, and customer-facing facilities.",
            },
            {
              title: "Detail-driven",
              body: "Structured checklists backed by dependable execution.",
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 0.05}>
              <article className="glass-panel h-full p-8">
                <h3 className="font-serif text-2xl text-ink">{card.title}</h3>
                <p className="mt-4 text-ink-muted">{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <Reveal>
            <div className="glass-panel relative aspect-[4/5] overflow-hidden">
              <LightboxImage
                src="/assets/images/cleaning-kit.jpg"
                alt="Cleaning supplies"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="glass-panel relative aspect-[4/5] overflow-hidden">
              <LightboxImage
                src="https://images.unsplash.com/photo-1669101602108-fa5ba89507ee?auto=format&fit=max&w=1400&q=80"
                alt="Detailed commercial cleaning"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-panel relative aspect-[4/5] overflow-hidden">
              <LightboxImage
                src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=max&w=1400&q=80"
                alt="Conference room interior"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
