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
      <section className="mx-auto w-full max-w-site px-5 pb-24 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <div className="glass-panel overflow-hidden rounded-[2rem] p-3 sm:p-4">
            <BookingKoalaEmbed height={1000} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
