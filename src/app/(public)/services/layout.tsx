import type { Metadata } from "next";

// Changed to the official domain specified in the SEO strategy
const siteUrl = "https://almawasim.ae";

export const metadata: Metadata = {
  // Enhanced Title: Protects core commercial targets and overall service intent
  title: "Interior Decoration & Curtain Services Abu Dhabi | Al Mawasim",
  description:
    "Expert custom curtain design, blinds fitting, wallpaper fixing, SPC flooring, and sofa upholstery services across residential and commercial Abu Dhabi.",
  keywords: [
    "interior decoration services abu dhabi",
    "custom curtains abu dhabi",
    "curtain installation abu dhabi",
    "wallpaper abu dhabi",
    "wallpaper installation abu dhabi",
    "roller blinds abu dhabi",
    "blinds installation abu dhabi",
    "sofa upholstery abu dhabi",
    "SPC flooring abu dhabi",
    "bedroom curtains abu dhabi",
  ],
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: "Interior Decoration & Curtain Services Abu Dhabi",
    description:
      "Expert custom curtain design, blinds fitting, wallpaper fixing, SPC flooring, and sofa upholstery services across Abu Dhabi.",
    url: `${siteUrl}/services`,
    siteName: "Al Mawasim Decor & Curtains",
    locale: "en_AE", // Localized for UAE
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Interior Decoration & Curtain Services Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Decoration & Curtain Services Abu Dhabi",
    description: "Expert custom curtain design, blinds fitting, wallpaper fixing, and interior solutions.",
    images: ["/og-image.jpg"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema Markup (JSON-LD) for Local Services
  // Expanded to hit specific high-priority transactional intents
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Custom Curtains & Installation Abu Dhabi",
          "description": "Expert custom curtain design, measurement, and fitting for villas, bedrooms, and offices in Abu Dhabi.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Al Mawasim Decor & Curtains"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Wallpaper Supply & Installation Abu Dhabi",
          "description": "Premium wallpaper fixing and installation services for residential and commercial spaces.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Al Mawasim Decor & Curtains"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "Window Blinds Fitting Abu Dhabi",
          "description": "Roller blinds, zebra blinds, vertical blinds, and Venetian blinds installation near you.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Al Mawasim Decor & Curtains"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "name": "Flooring & Sofa Upholstery Abu Dhabi",
          "description": "SPC flooring installation, carpets, and professional sofa upholstery services.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Al Mawasim Decor & Curtains"
          }
        }
      }
    ]
  };

  return (
    <>
      {/* Inject Structured Data into the DOM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}