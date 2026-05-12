import Image from "next/image";
import Link from "next/link";
import { JITS_URL, SITE_EMAIL } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="glass-strip border-t border-emerald-200/35 dark:border-emerald-500/15">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-8 lg:py-2">
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:gap-6 lg:gap-8">
          <div className="min-w-0 shrink">
            <h3 className="font-serif text-sm font-medium text-ink lg:text-base">
              Glowing Home Cleaners
            </h3>
            <p className="mt-0.5 line-clamp-2 max-w-xs text-xs leading-snug text-ink-muted sm:text-sm">
              Affluent residential and commercial cleaning across Orange County.
            </p>
            <p className="mt-1">
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="text-xs text-accent underline-offset-2 hover:underline sm:text-sm"
              >
                {SITE_EMAIL}
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs sm:text-sm">
            <div className="space-y-0.5">
              <p className="font-medium text-ink">Concierge</p>
              <FooterLink href="/request-quote">Request Quote</FooterLink>
              <FooterLink href="/checklist">Checklist</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/client-login">Client Login</FooterLink>
            </div>
            <div className="space-y-0.5">
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
          className="glass-panel flex shrink-0 items-center gap-2 rounded-2xl px-2 py-1.5 no-underline transition-opacity hover:opacity-95 lg:max-w-[11rem]"
          title="Joseph IT Solutions"
        >
          <div className="min-w-0 text-left leading-tight">
            <p className="text-[10px] font-medium text-ink sm:text-xs">
              Like this site?
            </p>
            <p className="text-[10px] text-ink-muted sm:text-xs">Get yours →</p>
          </div>
          <Image
            src="/assets/images/JLit.png"
            alt="JL IT — website design"
            width={200}
            height={86}
            className="h-6 w-auto max-w-[4.5rem] shrink-0 object-contain opacity-90 sm:h-7 sm:max-w-[5rem]"
          />
        </a>
      </div>
      <div className="border-t border-emerald-200/25 py-1 text-center text-[11px] text-ink-subtle dark:border-white/10 sm:text-xs">
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
    <p className="leading-tight">
      <Link
        href={href}
        className="text-ink-muted underline-offset-2 transition-colors hover:text-ink hover:underline"
      >
        {children}
      </Link>
    </p>
  );
}
