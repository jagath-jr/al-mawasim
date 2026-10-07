import './globals.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://almawasim.ae/"),
  title: {
    default: "Al Mawasim | Curtains, Blinds & Interior Decor Abu Dhabi",
    template: "%s | Al Mawasim Abu Dhabi",
  },
  description:
    "Leading curtain and blinds shop in Abu Dhabi. Custom curtains, roller blinds, zebra blinds, motorized curtains, SPC flooring, wallpaper, and upholstery across Mohammed Bin Zayed City, Mussafah & Abu Dhabi.",
  keywords: [
    "curtains abu dhabi",
    "blinds abu dhabi",
    "curtain shop abu dhabi",
    "curtains near me",
    "custom curtains abu dhabi",
    "roller blinds abu dhabi",
    "wallpaper abu dhabi",
    "interior decoration company abu dhabi",
    "curtain shop mussafah",
    "curtains Mohammed Bin Zayed City",
  ],
  authors: [{ name: "Al Mawasim Decor & Curtains LLC" }],
  creator: "Al Mawasim Decor & Curtains LLC",
  publisher: "Al Mawasim Decor & Curtains LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://almawasim.ae/",
    siteName: "Al Mawasim Decor & Curtains",
    title: "Al Mawasim | Curtains, Blinds & Interior Solutions Abu Dhabi",
    description:
      "Custom curtains, motorized curtains, luxury blinds, wallpaper, and flooring solutions in Abu Dhabi, UAE.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al Mawasim Curtains and Blinds Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Mawasim | Curtains, Blinds & Interior Solutions Abu Dhabi",
    description:
      "Custom curtains, motorized curtains, luxury blinds, wallpaper, and flooring solutions in Abu Dhabi, UAE.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  name: "Al Mawasim Decor & Curtains LLC",
  image: "https://almawasim.ae/og-image.jpg",
  "@id": "https://almawasim.ae/#store",
  url: "https://almawasim.ae/",
  telephone: "+971566773793",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mohammed Bin Zayed City / Mussafah",
    addressLocality: "Abu Dhabi",
    addressRegion: "Abu Dhabi",
    postalCode: "00000",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.3417,
    longitude: 54.5126,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "08:00",
    closes: "21:00",
  },
  areaServed: [
    { "@type": "City", name: "Abu Dhabi" },
    { "@type": "AdministrativeArea", name: "Mohammed Bin Zayed City" },
    { "@type": "AdministrativeArea", name: "Mussafah" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Curtains, Blinds & Interior Decor Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Custom Curtains Abu Dhabi" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Window Blinds Installation Abu Dhabi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wallpaper Installation Abu Dhabi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SPC Flooring Installation Abu Dhabi",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}