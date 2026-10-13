import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "About Al Mawasim | Interior Decoration Company in Abu Dhabi",
  },
  description:
    "Learn about Al Mawasim Decor LLC, a premier interior decoration company in Abu Dhabi providing custom curtains, blinds, and luxury interior solutions across MBZ City & UAE.",
  keywords: [
    "interior decoration company abu dhabi", // Core target from plan[cite: 1, 2]
    "interior decor company abu dhabi",     // Core target from plan[cite: 1]
    "interior solutions abu dhabi",         // Core target from plan[cite: 1]
    "شركة ديكور أبوظبي",                    // Target Arabic company term
    "about al mawasim decor",
    "curtain company abu dhabi",
    "villa interior decoration abu dhabi",
  ],
  alternates: {
    canonical: "https://almawasim.ae/about",
  },
  openGraph: {
    title: "About Al Mawasim | Interior Decoration Company in Abu Dhabi",
    description:
      "Premier interior decoration company in Abu Dhabi specializing in custom curtains, blinds, flooring, and bespoke interior solutions.",
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
    title: "About Al Mawasim | Interior Decoration Company in Abu Dhabi",
    description:
      "Premier interior decoration company in Abu Dhabi specializing in custom curtains, blinds, flooring, and bespoke interior solutions.",
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