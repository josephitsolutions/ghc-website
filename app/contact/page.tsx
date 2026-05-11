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
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <div className="glass-panel p-8 sm:p-10">
            <h2 className="font-serif text-2xl text-ink">Send a message</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="glass-panel relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:aspect-auto lg:min-h-[520px]">
            <LightboxImage
              src="/assets/images/blinds-clean.jpg"
              alt="Window blind cleaning"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
