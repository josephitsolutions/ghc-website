"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { LightboxImage } from "@/components/media/ImageLightbox";

/** Single stream: former carousel slides + former “additional portfolio” images. */
const FEATURED_IMAGES: { src: string; alt: string }[] = [
  {
    src: "/assets/images/home-mop.jpg",
    alt: "Residential mopping",
  },
  {
    src: "/assets/images/office-boardroom.jpg",
    alt: "Commercial boardroom",
  },
  {
    src: "/assets/images/luxury-bathroom.jpg",
    alt: "Luxury bathroom",
  },
  {
    src: "/assets/images/vacuum-carpet.jpg",
    alt: "Carpet vacuuming",
  },
  {
    src: "/assets/images/tile-floor.jpg",
    alt: "Tile floor service",
  },
  {
    src: "/assets/images/glass-wipe.jpg",
    alt: "Glass detailing",
  },
  {
    src: "https://images.unsplash.com/photo-1580256081112-e49377338b7f?auto=format&fit=max&w=1400&q=80",
    alt: "Cleaner polishing interior",
  },
  {
    src: "https://images.unsplash.com/photo-1758273238594-9a9d6c20eaa2?auto=format&fit=max&w=1400&q=80",
    alt: "Modern kitchen cleaning setup",
  },
  {
    src: "https://images.unsplash.com/photo-1740657254989-42fe9c3b8cce?auto=format&fit=max&w=1400&q=80",
    alt: "Luxury interior detail cleaning",
  },
];

const SLIDE_MS = 4000;

function BlurredSide({ item }: { item: { src: string; alt: string } }) {
  const remote = item.src.startsWith("http");
  return (
    <div
      className="pointer-events-none w-[22%] min-w-0 max-w-[160px] shrink opacity-[0.72] sm:max-w-[200px] md:w-1/5 md:max-w-none"
      aria-hidden
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl sm:aspect-[4/3]">
        <Image
          src={item.src}
          alt=""
          fill
          className="scale-110 object-cover blur-[11px] brightness-[0.96]"
          sizes="24vw"
          unoptimized={remote}
        />
      </div>
    </div>
  );
}

export function FeaturedPortfolioCarousel() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const n = FEATURED_IMAGES.length;

  const prev = FEATURED_IMAGES[(index - 1 + n) % n];
  const curr = FEATURED_IMAGES[index];
  const next = FEATURED_IMAGES[(index + 1) % n];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [n]);

  const enter = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="space-y-8">
      <div className="flex min-h-[280px] items-center justify-center gap-2 py-6 sm:min-h-[320px] sm:gap-4 md:min-h-[360px]">
        <BlurredSide item={prev} />
        <div className="relative z-10 w-[56%] min-w-0 shrink sm:w-1/2 md:w-[48%]">
          <motion.div
            key={index}
            initial={
              reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0.65, x: 28 }
            }
            animate={{ opacity: 1, x: 0 }}
            transition={enter}
            className="flex justify-center"
          >
            <LightboxImage
              src={curr.src}
              alt={curr.alt}
              sizes="(max-width: 768px) 58vw, 48vw"
            />
          </motion.div>
        </div>
        <BlurredSide item={next} />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {FEATURED_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Image ${i + 1} of ${n}`}
            aria-current={index === i}
            onClick={() => setIndex(i)}
            className={[
              "h-2.5 min-w-[10px] rounded-full transition-all duration-500",
              index === i
                ? "w-9 bg-accent"
                : "w-2.5 bg-ink/15 hover:bg-ink/30 dark:bg-white/15",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
