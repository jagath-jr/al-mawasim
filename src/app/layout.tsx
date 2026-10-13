import './globals.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://almawasim.ae/"),
  title: {
    default: "Al Mawasim | Curtains, Blinds & Interior Decor Abu Dhabi",
    template: "%s | Al Mawasim Abu Dhabi",
  },
  description:
    "Custom curtains, motorized blinds, SPC flooring, and wallpaper across Abu Dhabi, MBZ City, Khalifa City & Mussafah. Free on-site consultation.",
  keywords: [
    "curtains abu dhabi",
    "blinds abu dhabi",
    "curtain shop abu dhabi",
    "custom curtains abu dhabi",
    "roller blinds abu dhabi",
    "motorized curtains abu dhabi",
    "wallpaper abu dhabi",
    "spc flooring abu dhabi",
    "curtains Mohammed Bin Zayed City",
    "curtains MBZ City",
    "curtains Khalifa City",
    "curtains Shakhbout City",
    "curtains Madinat Al Riyad",
    "curtain shop mussafah",
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
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://almawasim.ae/",
    siteName: "Al Mawasim Decor & Curtains",
    title: "Al Mawasim | Curtains, Blinds & Interior Solutions Abu Dhabi",
    description:
      "Custom curtains, motorized blinds, luxury wallpaper, and SPC flooring solutions across Abu Dhabi and surrounding communities.",
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
      "Custom curtains, motorized blinds, luxury wallpaper, and SPC flooring solutions across Abu Dhabi and surrounding communities.",
    images: ["/og-image.jpg"],
  },
};

const serviceAreas = [
  "Abu Dhabi",
  "Mohamed Bin Zayed City (MBZ City)",
  "Khalifa City",
  "Shakhbout City",
  "Madinat Al Riyad",
  "Al Shamkha",
  "Al Shawamekh",
  "Baniyas",
  "Al Falah",
  "Al Wathba",
  "Al Bahia",
  "Al Rahba",
  "Al Bateen",
  "Al Mushrif",
  "Al Nahyan",
  "Mussafah",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  name: "Al Mawasim Decor & Curtains LLC",
  alternateName: ["Al Mawasim", "المواسم للستائر والديكور"],
  image: "https://almawasim.ae/og-image.jpg",
  "@id": "https://almawasim.ae/#store",
  url: "https://almawasim.ae/",
  telephone: "+971566773793",
  priceRange: "$$",
  currenciesAccepted: "AED",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mohammed Bin Zayed City / Mussafah",
    addressLocality: "Abu Dhabi",
    addressRegion: "Abu Dhabi",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.3417,
    longitude: 54.5126,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "21:00",
  },
  sameAs: [
    "https://www.instagram.com/almawasimdecore_curtains",
    "https://www.facebook.com/share/1E6L4Dd9i8/",
    "https://www.tiktok.com/@almawasimdecore_curtains",
    "https://youtube.com/@almawasimdecoreandcurtains-llc",
    "https://www.linkedin.com/in/almawasim-curtains-7737b5394",
    "https://x.com/almawasim7737",
  ],
  areaServed: [
    { "@type": "City", name: "Abu Dhabi" },
    ...serviceAreas.slice(1).map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
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
          name: "Motorized Curtains & Blinds Abu Dhabi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Roller & Zebra Blinds Installation Abu Dhabi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SPC & Laminate Flooring Abu Dhabi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wallpaper Fixing & Supply Abu Dhabi",
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