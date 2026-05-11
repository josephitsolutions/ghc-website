import { Reveal } from "@/components/motion/Reveal";

/** Published testimonials aligned with `testimonials` seed data in mrbonezc_ghc.sql */
const VOICES = [
  {
    name: "Amanda R.",
    role: "Local homeowner",
    quote:
      "The house looked brighter the second I walked in. Every surface had that polished, cared-for feeling.",
  },
  {
    name: "Marcus T.",
    role: "Rental owner",
    quote:
      "They made our turnover effortless. Fast, detailed, and the place photographed beautifully.",
  },
  {
    name: "Jenna L.",
    role: "Office manager",
    quote:
      "Our office finally feels as professional as it looks. The glow is real.",
  },
];

export function SignatureTestimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.42em] text-accent">
          Voices of discernment
        </p>
        <h2 className="mt-5 font-serif text-3xl text-ink md:text-4xl">
          Trust, articulated quietly.
        </h2>
        <p className="mt-4 max-w-2xl text-ink-muted">
          Discretion is part of the service — here are a few clients who chose to
          share how it feels when detail meets dependability.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {VOICES.map((voice, i) => (
          <Reveal key={voice.name} delay={i * 0.06}>
            <figure className="glass-panel flex h-full flex-col justify-between p-8">
              <blockquote className="font-serif text-xl leading-snug text-ink">
                “{voice.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-ink/10 pt-6 text-sm text-ink-muted dark:border-white/10">
                <span className="font-medium text-ink">{voice.name}</span>
                <span className="block text-ink-subtle">{voice.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
