import type { Metadata } from "next";

const siteUrl = "https://almawasim.ae";

export const metadata: Metadata = {
  title: "Flooring, Curtains & Wallcovering Catalogs Abu Dhabi",
  description:
    "Download Al Mawasim catalogs for SPC flooring, LVT flooring, laminate flooring, curtain fabrics, and premium wallcoverings available in Abu Dhabi.",
  keywords: [
    "SPC flooring abu dhabi",
    "LVT flooring abu dhabi",
    "laminate flooring abu dhabi",
    "wallcoverings abu dhabi",
    "curtain fabric catalog uae",
  ],
  alternates: {
    canonical: `${siteUrl}/catalog`,
  },
  openGraph: {
    title: "Flooring, Curtains & Wallcovering Catalogs Abu Dhabi",
    description:
      "Download Al Mawasim catalogs for SPC flooring, LVT flooring, laminate flooring, curtain fabrics, and premium wallcoverings available in Abu Dhabi.",
    url: `${siteUrl}/catalog`,
    siteName: "Al Mawasim Decor & Curtains",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al Mawasim Product Catalogs Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flooring, Curtains & Wallcovering Catalogs Abu Dhabi",
    description:
      "Download Al Mawasim catalogs for SPC flooring, LVT flooring, laminate flooring, curtain fabrics, and premium wallcoverings.",
    images: ["/og-image.jpg"],
  },
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}