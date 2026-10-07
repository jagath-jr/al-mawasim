import type { Metadata } from "next";

const siteUrl = "https://almawasim.ae";

export const metadata: Metadata = {
  title: "Curtain, Blinds & Wallpaper Designs Abu Dhabi | Gallery",
  description:
    "Browse our visual gallery for modern curtain designs, luxury wallpaper, and blinds designs in Abu Dhabi. View our styling for villas and offices.",
  keywords: [
    "curtain designs abu dhabi",
    "wallpaper designs abu dhabi",
    "blinds designs abu dhabi",
    "interior design images uae",
  ],
  alternates: {
    canonical: `${siteUrl}/gallery`,
  },
  openGraph: {
    title: "Curtain, Blinds & Wallpaper Designs Abu Dhabi | Gallery",
    description:
      "Browse our visual gallery for modern curtain designs, luxury wallpaper, and blinds designs in Abu Dhabi.",
    url: `${siteUrl}/gallery`,
    siteName: "Al Mawasim Decor & Curtains",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Curtain and Wallpaper Designs Abu Dhabi Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curtain, Blinds & Wallpaper Designs Abu Dhabi | Gallery",
    description:
      "Browse our visual gallery for modern curtain designs, luxury wallpaper, and blinds designs in Abu Dhabi.",
    images: ["/og-image.jpg"],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen">{children}</main>;
}