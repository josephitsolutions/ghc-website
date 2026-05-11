"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LightboxImage } from "@/components/media/ImageLightbox";

const SLIDE_A = [
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
];

const SLIDE_B = [
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
];

const slides = [SLIDE_A, SLIDE_B];

export function FeaturedPortfolioCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${idx * 100}%` }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {slides.map((slide, slideIdx) => (
            <div key={slideIdx} className="w-full shrink-0">
              <div className="grid gap-6 md:grid-cols-3 md:items-start">
                {slide.map((img) => (
                  <div
                    key={img.src}
                    className="flex min-w-0 justify-center md:justify-center"
                  >
                    <LightboxImage
                      src={img.src}
                      alt={img.alt}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="max-w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            aria-current={idx === i}
            onClick={() => setIdx(i)}
            className={[
              "h-2.5 w-2.5 rounded-full transition-all duration-500",
              idx === i
                ? "w-9 bg-accent"
                : "bg-ink/15 hover:bg-ink/30 dark:bg-white/15",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
