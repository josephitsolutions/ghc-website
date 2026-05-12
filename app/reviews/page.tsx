import type { Metadata } from "next";
import { LiveReviewsEmbed } from "@/components/booking/LiveReviewsEmbed";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SociableKitGoogleReviews } from "@/components/reviews/SociableKitGoogleReviews";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read live client feedback and reviews for Glowing Home Cleaners.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client reviews"
        title="Real feedback from recurring and discerning clients."
        lead="BookingKoala testimonials below, plus live Google reviews from our public listing."
      />
      <section className="mx-auto w-full max-w-site space-y-16 px-5 pb-24 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <div className="glass-panel overflow-hidden rounded-[2rem] p-3 sm:p-4">
            <LiveReviewsEmbed height={500} />
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <SociableKitGoogleReviews />
        </Reveal>
      </section>
    </>
  );
}
