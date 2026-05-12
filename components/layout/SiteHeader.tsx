"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Schedule" },
  { href: "/locations", label: "Locations" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;

const SCROLL_REVEAL_PX = 6;

function linkClass(pathname: string, href: string) {
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return [
    "rounded-full px-3 py-1.5 text-sm tracking-wide transition-colors",
    active
      ? "bg-emerald-900/12 text-ink shadow-sm dark:bg-white/12 dark:text-ink"
      : "text-ink-muted hover:bg-emerald-900/8 hover:text-ink dark:text-ink-muted dark:hover:bg-white/8 dark:hover:text-ink",
  ].join(" ");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_REVEAL_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showBar = Boolean(reduceMotion) || scrolled || open;

  return (
    <header
      className={[
        "glass-strip fixed left-0 right-0 top-0 z-50 border-b border-emerald-200/35 dark:border-emerald-500/20",
        reduceMotion ? "" : "transition-transform duration-300 ease-luxury",
        showBar ? "translate-y-0" : "-translate-y-full",
        showBar ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
    >
      <div className="flex w-full items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Link
          href="/"
          className="group inline-flex min-w-0 items-center gap-2.5 font-serif text-base tracking-tight text-ink sm:text-lg"
        >
          <span className="inline-block shrink-0 p-[3px]">
            <span className="relative block h-9 w-9 overflow-hidden rounded-full transition-transform duration-500 ease-luxury group-hover:scale-[1.03] sm:h-10 sm:w-10">
              <Image
                src="/assets/images/logo.png"
                alt="Glowing Home Cleaners logo"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </span>
          </span>
          <span className="hidden min-w-0 truncate font-medium sm:inline">
            Glowing Home Cleaners
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <button
            type="button"
            className="glass-panel inline-flex rounded-full px-3 py-1.5 text-sm font-medium text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(pathname, item.href)}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strip border-t border-emerald-200/30 md:hidden dark:border-emerald-500/15"
          >
            <div className="flex flex-col gap-1 px-5 py-2 sm:px-8">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-3 py-2.5 text-base text-ink-muted transition-colors hover:bg-emerald-900/10 hover:text-ink dark:hover:bg-white/8"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between px-2 pt-1">
                <span className="text-sm text-ink-muted">Appearance</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
