import type { Metadata } from "next";
import { LiveReviewsEmbed } from "@/components/booking/LiveReviewsEmbed";
import { GooglePlacesInsights } from "@/components/google/GooglePlacesInsights";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read live client feedback and reviews for Glowing Home Cleaners.",
};

export default function ReviewsPage() {
  return (
    <>
      <GooglePlacesInsights mode="rating-and-reviews" />
      <PageHero
        eyebrow="Client reviews"
        title="Real feedback from recurring and discerning clients."
        lead="Live BookingKoala testimonials below, complemented by highlights sourced from Google when available."
      />
      <section className="mx-auto w-full max-w-site space-y-16 px-5 pb-24 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <div className="glass-panel overflow-hidden rounded-[2rem] p-3 sm:p-4">
            <LiveReviewsEmbed height={500} />
          </div>
        </Reveal>
        <div id="googleReviews" className="min-h-[10rem] w-full">
          <p className="glass-panel p-6 text-base text-ink-muted">
            Loading verified Google reviews…
          </p>
        </div>
      </section>
    </>
  );
}
