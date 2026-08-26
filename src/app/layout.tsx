import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { RevealProvider } from "@/components/ui/RevealProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { localBusinessJsonLd } from "@/lib/seo";
import { SITE_URL, company } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AlexProReno — Entreprise de rénovation en région parisienne",
    template: "%s | AlexProReno",
  },
  description:
    "AlexProReno conçoit et réalise des rénovations et des aménagements sur mesure à Paris et en région parisienne. Tous corps d'état, une seule équipe. Devis gratuit et sans engagement.",
  applicationName: company.name,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: company.name,
    title: "AlexProReno — Entreprise de rénovation en région parisienne",
    description:
      "Rénovation intérieure, cuisines, dressings et aménagements sur mesure à Paris et en région parisienne. Devis gratuit et sans engagement.",
    images: [
      {
        url: "/media/cuisine-paris07.webp",
        width: 1600,
        height: 1066,
        alt: "Cuisine contemporaine sur mesure réalisée par AlexProReno à Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlexProReno — Entreprise de rénovation en région parisienne",
    description:
      "Rénovation intérieure et aménagements sur mesure à Paris et en région parisienne. Devis gratuit.",
    images: ["/media/cuisine-paris07.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Rénovation",
};

export const viewport: Viewport = {
  themeColor: "#100e0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${newsreader.variable} ${plexMono.variable}`}>
      <head>
        {/* Sans JavaScript, les contenus révélés au scroll restent visibles. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <RevealProvider />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <MobileActionBar />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
