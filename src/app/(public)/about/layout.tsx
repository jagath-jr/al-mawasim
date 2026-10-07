import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Interior Decoration Company in Abu Dhabi",
  description:
    "Learn about Al Mawasim Decor LLC, a premier interior decoration company in Abu Dhabi specializing in custom curtains, blinds, flooring, and interior solutions.",
  keywords: [
    "interior decoration company abu dhabi",
    "interior decor company abu dhabi",
    "interior solutions abu dhabi",
    "about al mawasim decor",
  ],
  alternates: {
    canonical: "https://almawasim.ae/about",
  },
  openGraph: {
    title: "About Us | Interior Decoration Company in Abu Dhabi",
    description:
      "Learn about Al Mawasim Decor LLC, a premier interior decoration company in Abu Dhabi specializing in custom curtains, blinds, flooring, and interior solutions.",
    url: "https://almawasim.ae/about",
    siteName: "Al Mawasim Decor & Curtains",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Al Mawasim Decor - Interior Decoration Company Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Interior Decoration Company in Abu Dhabi",
    description:
      "Premier interior decoration company in Abu Dhabi specializing in custom curtains, blinds, flooring, and interior solutions.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}