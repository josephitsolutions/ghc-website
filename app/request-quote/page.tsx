import type { Metadata } from "next";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Submit your cleaning request for residential or commercial service.",
};

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request quote"
        title="A bespoke scope and estimate — composed around your property."
        lead="Share the essentials; our concierge team aligns pricing with square footage, finishes, and scheduling priorities."
      />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-panel p-8 sm:p-10">
            <QuoteRequestForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
