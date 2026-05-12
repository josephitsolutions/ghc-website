import Image from "next/image";
import Link from "next/link";
import { JITS_URL, SITE_EMAIL } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="glass-strip border-t border-emerald-200/35 dark:border-emerald-500/15">
      <div className="mx-auto flex w-full max-w-site flex-col gap-4 px-5 py-3 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-12 lg:py-3 xl:px-16 2xl:px-20">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8 lg:gap-12">
          <div className="min-w-0 shrink">
            <h3 className="font-serif text-base font-medium text-ink lg:text-lg">
              Glowing Home Cleaners
            </h3>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-muted lg:text-base">
              Affluent residential and commercial cleaning across Orange County.
            </p>
            <p className="mt-2">
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="text-sm text-accent underline-offset-2 hover:underline lg:text-base"
              >
                {SITE_EMAIL}
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-2 text-sm lg:text-base">
            <div className="space-y-1">
              <p className="font-medium text-ink">Concierge</p>
              <FooterLink href="/request-quote">Request Quote</FooterLink>
              <FooterLink href="/checklist">Checklist</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/client-login">Client Login</FooterLink>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-ink">Legal</p>
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
            </div>
          </div>
        </div>

        <a
          href={JITS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel flex shrink-0 items-center gap-6 rounded-3xl px-6 py-5 no-underline transition-opacity hover:opacity-95 sm:gap-8 sm:px-8 sm:py-6"
          title="Joseph IT Solutions"
        >
          <div className="min-w-0 text-left leading-snug">
            <p className="text-base font-medium text-ink sm:text-lg">
              Like this site?
            </p>
            <p className="text-base text-ink-muted sm:text-lg">Get yours →</p>
          </div>
          <Image
            src="/assets/images/JLit.png"
            alt="JL IT — website design"
            width={200}
            height={86}
            className="h-16 w-auto max-w-[12rem] shrink-0 object-contain opacity-90 sm:h-[4.75rem] sm:max-w-[14rem] lg:h-20 lg:max-w-[16rem]"
          />
        </a>
      </div>
      <div className="border-t border-emerald-200/25 py-1.5 text-center text-xs text-ink-subtle dark:border-white/10 sm:text-sm">
        <small>&copy; {year} Glowing Home Cleaners. All rights reserved.</small>
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
    <p className="leading-snug">
      <Link
        href={href}
        className="text-ink-muted underline-offset-2 transition-colors hover:text-ink hover:underline"
      >
        {children}
      </Link>
    </p>
  );
}
