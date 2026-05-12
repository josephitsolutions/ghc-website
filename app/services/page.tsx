import type { Metadata } from "next";
import Link from "next/link";
import { LightboxImage } from "@/components/media/ImageLightbox";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional cleaning services for upscale homes and commercial properties.",
};

const SERVICES = [
  {
    title: "Signature Glow Reset",
    body:
      "Top-to-bottom cleaning for kitchens, bathrooms, living spaces, and high-impact finish points.",
    image: "/assets/images/floor-gloves.jpg",
    alt: "Floor scrubbing",
  },
  {
    title: "Move-In / Move-Out Shine",
    body:
      "Transition cleaning focused on readiness, detail, and strong first impressions.",
    image: "/assets/images/under-sofa.jpg",
    alt: "Under sofa cleaning",
  },
  {
    title: "Recurring Sparkle Care",
    body:
      "Weekly, biweekly, or monthly maintenance for consistently polished living environments.",
    image: "/assets/images/surface-foam.jpg",
    alt: "Surface foam cleaning",
  },
  {
    title: "Office Glow Service",
    body:
      "Professional care for lobbies, workspaces, restrooms, and breakrooms.",
    image: "/assets/images/medical-mop.jpg",
    alt: "Commercial floor mopping",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Service packages tailored to your property and cadence."
        lead="Select a service track or request a custom scope. Final pricing depends on square footage, condition, and add-ons."
      />
      <section className="mx-auto grid w-full max-w-site gap-10 px-5 pb-24 sm:grid-cols-2 sm:px-8 lg:gap-14 lg:px-12 xl:px-16 2xl:px-20">
        {SERVICES.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.04}>
            <article className="glass-panel-stained flex h-full flex-col gap-6 p-8">
              <div>
                <h2 className="font-serif text-3xl text-ink">{item.title}</h2>
                <p className="mt-4 text-ink-muted">{item.body}</p>
              </div>
              <Link
                href="/booking"
                className="inline-flex w-fit rounded-full border border-ink/10 bg-white/60 px-8 py-3 text-sm font-medium tracking-wide text-ink backdrop-blur-md transition hover:bg-white/90 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.12]"
              >
                Schedule an appointment
              </Link>
              <div className="flex w-full justify-center">
                <LightboxImage
                  src={item.image}
                  alt={item.alt}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
