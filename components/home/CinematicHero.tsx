"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

const HERO_BACKGROUNDS = [
  "/assets/images/001.jpg",
  "/assets/images/002.jpg",
  "/assets/images/003.jpg",
  "/assets/images/004.jpg",
  "/assets/images/005.jpg",
];

const SENTENCES = [
  "Welcome to the absolute pinnacle of pristine living.",
  "We curate immaculate environments exclusively for those who demand perfection.",
  "Because your time is a rare luxury, your sanctuary deserves an unparalleled level of discreet, meticulous care.",
  "Experience a bespoke standard of elegance where every detail is flawlessly executed.",
  "Step into the ultimate echelon of clean.",
];

const BRAND = "Glowing Home Cleaners";

export function CinematicHero() {
  const reduceMotion = useReducedMotion();
  const uid = useId();
  const gradId = `${uid}-cue-grad`;
  const filtId = `${uid}-cue-glow`;

  const [phase, setPhase] = useState<"intro" | "signature" | "done">("intro");
  const [lineIndex, setLineIndex] = useState(0);
  const [lineVisible, setLineVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoOpaque, setPhotoOpaque] = useState(true);

  const holdMs = 3000;
  const fadeMs = 780;

  const wait = useCallback(
    (ms: number) => new Promise<void>((r) => setTimeout(r, ms)),
    [],
  );

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;

    async function preload() {
      await Promise.all(
        HERO_BACKGROUNDS.map(
          (url) =>
            new Promise<void>((resolve) => {
              const im = new window.Image();
              im.onload = () => resolve();
              im.onerror = () => resolve();
              im.src = url;
            }),
        ),
      );
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

  const reducedBlock = useMemo(() => {
    if (!reduceMotion) return null;
    return (
      <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src={HERO_BACKGROUNDS[0]!}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-canvas/95 dark:via-black/55 dark:to-canvas" />
        </div>
        <p className="max-w-3xl font-serif text-2xl leading-snug text-white sm:text-3xl md:text-4xl">
          {SENTENCES.join(" ")}
        </p>
        <p className="mt-10 font-script text-4xl text-white sm:text-5xl">
          {BRAND}
        </p>
      </div>
    );
  }, [reduceMotion]);

  if (reduceMotion && reducedBlock) {
    return <section aria-label="Welcome">{reducedBlock}</section>;
  }

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
      aria-label="Welcome"
    >
      <div className="absolute inset-0 -z-20">
        <motion.div
          className="relative h-full w-full"
          initial={false}
          animate={{ opacity: photoOpaque ? 1 : 0 }}
          transition={{ duration: fadeMs / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={HERO_BACKGROUNDS[photoIndex] ?? HERO_BACKGROUNDS[0]!}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-canvas/95 dark:from-black/55 dark:via-black/35 dark:to-canvas" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-28 pt-32 text-center sm:pb-32">
        {phase === "intro" ? (
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
        ) : null}

        {phase !== "intro" ? (
          <motion.div
            className="mt-8 flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <SignatureWordmark phase={phase} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: phase === "done" ? 1 : 0,
                y: phase === "done" ? 0 : 10,
              }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-white/85"
              aria-hidden
            >
              <ScrollCue gradId={gradId} filtId={filtId} />
            </motion.div>
          </motion.div>
        ) : null}
      </div>
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
      className="font-script text-4xl text-white sm:text-6xl md:text-7xl"
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

function ScrollCue({
  gradId,
  filtId,
}: {
  gradId: string;
  filtId: string;
}) {
  return (
    <svg
      className="h-16 w-14 text-white/90 drop-shadow-lg sm:h-[4.75rem] sm:w-[3.5rem]"
      viewBox="0 0 64 88"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="32"
          y1="8"
          x2="32"
          y2="72"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#a8ecff" />
          <stop offset="55%" stopColor="#68d0ff" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </linearGradient>
        <filter id={filtId} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        filter={`url(#${filtId})`}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M32 10v48M12 46l20 20 20-20"
      />
    </svg>
  );
}
