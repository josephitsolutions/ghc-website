import type { Metadata } from "next";
import { LegalHtmlFragment } from "@/components/legal/LegalHtmlFragment";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Glowing Home Cleaners website forms, communications, and customer data handling.",
};

export default async function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead='Glowing Home Cleaners ("us", "we", or "our") operates the www.glowinghomecleaners.com website (hereinafter referred to as the "Service").'
      />
      <section className="mx-auto w-full max-w-site px-5 pb-24 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="glass-panel p-8 sm:p-12">
          <LegalHtmlFragment filename="privacy-inner.html" />
        </div>
      </section>
    </>
  );
}
