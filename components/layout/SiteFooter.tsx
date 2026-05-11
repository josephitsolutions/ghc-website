import Image from "next/image";
import Link from "next/link";
import { JITS_URL, SITE_EMAIL } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/30 bg-canvas-muted/80 py-16 dark:border-white/10">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <section className="space-y-4">
          <h3 className="font-serif text-xl text-ink">Glowing Home Cleaners</h3>
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
            Affluent residential and high-standard commercial cleaning across
            Orange County — composed, meticulous, and quietly exceptional.
          </p>
          <p>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="text-sm text-accent underline-offset-4 hover:underline"
            >
              {SITE_EMAIL}
            </a>
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-lg text-ink">Concierge</h3>
          <FooterLink href="/request-quote">Request Quote</FooterLink>
          <FooterLink href="/checklist">Checklist</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/client-login">Client Login</FooterLink>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-lg text-ink">Legal</h3>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/40 bg-white/40 p-6 text-center shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-glass-dark">
          <p className="font-serif text-base text-ink">Crafted for distinction.</p>
          <p className="text-xs uppercase tracking-[0.35em] text-ink-subtle">
            Digital presence
          </p>
          <a
            href={JITS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center"
            title="Joseph IT Solutions"
          >
            <Image
              src="/assets/images/JLit.png"
              alt="JL IT — website design"
              width={280}
              height={120}
              className="h-auto max-w-[220px] opacity-90 transition-opacity hover:opacity-100"
            />
          </a>
        </section>
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-4 text-center text-xs text-ink-subtle sm:px-6 lg:px-8">
        <small>
          &copy; {year} Glowing Home Cleaners. All rights reserved.
        </small>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <p>
      <Link
        href={href}
        className="text-sm text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
      >
        {children}
      </Link>
    </p>
  );
}
