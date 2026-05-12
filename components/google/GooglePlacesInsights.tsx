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

declare global {
  interface Window {
    initGooglePlacesRating?: () => void;
  }
}

/** Loads Google Places once to sync the home trust-card stars + numeric rating. */
export function GooglePlacesInsights() {
  const apiKey = useMemo(() => {
    const fromEnv = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "").trim();
    return fromEnv || GOOGLE_MAPS_API_KEY_FALLBACK;
  }, []);

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const run = () => {
      if (!mounted.current || !window.google?.maps?.places) return;

      const map = new google.maps.Map(document.createElement("div"));
      const places = new google.maps.places.PlacesService(map);

      const tryQuery = (index: number) => {
        if (!mounted.current) return;
        if (index >= PLACE_QUERIES.length) return;

        places.findPlaceFromQuery(
          {
            query: PLACE_QUERIES[index],
            fields: ["place_id", "name"],
          },
          (results, status) => {
            if (!mounted.current) return;
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
                fields: ["rating"],
              },
              (place, detailsStatus) => {
                if (!mounted.current) return;
                if (
                  detailsStatus !== google.maps.places.PlacesServiceStatus.OK ||
                  !place ||
                  typeof place.rating !== "number"
                ) {
                  return;
                }
                updateStars(place.rating);
              },
            );
          },
        );
      };

      tryQuery(0);
    };

    window.initGooglePlacesRating = () => {
      run();
    };

    if (window.google?.maps?.places) {
      queueMicrotask(run);
      return () => {
        mounted.current = false;
        delete window.initGooglePlacesRating;
      };
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
        mounted.current = false;
        existing.removeEventListener("load", onLoad);
        delete window.initGooglePlacesRating;
      };
    }

    const script = document.createElement("script");
    script.dataset.ghcGoogleMaps = "true";
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey,
    )}&libraries=places&callback=initGooglePlacesRating`;
    document.head.appendChild(script);

    return () => {
      mounted.current = false;
      delete window.initGooglePlacesRating;
    };
  }, [apiKey]);

  return null;
}
