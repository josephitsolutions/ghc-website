import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Glowing Home Cleaners for premium residential and commercial service requests.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your property and your aspirations for it."
        lead="We respond quickly with service guidance, availability, and next steps — always with discretion."
      />
      <section className="mx-auto flex max-w-3xl flex-col gap-12 px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-panel w-full p-8 sm:p-10">
            <h2 className="font-serif text-2xl text-ink">Send a message</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mx-auto w-fit max-w-full rounded-2xl border border-white/40 bg-white/30 p-[10px] shadow-glass backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06] dark:shadow-glass-dark">
            <Image
              src="/assets/images/blinds-clean.jpg"
              alt="Window blind cleaning"
              width={2400}
              height={1600}
              sizes="(max-width: 768px) 100vw, 896px"
              className="block h-auto max-h-[min(70vh,52rem)] w-auto max-w-full rounded-xl object-contain"
              priority={false}
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
