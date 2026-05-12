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
      <section className="mx-auto w-full max-w-site px-5 pb-12 pt-20 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {eyebrow ? (
          <p className="text-left text-xs uppercase tracking-[0.42em] text-accent sm:text-sm">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mx-auto mt-5 max-w-5xl text-balance text-center font-serif text-4xl tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mx-auto mt-6 max-w-5xl text-balance text-center text-lg leading-relaxed text-ink-muted md:text-xl">
            {lead}
          </p>
        ) : null}
      </section>
    </Reveal>
  );
}
