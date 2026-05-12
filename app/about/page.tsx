import type { Metadata } from "next";
import { LightboxImage } from "@/components/media/ImageLightbox";
import { PageHero } from "@/components/layout/PageHero";
import { ThumbtackEmbeds } from "@/components/reviews/ThumbtackEmbeds";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how Glowing Home Cleaners delivers elite residential and commercial cleaning services in Orange County.",
};

const PILLARS = [
  {
    title: "Residential",
    body: "Estate homes, family homes, condos, and move-in/move-out projects.",
    image: "/assets/images/resident.png",
    alt: "Residential cleaning excellence",
  },
  {
    title: "Commercial",
    body: "Offices, conference spaces, and customer-facing facilities.",
    image: "/assets/images/commerce.png",
    alt: "Commercial cleaning presence",
  },
  {
    title: "Detail-driven",
    body: "Structured checklists backed by dependable execution.",
    image: "/assets/images/detail.png",
    alt: "Detail-driven cleaning standards",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="White-glove standards with an unmistakably Orange County sensibility."
        lead="We support affluent homeowners, executive households, and business operators who expect consistently high standards and polished results."
      />

      <section className="mx-auto grid w-full max-w-site items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 xl:px-16 2xl:px-20">
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
        <Reveal delay={0.06} className="flex justify-center lg:justify-end">
          <LightboxImage
            src="/assets/images/sanitizer-spray.jpg"
            alt="Sanitizing surface"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-site px-5 pb-24 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid gap-8 md:grid-cols-3">
          {PILLARS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.05}>
              <article className="glass-panel flex h-full flex-col p-8">
                <h3 className="font-serif text-2xl text-ink">{card.title}</h3>
                <p className="mt-4 text-ink-muted">{card.body}</p>
                <div className="mt-8 flex flex-1 items-end justify-center">
                  <LightboxImage
                    src={card.image}
                    alt={card.alt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-site px-5 pb-24 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">
            Thumbtack reviews
          </h2>
          <p className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-ink-muted">
            Live star rating and the latest public review from our Thumbtack
            profile — sized to fit phones, tablets, and desktops.
          </p>
        </Reveal>
        <div className="mt-10 w-full min-w-0">
          <ThumbtackEmbeds />
        </div>
      </section>
    </>
  );
}
