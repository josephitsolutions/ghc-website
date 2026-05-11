import Link from "next/link";
import { CinematicHero } from "@/components/home/CinematicHero";
import { FeaturedPortfolioCarousel } from "@/components/home/FeaturedPortfolioCarousel";
import { GooglePlacesInsights } from "@/components/google/GooglePlacesInsights";
import { LightboxImage } from "@/components/media/ImageLightbox";
import { Reveal } from "@/components/motion/Reveal";
import { GOOGLE_MAPS_EMBED_SRC } from "@/lib/constants";

const PORTFOLIO_REMOTE = [
  {
    src: "https://images.unsplash.com/photo-1580256081112-e49377338b7f?auto=format&fit=max&w=1400&q=80",
    alt: "Cleaner polishing interior",
  },
  {
    src: "https://images.unsplash.com/photo-1758273238594-9a9d6c20eaa2?auto=format&fit=max&w=1400&q=80",
    alt: "Modern kitchen cleaning setup",
  },
  {
    src: "https://images.unsplash.com/photo-1740657254989-42fe9c3b8cce?auto=format&fit=max&w=1400&q=80",
    alt: "Luxury interior detail cleaning",
  },
];

export default function HomePage() {
  return (
    <>
      <GooglePlacesInsights mode="rating-only" />
      <CinematicHero />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.42em] text-accent">
            Premium residential + commercial
          </p>
          <h2 className="mt-5 font-serif text-4xl tracking-tight text-ink md:text-5xl">
            Polished spaces for elevated homes and standout businesses.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted md:text-xl">
            Glowing Home Cleaners delivers elevated results for affluent
            residences, offices, and specialty properties with refined attention
            to detail, reliable service windows, and communication that honors
            your time.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-medium tracking-wide text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90"
            >
              Schedule an appointment
            </Link>
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center rounded-full border border-ink/10 bg-white/50 px-8 py-3 text-sm font-medium tracking-wide text-ink backdrop-blur-md transition hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
            >
              Request custom quote
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-medium tracking-wide text-accent underline-offset-8 hover:underline"
            >
              Explore services
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass-panel relative aspect-[4/5] min-h-[240px] w-full overflow-hidden rounded-[2rem] sm:min-h-[280px]">
            <LightboxImage
              src="/assets/images/hero-hallway.jpg"
              alt="Premium hallway cleaning cart"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
          <Reveal>
            <article
              className="glass-panel flex h-full min-h-[260px] flex-col justify-between gap-4 p-8"
              id="googleRatingCard"
            >
              <div
                className="flex gap-1 text-accent"
                id="googleStarsRow"
                role="img"
                aria-label="Google rating: 5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="google-star google-star--filled"
                    viewBox="0 0 24 24"
                    width={26}
                    height={26}
                    aria-hidden
                  >
                    <path
                      fill="currentColor"
                      d="M12 3.1l2.6 5.4 6 .9-4.3 4.2 1 5.9L12 17.9l-5.3 2.8 1-5.9-4.3-4.2 6-.9L12 3.1z"
                    />
                  </svg>
                ))}
              </div>
              <p className="font-serif text-2xl text-ink">
                <span id="googleRatingValue">5.0</span>{" "}
                <span className="text-base font-sans text-ink-muted">
                  from Google
                </span>
              </p>
              <p className="text-sm leading-relaxed text-ink-muted">
                Luxury-level quality controls and service consistency — verified
                where it matters.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.05}>
            <article className="glass-panel flex h-full min-h-[260px] flex-col justify-between gap-3 p-8">
              <p className="font-serif text-4xl text-accent sm:text-5xl">5 min</p>
              <p className="text-sm leading-relaxed text-ink-muted">
                We respond within five minutes during office hours — scheduling
                support when you need it.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="glass-panel flex h-full min-h-[260px] flex-col justify-between gap-3 p-8">
              <p className="font-serif text-5xl text-accent">100%</p>
              <p className="text-sm leading-relaxed text-ink-muted">
                Mobile-optimized scheduling, forms, and support pages.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">
            Featured spaces we serve
          </h2>
          <p className="mt-4 max-w-2xl text-ink-muted">
            A quiet portfolio of residential polish and commercial presence —
            always photographed with intent.
          </p>
        </Reveal>
        <div className="mt-12">
          <FeaturedPortfolioCarousel />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">
            Checklist snapshot
          </h2>
          <p className="mt-4 max-w-2xl text-ink-muted">
            Scope clarity before every appointment — tailored tiers with room-by-room discipline.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Standard",
              body:
                "Dusting, kitchens, bathrooms, floors, trash handling, and staging touches.",
            },
            {
              title: "Deep Clean",
              body:
                "Adds windowsills/blinds, inside microwave, baseboards, tile/grout detailing.",
            },
            {
              title: "Move In/Out",
              body:
                "Adds interior cabinets, fridge/freezer/stove interior, full transition prep.",
            },
          ].map((card) => (
            <Reveal key={card.title}>
              <article className="glass-panel h-full p-8">
                <h3 className="font-serif text-2xl text-ink">{card.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/checklist"
            className="inline-flex rounded-full border border-ink/10 bg-white/50 px-8 py-3 text-sm font-medium tracking-wide text-ink backdrop-blur-md transition hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.06]"
          >
            View full checklist
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">
            Google Business Profile
          </h2>
          <p className="mt-4 max-w-2xl text-ink-muted">
            Our verified Google listing — map, hours, reviews, and more — in
            the same experience visitors see on Google Maps.
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="glass-panel mt-10 overflow-hidden rounded-[2rem] p-2">
            <iframe
              src={GOOGLE_MAPS_EMBED_SRC}
              width="100%"
              height={450}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Glowing Home Cleaners on Google Maps"
              className="aspect-video min-h-[280px] w-full rounded-[1.6rem] md:aspect-auto md:min-h-[450px]"
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">
            Additional portfolio imagery
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PORTFOLIO_REMOTE.map((img) => (
            <Reveal key={img.src}>
              <article className="glass-panel relative aspect-[4/5] overflow-hidden">
                <LightboxImage
                  src={img.src}
                  alt={img.alt}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
