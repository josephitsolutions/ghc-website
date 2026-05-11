"use client";

import { useEffect } from "react";
import {
  GOOGLE_MAPS_API_KEY_FALLBACK,
} from "@/lib/constants";

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

function updateStars(rating: number) {
  const row = document.getElementById("googleStarsRow");
  const valEl = document.getElementById("googleRatingValue");
  if (!row || !valEl) return;

  const safe = Number.isFinite(rating)
    ? Math.min(5, Math.max(0, rating))
    : 5;
  valEl.textContent = safe.toFixed(1);

  const filledCount = Math.min(5, Math.max(0, Math.round(safe)));
  row.setAttribute(
    "aria-label",
    `Google rating: ${filledCount} out of 5 stars`,
  );
  row.innerHTML = "";
  for (let i = 0; i < 5; i += 1) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute(
      "class",
      i < filledCount ? "google-star google-star--filled" : "google-star",
    );
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "26");
    svg.setAttribute("height", "26");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", STAR_PATH);
    svg.appendChild(path);
    row.appendChild(svg);
  }
}

function renderReviews(place: google.maps.places.PlaceResult) {
  const outlet = document.getElementById("googleReviews");
  if (!outlet) return;

  const reviews = (place.reviews ?? []).slice(0, 3);
  const cards = reviews
    .map(
      (review) => `
      <article class="glass-panel p-6">
        <h3 class="font-serif text-lg text-ink">${review.author_name ?? "Verified Client"}</h3>
        <p class="mt-2 text-sm text-ink-muted">Rating: ${review.rating ?? 5}/5</p>
        <p class="mt-3 text-sm leading-relaxed text-ink-muted">${(review.text ?? "").slice(0, 240)}</p>
      </article>`,
    )
    .join("");

  outlet.innerHTML = `
    <p class="glass-panel p-6 text-sm text-ink-muted">
      Google rating: ${place.rating ?? "N/A"} (${place.user_ratings_total ?? 0} reviews)
    </p>
    <div class="mt-6 grid gap-6 md:grid-cols-3">
      ${cards || '<p class="glass-panel p-6 text-sm text-ink-muted">No published reviews found.</p>'}
    </div>
  `;
}

declare global {
  interface Window {
    initGoogleReviews?: () => void;
  }
}

export function GooglePlacesInsights({
  mode,
}: {
  mode: "rating-only" | "rating-and-reviews";
}) {
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? GOOGLE_MAPS_API_KEY_FALLBACK;

  useEffect(() => {
    window.initGoogleReviews = () => {
      if (!window.google?.maps?.places) return;

      const map = new google.maps.Map(document.createElement("div"));
      const places = new google.maps.places.PlacesService(map);

      places.findPlaceFromQuery(
        { query: "Glowing Home Cleaners Orange County", fields: ["place_id", "name"] },
        (results, status) => {
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !results?.[0]
          ) {
            const outlet = document.getElementById("googleReviews");
            if (outlet) {
              outlet.innerHTML =
                '<p class="glass-panel p-6 text-sm text-ink-muted">Google reviews are loading. Please check back shortly.</p>';
            }
            return;
          }

          places.getDetails(
            {
              placeId: results[0].place_id!,
              fields: ["reviews", "rating", "user_ratings_total"],
            },
            (place, detailsStatus) => {
              if (
                detailsStatus !== google.maps.places.PlacesServiceStatus.OK ||
                !place
              ) {
                const outlet = document.getElementById("googleReviews");
                if (outlet) {
                  outlet.innerHTML =
                    '<p class="glass-panel p-6 text-sm text-ink-muted">Google reviews are unavailable right now.</p>';
                }
                return;
              }

              if (typeof place.rating === "number") {
                updateStars(place.rating);
              }

              if (mode === "rating-and-reviews") {
                renderReviews(place);
              }
            },
          );
        },
      );
    };

    if (window.google?.maps?.places) {
      window.initGoogleReviews();
      return () => {
        delete window.initGoogleReviews;
      };
    }

    const existing = document.querySelector(
      'script[data-ghc-google-maps="true"]',
    );
    if (existing) return () => delete window.initGoogleReviews;

    const script = document.createElement("script");
    script.dataset.ghcGoogleMaps = "true";
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey,
    )}&libraries=places&callback=initGoogleReviews`;
    document.head.appendChild(script);

    return () => {
      script.remove();
      delete window.initGoogleReviews;
    };
  }, [apiKey, mode]);

  return null;
}
