import type { Metadata } from "next";
import { ClientLoginForm } from "@/components/forms/ClientLoginForm";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Client Login",
  description: "Client portal login for Glowing Home Cleaners.",
};

export default function ClientLoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Client login"
        title="Secure client access."
        lead="Authenticate against the same MySQL-backed portal foundation introduced in the legacy experience — ready for expansion."
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <div className="glass-panel p-8 sm:p-10">
            <ClientLoginForm />
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="glass-panel space-y-6 p-8 sm:p-10">
            <h2 className="font-serif text-2xl text-ink">Portal ready</h2>
            <p className="text-ink-muted">
              This flow connects to the same database configuration documented in{" "}
              <code className="rounded-md bg-white/50 px-2 py-1 text-sm dark:bg-white/[0.08]">
                dbdetails.php
              </code>{" "}
              at the repository root—ideal for authenticated portals and bespoke client tools.
            </p>
            <p className="text-ink-muted">
              If{" "}
              <code className="rounded-md bg-white/50 px-2 py-1 text-sm dark:bg-white/[0.08]">
                client_users
              </code>{" "}
              does not exist yet, provision it using the SQL included in your deployment notes.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
