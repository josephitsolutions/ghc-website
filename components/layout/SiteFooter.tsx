import Image from "next/image";
import Link from "next/link";
import {
  FACEBOOK_URL,
  JITS_URL,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/constants";

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="glass-strip border-t border-emerald-200/35 dark:border-emerald-500/15">
      <div className="mx-auto grid w-full max-w-site grid-cols-1 gap-8 px-5 py-3 sm:px-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-start lg:gap-x-8 lg:gap-y-4 xl:gap-x-10 lg:px-12 lg:py-3 xl:px-16 2xl:px-20">
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <h3 className="font-serif text-base font-medium text-ink lg:text-lg">
            Glowing Home Cleaners
          </h3>
          <ul className="mt-3 space-y-2.5 text-sm text-ink-muted lg:text-base">
            <li>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-ink-muted transition-colors hover:text-ink"
              >
                <IconFacebook className="h-5 w-5 shrink-0 text-accent" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE_PHONE_TEL}`}
                className="inline-flex items-center gap-2.5 text-ink-muted transition-colors hover:text-ink"
              >
                <IconPhone className="h-5 w-5 shrink-0 text-accent" />
                <span>{SITE_PHONE_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="inline-flex items-center gap-2.5 text-ink-muted transition-colors hover:text-ink"
              >
                <IconMail className="h-5 w-5 shrink-0 text-accent" />
                <span>{SITE_EMAIL}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-1 text-sm lg:text-base">
          <p className="font-medium text-ink">Concierge</p>
          <FooterLink href="/request-quote">Request Quote</FooterLink>
          <FooterLink href="/checklist">Checklist</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/client-login">Client Login</FooterLink>
        </div>

        <div className="space-y-1 text-sm lg:text-base">
          <p className="font-medium text-ink">Legal</p>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="/terms">Terms</FooterLink>
        </div>

        <a
          href={JITS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel flex w-fit max-w-full shrink-0 items-center gap-6 rounded-3xl px-6 py-5 no-underline transition-opacity hover:opacity-95 sm:col-span-2 sm:mx-auto sm:gap-8 sm:px-8 sm:py-6 lg:col-span-1 lg:mx-0 lg:justify-self-end"
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
