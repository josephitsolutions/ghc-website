"use client";

import Script from "next/script";
import {
  BOOKING_EMBED_SCRIPT_SRC,
  BOOKING_IFRAME_SRC,
} from "@/lib/constants";

export function BookingKoalaEmbed({ height = 1000 }: { height?: number }) {
  return (
    <>
      <iframe
        src={BOOKING_IFRAME_SRC}
        style={{ border: "none", height }}
        width="100%"
        scrolling="no"
        title="Schedule with BookingKoala"
        loading="lazy"
      />
      <Script src={BOOKING_EMBED_SCRIPT_SRC} strategy="lazyOnload" />
    </>
  );
}
