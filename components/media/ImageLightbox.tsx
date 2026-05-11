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
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-3xl bg-black/40 p-2 shadow-2xl ring-1 ring-white/10"
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur-md transition hover:bg-white/20"
                onClick={close}
                aria-label="Close expanded image"
              >
                ×
              </button>
              <div className="relative h-[min(78vh,820px)] w-[min(92vw,1200px)]">
                <Image
                  src={src}
                  alt={alt || "Expanded photograph"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 92vw, 1200px"
                  unoptimized={src.startsWith("http")}
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function LightboxImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      className={[
        "group relative block h-full w-full overflow-hidden rounded-[inherit] text-left",
        className,
      ].join(" ")}
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
        fill
        sizes={sizes}
        className="object-cover transition duration-700 ease-luxury group-hover:scale-[1.03]"
        priority={priority}
        unoptimized={src.startsWith("http")}
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
    </button>
  );
}
