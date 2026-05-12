import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Cleaning Checklist",
  description:
    "Detailed standard, deep, move, Airbnb, post-construction, and commercial cleaning checklist for Orange County properties.",
};

async function loadFragment(name: string) {
  const fullPath = path.join(process.cwd(), "content", name);
  return fs.readFile(fullPath, "utf8");
}

export default async function ChecklistPage() {
  const [standard, deep, move] = await Promise.all([
    loadFragment("checklist-standard-inner.html"),
    loadFragment("checklist-deep-inner.html"),
    loadFragment("checklist-move-inner.html"),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Detailed service checklist"
        title="Your service scope in writing before the appointment begins."
        lead="This page outlines each checklist by service type and room category for complete clarity."
      />
      <section className="mx-auto w-full max-w-site px-5 pb-24 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <Reveal>
            <article className="glass-panel checklist-card p-8">
              <h3>Standard</h3>
              <div dangerouslySetInnerHTML={{ __html: standard }} />
            </article>
          </Reveal>
          <Reveal delay={0.05}>
            <article className="glass-panel checklist-card p-8">
              <h3>Deep</h3>
              <div dangerouslySetInnerHTML={{ __html: deep }} />
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="glass-panel checklist-card p-8">
              <h3>Move In / Out</h3>
              <div dangerouslySetInnerHTML={{ __html: move }} />
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
