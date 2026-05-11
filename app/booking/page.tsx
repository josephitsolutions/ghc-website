import type { Metadata } from "next";
import { BookingKoalaEmbed } from "@/components/booking/BookingKoalaEmbed";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Schedule an Appointment",
  description:
    "Schedule your cleaning appointment online with Glowing Home Cleaners.",
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Schedule an appointment — quietly, confidently, online."
        lead="Use our live BookingKoala experience below to reserve residential or commercial cleaning with real-time availability."
      />
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-panel overflow-hidden rounded-[2rem] p-3 sm:p-4">
            <BookingKoalaEmbed height={1000} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
