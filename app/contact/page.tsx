import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { LightboxImage } from "@/components/media/ImageLightbox";
import { Reveal } from "@/components/motion/Reveal";
import { GOOGLE_MAPS_EMBED_SRC } from "@/lib/constants";

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
      <section className="mx-auto flex w-full max-w-site flex-col gap-12 px-5 pb-24 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <div className="glass-panel w-full p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-ink">Send a message</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <h2 className="font-serif text-xl text-ink sm:text-2xl">
            Google Maps
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted sm:text-base">
            Our verified listing — half-size map so the page stays easy to scan on
            any screen.
          </p>
          <div className="glass-panel mt-4 w-full max-w-3xl overflow-hidden rounded-[1.5rem] p-2 lg:max-w-[min(100%,36rem)]">
            <iframe
              src={GOOGLE_MAPS_EMBED_SRC}
              width="100%"
              height={225}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Glowing Home Cleaners on Google Maps"
              className="block h-[200px] w-full rounded-[1.15rem] sm:h-[225px]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.06} className="flex justify-center">
          <LightboxImage
            src="/assets/images/office-boardroom.jpg"
            alt="Commercial boardroom cleaning"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </Reveal>
      </section>
    </>
  );
}
