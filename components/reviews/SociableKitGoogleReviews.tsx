import { SOCIABLEKIT_GOOGLE_REVIEWS_IFRAME_SRC } from "@/lib/constants";

export function SociableKitGoogleReviews() {
  return (
    <div className="glass-panel min-h-0 w-full overflow-hidden rounded-3xl p-2 sm:p-3">
      <iframe
        src={SOCIABLEKIT_GOOGLE_REVIEWS_IFRAME_SRC}
        title="Google reviews — Glowing Home Cleaners"
        className="block w-full rounded-2xl border-0"
        style={{
          height: "min(1000px, 85svh)",
          minHeight: "22rem",
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
