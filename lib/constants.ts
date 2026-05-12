/** BK booking iframe + embed script (preserve URLs exactly). */
export const BOOKING_IFRAME_SRC =
  "https://glowinghomecleaners.bookingkoala.com/booknow?embed=true";
export const BOOKING_EMBED_SCRIPT_SRC =
  "https://glowinghomecleaners.bookingkoala.com/resources/embed.js";

/** BK live reviews iframe (preserve URLs exactly). */
export const LIVE_REVIEWS_IFRAME_SRC =
  "https://glowinghomecleaners.bookingkoala.com/live-reviews/?embed=true";

/** Google Maps embed for Business Profile section (preserve src exactly). */
export const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.903828885217!2d-117.88669952442964!3d33.788981573257274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2568d68ca7625739%3A0xd04917a542604128!2sGlowing%20Home%20Cleaners!5e0!3m2!1sen!2sza!4v1778291023827!5m2!1sen!2sza";

/**
 * Browser Maps/Places default. Prefer `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in env to override.
 * Keep HTTP referrer restrictions on this key in Google Cloud.
 */
export const GOOGLE_MAPS_API_KEY_FALLBACK =
  "AIzaSyBYh4AftUwDqXccic0LJQl-q-R_z1WNyuc";

export const SITE_EMAIL = "info@glowinghomecleaners.com";

/** Public Facebook page (footer + social). */
export const FACEBOOK_URL = "https://www.facebook.com/glowinghomecleaners";

/** Display and tel: link target (footer). */
export const SITE_PHONE_DISPLAY = "(949) 989-7589";
export const SITE_PHONE_TEL = "+19499897589";

/** SociableKit Google Reviews embed (replaces custom Places review UI). */
export const SOCIABLEKIT_GOOGLE_REVIEWS_IFRAME_SRC =
  "https://widgets.sociablekit.com/google-reviews/iframe/25680892";

/** JITS footer logo links only here (requirement). */
export const JITS_URL = "https://josephitsolutions.co.za";

export const THEME_STORAGE_KEY = "ghc-theme";
