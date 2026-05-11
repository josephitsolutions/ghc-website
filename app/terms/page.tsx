import type { Metadata } from "next";
import { LegalHtmlFragment } from "@/components/legal/LegalHtmlFragment";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Glowing Home Cleaners residential, commercial, and turnover cleaning services in Orange County.",
};

export default async function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        lead="The Terms of Service is a referral agreement made between Glowing Home Cleaners Referral Agency and the client."
      />
      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12">
          <LegalHtmlFragment filename="terms-inner.html" />
        </div>
      </section>
    </>
  );
}
