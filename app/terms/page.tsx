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
      <section className="mx-auto w-full max-w-site px-5 pb-24 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="glass-panel p-8 sm:p-12">
          <LegalHtmlFragment filename="terms-inner.html" />
        </div>
      </section>
    </>
  );
}
