"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

/** Cinematic intro — rotating photography (unchanged sequence). */
const HERO_SLIDESHOW = [
  "/assets/images/001.png",
  "/assets/images/002.png",
  "/assets/images/003.png",
  "/assets/images/004.png",
  "/assets/images/005.png",
];

const HERO_BG = "/assets/images/herobg.png";

const SENTENCES = [
  "Welcome to the absolute pinnacle of pristine living.",
  "We curate immaculate environments exclusively for those who demand perfection.",
  "Because your time is a rare luxury, your sanctuary deserves an unparalleled level of discreet, meticulous care.",
  "Experience a bespoke standard of elegance where every detail is flawlessly executed.",
  "Step into the ultimate echelon of clean.",
];

const BRAND = "Glowing Home Cleaners";

const SCROLL_APEX_PX = 12;

/** Full-viewport stained-glass panel over herobg while “Glowing Home Cleaners” writes on. */
const STAINED_GLASS_PANEL =
  "border border-white/20 bg-gradient-to-br from-slate-900/50 via-slate-800/35 to-indigo-950/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.15),0_0_100px_rgba(15,23,42,0.4)] backdrop-blur-3xl backdrop-saturate-150 dark:from-slate-950/60 dark:via-slate-900/45 dark:to-indigo-950/55";

export function CinematicHero() {
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<"intro" | "signature" | "done">("intro");
  const [lineIndex, setLineIndex] = useState(0);
  const [lineVisible, setLineVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoOpaque, setPhotoOpaque] = useState(true);
  /** Crossfade slideshow → herobg after last intro line (before signature). */
  const [revealHeroBg, setRevealHeroBg] = useState(false);
  const [atScrollApex, setAtScrollApex] = useState(true);

  /** Time each intro line stays fully visible before fading (was 3s; +3s for reading). */
  const holdMs = 6000;
  const fadeMs = 780;

  const wait = useCallback(
    (ms: number) => new Promise<void>((r) => setTimeout(r, ms)),
    [],
  );

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;

    async function preload() {
      await Promise.all([
        ...HERO_SLIDESHOW.map(
          (url) =>
            new Promise<void>((resolve) => {
              const im = new window.Image();
              im.onload = () => resolve();
              im.onerror = () => resolve();
              im.src = url;
            }),
        ),
        new Promise<void>((resolve) => {
          const im = new window.Image();
          im.onload = () => resolve();
          im.onerror = () => resolve();
          im.src = HERO_BG;
        }),
      ]);
    }

    async function run() {
      await preload();
      for (let i = 0; i < SENTENCES.length; i += 1) {
        if (cancelled) return;
        setLineIndex(i);
        setPhotoIndex(i);
        setLineVisible(false);
        await wait(50);
        setLineVisible(true);
        setPhotoOpaque(true);
        await wait(holdMs);
        setLineVisible(false);
        await wait(fadeMs);
      }

      if (cancelled) return;
      setRevealHeroBg(true);
      setPhotoOpaque(false);
      await wait(fadeMs);
      if (cancelled) return;

      setPhase("signature");
      const staggerMs = 70;
      const strokeMs = 480;
      const writeTotalMs =
        (BRAND.length - 1) * staggerMs + strokeMs + 650;
      await wait(writeTotalMs);
      if (cancelled) return;
      setPhase("done");
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [reduceMotion, wait]);

  useEffect(() => {
    if (phase !== "done") return;

    function onScroll() {
      setAtScrollApex(window.scrollY <= SCROLL_APEX_PX);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phase]);

  const reducedBlock = useMemo(() => {
    if (!reduceMotion) return null;
    return (
      <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src={HERO_BG}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-canvas/95 dark:via-black/50 dark:to-canvas" />
        </div>
        <p className="max-w-3xl font-serif text-2xl leading-snug text-white sm:text-3xl md:text-4xl">
          {SENTENCES.join(" ")}
        </p>
        <div
          className={`mt-10 w-[clamp(80vw,calc(100vw-2rem),96rem)] max-w-full rounded-3xl px-6 py-10 sm:px-12 sm:py-12 ${STAINED_GLASS_PANEL}`}
        >
          <p className="w-full text-center font-script text-[clamp(2.5rem,10vw,5.5rem)] leading-tight text-white">
            {BRAND}
          </p>
        </div>
      </div>
    );
  }, [reduceMotion]);

  if (reduceMotion && reducedBlock) {
    return <section aria-label="Welcome">{reducedBlock}</section>;
  }

  const showSlideshow = phase === "intro";
  const showHeroBg =
    revealHeroBg || phase === "signature" || phase === "done";
  const showStainedOverlay = phase === "signature" || phase === "done";
  const overlayFaded = phase === "done";

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
      aria-label="Welcome"
    >
      {/* Permanent base after cinematic: herobg (hidden until signature, then stays). */}
      <div className="absolute inset-0 -z-20 min-h-[100svh]">
        <motion.div
          className="relative h-full min-h-[100svh] w-full"
          initial={false}
          animate={{ opacity: showHeroBg ? 1 : 0 }}
          transition={{ duration: fadeMs / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={HERO_BG}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/40 dark:from-black/40 dark:via-black/25 dark:to-black/50" />
        </motion.div>
      </div>

      {/* Cinematic intro — rotating stills synced to copy. */}
      <div className="absolute inset-0 -z-10 min-h-[100svh]">
        <motion.div
          className="relative h-full min-h-[100svh] w-full"
          initial={false}
          animate={{ opacity: showSlideshow && photoOpaque ? 1 : 0 }}
          transition={{ duration: fadeMs / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={HERO_SLIDESHOW[photoIndex] ?? HERO_SLIDESHOW[0]!}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/50 dark:from-black/55 dark:via-black/35 dark:to-black/55" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />
        </motion.div>
      </div>

      {phase === "intro" ? (
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-28 pt-32 text-center sm:pb-32">
          <motion.p
            role="status"
            aria-live="polite"
            className="min-h-[7rem] max-w-3xl font-serif text-2xl leading-snug text-white text-balance-pretty sm:min-h-[6.5rem] sm:text-4xl md:text-5xl"
            initial={false}
            animate={{ opacity: lineVisible ? 1 : 0, y: lineVisible ? 0 : 14 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {SENTENCES[lineIndex]}
          </motion.p>
        </div>
      ) : null}

      {/* Signature on herobg + stained glass; then glass fades away — herobg remains. */}
      <AnimatePresence>
        {showStainedOverlay ? (
          <motion.div
            key="stained-overlay"
            className={`fixed inset-0 z-30 flex flex-col items-center justify-center px-3 py-10 sm:px-6 sm:py-14 ${STAINED_GLASS_PANEL}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: overlayFaded ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: overlayFaded ? 1 : 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ pointerEvents: overlayFaded ? "none" : "auto" }}
            aria-hidden
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.12),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(99,102,241,0.08),transparent_45%)]" />

            <div className="relative z-10 flex w-[clamp(80vw,calc(100vw-1.5rem),120rem)] max-w-[calc(100vw-0.75rem)] flex-col items-center">
              <SignatureWordmark phase={phase} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "done" ? (
          <motion.p
            key="scroll-hint"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0 }}
            animate={{ opacity: atScrollApex ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed bottom-8 left-0 right-0 z-[25] px-4 text-center text-xs uppercase tracking-[0.28em] text-white/85 sm:bottom-10 sm:text-sm"
          >
            Please scroll down for more
          </motion.p>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function SignatureWordmark({
  phase,
}: {
  phase: "intro" | "signature" | "done";
}) {
  const chars = useMemo(() => BRAND.split(""), []);
  const active = phase === "signature" || phase === "done";

  return (
    <p
      className="w-full text-center font-script text-[clamp(2.75rem,12vw,6.75rem)] leading-[1.08] tracking-tight text-white"
      aria-hidden
    >
      {chars.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
          animate={
            active
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(8px)", y: 8 }
          }
          transition={{
            delay: active ? i * 0.07 : 0,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </p>
  );
}
