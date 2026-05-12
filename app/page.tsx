import Link from "next/link";
import { CinematicHero } from "@/components/home/CinematicHero";
import { FeaturedPortfolioCarousel } from "@/components/home/FeaturedPortfolioCarousel";
import { GooglePlacesInsights } from "@/components/google/GooglePlacesInsights";
import { LightboxImage } from "@/components/media/ImageLightbox";
import { Reveal } from "@/components/motion/Reveal";

export default function HomePage() {
  return (
    <>
      <GooglePlacesInsights mode="rating-and-reviews" />
      <CinematicHero />

      <section className="mx-auto grid w-full max-w-site items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.42em] text-accent sm:text-sm">
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
        <Reveal
          delay={0.08}
          className="flex w-full justify-center lg:justify-end"
        >
          <LightboxImage
            src="/assets/images/hero-hallway.jpg"
            alt="Premium hallway cleaning cart"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-site px-5 py-12 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
          <Reveal>
            <article
              className="glass-panel-stained flex h-full min-h-[300px] flex-col items-center justify-center gap-8 p-8 text-center"
              id="googleRatingCard"
            >
              <div
                className="flex w-full justify-center gap-1.5 text-accent"
                id="googleStarsRow"
                role="img"
                aria-label="Google rating: 5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="google-star google-star--filled"
                    viewBox="0 0 24 24"
                    width={30}
                    height={30}
                    aria-hidden
                  >
                    <path
                      fill="currentColor"
                      d="M12 3.1l2.6 5.4 6 .9-4.3 4.2 1 5.9L12 17.9l-5.3 2.8 1-5.9-4.3-4.2 6-.9L12 3.1z"
                    />
                  </svg>
                ))}
              </div>
              <p className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
                <span id="googleRatingValue">5.0</span>{" "}
                <span className="font-serif text-4xl text-ink-muted sm:text-5xl">
                  from Google
                </span>
              </p>
              <p className="max-w-sm text-base leading-relaxed text-ink-muted sm:text-lg">
                Luxury-level quality controls and service consistency — verified
                where it matters.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.05}>
            <article className="glass-panel-stained flex h-full min-h-[300px] flex-col items-center justify-center gap-8 p-8 text-center">
              <p className="font-serif text-4xl text-accent sm:text-5xl">5 min</p>
              <p className="max-w-sm text-base leading-relaxed text-ink-muted sm:text-lg">
                We respond within five minutes during office hours — scheduling
                support when you need it.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="glass-panel-stained flex h-full min-h-[300px] flex-col items-center justify-center gap-8 p-8 text-center">
              <p className="font-serif text-4xl text-accent sm:text-5xl">100%</p>
              <p className="max-w-sm text-base leading-relaxed text-ink-muted sm:text-lg">
                Mobile-optimized scheduling, forms, and support pages.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-site px-5 py-16 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">
            Featured spaces we serve
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-left text-ink-muted">
            A quiet portfolio of residential polish and commercial presence —
            always photographed with intent.
          </p>
        </Reveal>
        <div className="mt-12">
          <FeaturedPortfolioCarousel />
        </div>
      </section>

      <section className="mx-auto w-full max-w-site px-5 py-16 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">
            Checklist snapshot
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-left text-ink-muted">
            Scope clarity before every appointment — tailored tiers with
            room-by-room discipline.
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
                <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/checklist"
            className="inline-flex rounded-full border border-ink/10 bg-white/50 px-8 py-3 text-sm font-medium tracking-wide text-ink backdrop-blur-md transition hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.06]"
          >
            View full checklist
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-site px-5 py-16 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">
            Google reviews
          </h2>
          <p className="mt-4 max-w-3xl text-pretty text-left text-base text-ink-muted sm:text-lg">
            Verified snippets from our Google Business Profile. The map lives on
            the{" "}
            <Link href="/contact" className="text-accent underline-offset-4 hover:underline">
              Contact
            </Link>{" "}
            page — here we highlight what clients share publicly on Google.
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div
            id="googleReviews"
            className="mt-10 min-h-[10rem] w-full text-sm text-ink-muted"
          >
            <p className="glass-panel p-6 text-base">
              Loading verified Google reviews…
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
