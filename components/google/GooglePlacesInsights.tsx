"use client";

import { useEffect, useMemo, useRef } from "react";
import { GOOGLE_MAPS_API_KEY_FALLBACK } from "@/lib/constants";

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

const PLACE_QUERIES = [
  "Glowing Home Cleaners Irvine CA",
  "Glowing Home Cleaners Orange County",
  "Glowing Home Cleaners",
] as const;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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
    svg.setAttribute("width", "30");
    svg.setAttribute("height", "30");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", STAR_PATH);
    svg.appendChild(path);
    row.appendChild(svg);
  }
}

function renderReviews(
  place: google.maps.places.PlaceResult,
  mode: "rating-only" | "rating-and-reviews",
) {
  if (mode !== "rating-and-reviews") return;

  const outlet = document.getElementById("googleReviews");
  if (!outlet) return;

  const reviews = (place.reviews ?? []).slice(0, 5);
  const cards = reviews
    .map(
      (review) => `
      <article class="glass-panel p-6">
        <h3 class="font-serif text-lg text-ink">${escapeHtml(review.author_name ?? "Verified client")}</h3>
        <p class="mt-2 text-base text-ink-muted">Rating: ${review.rating ?? 5}/5</p>
        <p class="mt-3 text-base leading-relaxed text-ink-muted">${escapeHtml((review.text ?? "").slice(0, 320))}</p>
      </article>`,
    )
    .join("");

  const summary = escapeHtml(
    `${place.rating ?? "—"} · ${place.user_ratings_total ?? 0} Google reviews`,
  );

  outlet.innerHTML = `
    <p class="glass-panel p-6 text-base text-ink-muted">
      Google rating summary: <strong class="text-ink">${summary}</strong>
      <span class="mt-2 block text-sm text-ink-subtle">Google returns at most a handful of review snippets via the Places API — visit our full listing on Google Maps for every review.</span>
    </p>
    <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      ${cards || '<p class="glass-panel p-6 text-base text-ink-muted">No review text returned for this listing yet. Confirm the Places API is enabled for this key and the business has public Google reviews.</p>'}
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
  const apiKey = useMemo(() => {
    const fromEnv = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "").trim();
    return fromEnv || GOOGLE_MAPS_API_KEY_FALLBACK;
  }, []);

  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const run = () => {
      if (!window.google?.maps?.places) return;

      const map = new google.maps.Map(document.createElement("div"));
      const places = new google.maps.places.PlacesService(map);
      const currentMode = modeRef.current;

      const tryQuery = (index: number) => {
        if (index >= PLACE_QUERIES.length) {
          const outlet = document.getElementById("googleReviews");
          if (outlet && currentMode === "rating-and-reviews") {
            outlet.innerHTML =
              '<p class="glass-panel p-6 text-base text-ink-muted">Could not find this business in Google Places. Check API key restrictions (HTTP referrers), billing, and that <strong class="text-ink">Places API</strong> + <strong class="text-ink">Maps JavaScript API</strong> are enabled for the key.</p>';
          }
          return;
        }

        places.findPlaceFromQuery(
          {
            query: PLACE_QUERIES[index],
            fields: ["place_id", "name", "geometry"],
          },
          (results, status) => {
            if (
              status !== google.maps.places.PlacesServiceStatus.OK ||
              !results?.[0]?.place_id
            ) {
              tryQuery(index + 1);
              return;
            }

            places.getDetails(
              {
                placeId: results[0].place_id,
                fields: ["reviews", "rating", "user_ratings_total", "name"],
              },
              (place, detailsStatus) => {
                if (
                  detailsStatus !== google.maps.places.PlacesServiceStatus.OK ||
                  !place
                ) {
                  const outlet = document.getElementById("googleReviews");
                  if (outlet && currentMode === "rating-and-reviews") {
                    outlet.innerHTML =
                      '<p class="glass-panel p-6 text-base text-ink-muted">Google review details are unavailable (Places Details request failed). Verify API access and that this listing has public reviews.</p>';
                  }
                  return;
                }

                if (typeof place.rating === "number") {
                  updateStars(place.rating);
                }

                renderReviews(place, currentMode);
              },
            );
          },
        );
      };

      tryQuery(0);
    };

    window.initGoogleReviews = () => {
      run();
    };

    if (window.google?.maps?.places) {
      queueMicrotask(run);
      return;
    }

    const existing = document.querySelector(
      'script[data-ghc-google-maps="true"]',
    ) as HTMLScriptElement | null;

    if (existing) {
      const onLoad = () => run();
      if (window.google?.maps?.places) {
        queueMicrotask(run);
      } else {
        existing.addEventListener("load", onLoad, { once: true });
      }
      return () => {
        existing.removeEventListener("load", onLoad);
      };
    }

    const script = document.createElement("script");
    script.dataset.ghcGoogleMaps = "true";
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey,
    )}&libraries=places&callback=initGoogleReviews`;
    document.head.appendChild(script);

    return () => {
      /* keep script in DOM for SPA; callback stays assigned */
    };
  }, [apiKey, mode]);

  return null;
}
