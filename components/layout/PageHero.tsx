import { Reveal } from "@/components/motion/Reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="text-[11px] uppercase tracking-[0.42em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-5 max-w-4xl font-serif text-4xl tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
            {lead}
          </p>
        ) : null}
      </section>
    </Reveal>
  );
}
