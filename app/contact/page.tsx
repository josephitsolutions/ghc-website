import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { LightboxImage } from "@/components/media/ImageLightbox";
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

        <Reveal delay={0.06} className="flex justify-center">
          <LightboxImage
            src="/assets/images/blinds-clean.jpg"
            alt="Window blind cleaning"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </Reveal>
      </section>
    </>
  );
}
