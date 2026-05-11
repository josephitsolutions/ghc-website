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
      <section className="mx-auto max-w-6xl space-y-16 px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-panel overflow-hidden rounded-[2rem] p-3 sm:p-4">
            <LiveReviewsEmbed height={500} />
          </div>
        </Reveal>
        <div id="googleReviews" className="min-h-[120px]" />
      </section>
    </>
  );
}
