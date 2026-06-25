import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Discover the industries Al Mawasim Decor & Curtains serves in Abu Dhabi, including residential, commercial, hospitality, office spaces, retail outlets, and healthcare facilities with premium interior solutions.",
  keywords: [
    "Al Mawasim sectors",
    "industries served Abu Dhabi",
    "residential curtains Abu Dhabi",
    "commercial blinds Abu Dhabi",
    "hospitality interior solutions",
    "office curtains Abu Dhabi",
    "retail flooring Abu Dhabi",
    "healthcare blinds",
    "hotel curtains Abu Dhabi",
    "villa interior decoration",
    "restaurant blinds Abu Dhabi",
    "corporate interior solutions",
  ],
  openGraph: {
    title: "Industries We Serve | Al Mawasim Decor & Curtains",
    description:
      "Discover the industries Al Mawasim Decor & Curtains serves in Abu Dhabi, including residential, commercial, hospitality, office spaces, retail outlets, and healthcare facilities with premium interior solutions.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al Mawasim Industries We Serve",
      },
    ],
  },
};

export default function SectorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}