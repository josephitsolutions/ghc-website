"use client";

import Script from "next/script";
import {
  BOOKING_EMBED_SCRIPT_SRC,
  LIVE_REVIEWS_IFRAME_SRC,
} from "@/lib/constants";

export function LiveReviewsEmbed({ height = 500 }: { height?: number }) {
  return (
    <>
      <iframe
        src={LIVE_REVIEWS_IFRAME_SRC}
        style={{ border: "none", height }}
        width="100%"
        scrolling="no"
        title="Live client reviews"
        loading="lazy"
      />
      <Script src={BOOKING_EMBED_SCRIPT_SRC} strategy="lazyOnload" />
    </>
  );
}
