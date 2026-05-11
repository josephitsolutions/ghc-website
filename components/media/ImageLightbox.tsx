"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

export function ImageLightboxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState("");

  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<{ src: string; alt?: string }>).detail;
      if (!detail?.src) return;
      setSrc(detail.src);
      setAlt(detail.alt ?? "");
      setOpen(true);
    }
    window.addEventListener("ghc:lightbox", onOpen as EventListener);
    return () =>
      window.removeEventListener("ghc:lightbox", onOpen as EventListener);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setSrc(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(ev: KeyboardEvent) {
      if (ev.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      {children}
      <AnimatePresence>
        {open && src ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Expanded photograph"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] max-w-[min(92vw,1200px)] p-[3px]"
            >
              <button
                type="button"
                className="absolute -right-1 -top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-ink shadow-md transition hover:bg-white dark:bg-white/20 dark:text-white dark:hover:bg-white/30 sm:right-0 sm:top-0"
                onClick={close}
                aria-label="Close expanded image"
              >
                ×
              </button>
              <Image
                src={src}
                alt={alt || "Expanded photograph"}
                width={2400}
                height={1600}
                className="block h-auto max-h-[min(78vh,820px)] w-auto max-w-full object-contain"
                sizes="(max-width: 1200px) 92vw, 1200px"
                unoptimized={src.startsWith("http")}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

type LightboxImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Hint for layout / LCP; image still scales with `object-contain` to true proportions. */
  intrinsicWidth?: number;
  intrinsicHeight?: number;
};

/**
 * Image only: transparent wrapper, 3px padding on each side, no border or background.
 * Opens full-size in the site lightbox on click.
 */
export function LightboxImage({
  src,
  alt,
  className,
  sizes,
  priority,
  intrinsicWidth = 2400,
  intrinsicHeight = 1600,
}: LightboxImageProps) {
  return (
    <button
      type="button"
      className={[
        "m-0 max-w-full border-0 bg-transparent p-[3px] shadow-none outline-none ring-0",
        "inline-block align-middle focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("ghc:lightbox", { detail: { src, alt } }),
        )
      }
      aria-label={`Open larger view: ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        className="block h-auto max-h-[min(90dvh,56rem)] w-auto max-w-full object-contain"
        priority={priority}
        unoptimized={src.startsWith("http")}
      />
    </button>
  );
}
