import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageLightboxProvider } from "@/components/media/ImageLightbox";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { THEME_STORAGE_KEY } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

export const viewport = {
  themeColor: "#f6f4ef",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.glowinghomecleaners.com"),
  title: {
    default:
      "Premium Cleaning in Orange County | Glowing Home Cleaners",
    template: "%s | Glowing Home Cleaners",
  },
  description:
    "Luxury residential and commercial cleaning with polished results, trusted teams, and seamless online appointment scheduling.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.glowinghomecleaners.com",
    siteName: "Glowing Home Cleaners",
    title: "Glowing Home Cleaners",
    description:
      "Elevated cleaning for discerning Orange County homes and standout businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glowing Home Cleaners",
    description:
      "Elevated cleaning for discerning Orange County homes and standout businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <Script id="ghc-theme-boot" strategy="beforeInteractive">
          {`(function(){try{var k='${THEME_STORAGE_KEY}';var t=localStorage.getItem(k);var d=t==='dark';document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.classList.toggle('dark',d);}catch(e){}})();`}
        </Script>
        <ThemeProvider>
          <ImageLightboxProvider>
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
          </ImageLightboxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
