import type { Metadata } from "next";

// Define your canonical URL base (Change this to your actual domain)
const siteUrl = "https://www.almawasimdecor.com";

export const metadata: Metadata = {
  // Enhanced Title: Includes primary keyword + location
  title: "Premium Curtains, Blinds & Interior Services in Abu Dhabi",
  description:
    "Professional interior solutions by Al Mawasim Decor. Explore custom curtains, motorized blinds, SPC flooring, wallpaper installation, and upholstery in Abu Dhabi.",
  keywords: [
    "Al Mawasim services",
    "custom curtains Abu Dhabi",
    "motorized curtains Abu Dhabi",
    "roller blinds Abu Dhabi",
    "zebra blinds",
    "SPC flooring installation",
    "laminate flooring Abu Dhabi",
    "wallpaper installation Abu Dhabi",
    "furniture upholstery Abu Dhabi",
    "interior decoration UAE",
  ],
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: "Premium Curtains & Interior Services | Al Mawasim Decor",
    description:
      "Transform your space with Abu Dhabi's trusted interior experts. Custom curtains, flooring, wallpaper, and upholstery services.",
    url: `${siteUrl}/services`,
    siteName: "Al Mawasim Decor & Curtains",
    locale: "en_AE", // Localized for UAE
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al Mawasim Services - Curtains, Blinds & Flooring Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Curtains & Interior Services | Al Mawasim Decor",
    description: "Transform your space with Abu Dhabi's trusted interior experts.",
    images: ["/og-image.jpg"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema Markup (JSON-LD) for Local Services
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Custom Curtains & Blinds",
          "description": "Elegant curtain solutions, motorized systems, and premium blinds for residential and commercial spaces in Abu Dhabi.",
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
          "name": "Furniture & Upholstery",
          "description": "Premium sofa upholstery and custom furniture solutions in Abu Dhabi.",
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
          "name": "Flooring Solutions",
          "description": "Durable SPC, LVT, and laminate flooring installation services.",
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