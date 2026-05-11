"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

function linkClass(pathname: string, href: string) {
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return [
    "rounded-full px-3 py-1.5 text-sm tracking-wide transition-colors",
    active
      ? "bg-white/70 text-ink shadow-sm dark:bg-white/10"
      : "text-ink-muted hover:text-ink dark:text-ink-muted dark:hover:text-ink",
  ].join(" ");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-canvas/75 backdrop-blur-2xl dark:border-white/10 dark:bg-canvas/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 font-serif text-lg tracking-tight text-ink"
        >
          <span className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/5 transition-transform duration-500 ease-luxury group-hover:scale-[1.03] dark:ring-white/10">
            <Image
              src="/assets/images/logo.png"
              alt="Glowing Home Cleaners logo"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </span>
          <span className="hidden font-medium sm:inline">
            Glowing Home Cleaners
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex rounded-full border border-ink/10 bg-white/50 px-4 py-2 text-sm font-medium text-ink backdrop-blur-md md:hidden dark:bg-white/[0.06]"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(pathname, item.href)}>
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/30 md:hidden dark:border-white/10"
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-3 py-3 text-base text-ink-muted hover:bg-white/40 hover:text-ink dark:hover:bg-white/[0.06]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between px-2 pt-2">
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
