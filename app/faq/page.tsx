import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about scheduling, supplies, and service expectations.",
};

const ITEMS = [
  {
    q: "Do you handle luxury homes and estate properties?",
    a: "Yes. We regularly service high-end residences and tailor checklists for premium finishes and detail-sensitive materials.",
  },
  {
    q: "Do you also provide commercial cleaning?",
    a: "Yes. We service offices, conference spaces, and customer-facing areas with recurring schedules available.",
  },
  {
    q: "How do I schedule an appointment?",
    a: "Use our appointment scheduling page for live availability, or request a custom quote for non-standard scopes.",
  },
  {
    q: "Are supplies included?",
    a: "Core professional cleaning supplies are typically included. Specialized materials can be discussed in advance.",
  },
] as const;

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Answers before your appointment."
        lead="Clarity is part of the luxury — a few essentials clients ask before the first visit."
      />
      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-24 sm:px-6 lg:px-8">
        {ITEMS.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.04}>
            <details
              className="glass-panel group p-8 open:shadow-lg"
              open={i === 0}
            >
              <summary className="cursor-pointer list-none font-serif text-xl text-ink outline-none transition marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-6">
                  {item.q}
                  <span
                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/10 text-lg leading-none text-ink-muted transition group-open:rotate-45 dark:border-white/10"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-6 text-ink-muted">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </section>
    </>
  );
}
