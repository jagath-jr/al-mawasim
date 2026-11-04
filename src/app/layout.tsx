
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

const SITE_URL = "https://almawasim.ae";
const COMPANY_NAME = "AL MAWASIM DECOR & CURTAINS LLC";
const GA_ID = "G-KZ5T18MZCF";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),

  title: {
    default:
      "AL MAWASIM DECOR & CURTAINS LLC | Curtains, Blinds & Interior Decor Abu Dhabi",
    template: "%s | AL MAWASIM DECOR & CURTAINS LLC",
  },

  applicationName: COMPANY_NAME,

  description:
    "Custom curtains, motorized blinds, SPC flooring, and wallpaper across Abu Dhabi, MBZ City, Khalifa City & Mussafah. Free on-site consultation.",

  keywords: [
    "AL MAWASIM DECOR & CURTAINS LLC",
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

  authors: [{ name: COMPANY_NAME }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
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
    url: `${SITE_URL}/`,
    siteName: COMPANY_NAME,

    title:
      "AL MAWASIM DECOR & CURTAINS LLC | Curtains, Blinds & Interior Solutions Abu Dhabi",

    description:
      "Custom curtains, motorized blinds, luxury wallpaper, and SPC flooring solutions across Abu Dhabi and surrounding communities.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} - Curtains and Blinds Abu Dhabi`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "AL MAWASIM DECOR & CURTAINS LLC | Curtains, Blinds & Interior Solutions Abu Dhabi",

    description:
      "Custom curtains, motorized blinds, luxury wallpaper, and SPC flooring solutions across Abu Dhabi and surrounding communities.",

    images: ["/og-image.jpg"],
  },
};

// ==========================================
// SERVICE AREAS
// ==========================================

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

// ==========================================
// STRUCTURED DATA - WEBSITE + BUSINESS
// ==========================================

const jsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    // Website identity: preferred Google site name
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: COMPANY_NAME,
      alternateName: [
        "AL MAWASIM",
        "Al Mawasim",
        "Al Mawasim Decor & Curtains",
        "المواسم للستائر والديكور",
      ],
      url: `${SITE_URL}/`,
      inLanguage: "en-AE",
      publisher: {
        "@id": `${SITE_URL}/#store`,
      },
    },

    // Business identity
    {
      "@type": "HomeGoodsStore",
      "@id": `${SITE_URL}/#store`,

      name: COMPANY_NAME,

      alternateName: [
        "Al Mawasim",
        "المواسم للستائر والديكور",
      ],

      image: `${SITE_URL}/og-image.jpg`,

      url: `${SITE_URL}/`,

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

      sameAs: [
        "https://www.instagram.com/almawasimdecore_curtains",
        "https://www.facebook.com/share/1E6L4Dd9i8/",
        "https://www.tiktok.com/@almawasimdecore_curtains",
        "https://youtube.com/@almawasimdecorandcurtains-llc",
        "https://www.linkedin.com/in/almawasim-curtains-7737b5394",
        "https://x.com/almawasim7737",
      ],

      areaServed: [
        {
          "@type": "City",
          name: "Abu Dhabi",
        },

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
            itemOffered: {
              "@type": "Service",
              name: "Custom Curtains Abu Dhabi",
            },
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
    },
  ],
};

// ==========================================
// ROOT LAYOUT
// ==========================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics - GA4 */}

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;

            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        {/* Website and Business Structured Data */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
