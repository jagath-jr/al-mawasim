import type { Metadata } from "next";

const siteUrl = "https://almawasim.ae";

export const metadata: Metadata = {
  title: "Commercial Interior Solutions & Office Blinds Abu Dhabi",
  description:
    "B2B commercial interior solutions for offices, hotels, and retail in Abu Dhabi. Specializing in office curtains, office blinds, and commercial flooring.",
  keywords: [
    "commercial interior solutions abu dhabi",
    "office curtains abu dhabi",
    "office blinds abu dhabi",
    "meeting room curtains abu dhabi",
    "hospitality interior solutions uae",
  ],
  alternates: {
    canonical: `${siteUrl}/sectors`,
  },
  openGraph: {
    title: "Commercial Interior Solutions & Office Blinds Abu Dhabi",
    description:
      "B2B commercial interior solutions for offices, hotels, and retail in Abu Dhabi. Specializing in office curtains, office blinds, and commercial flooring.",
    url: `${siteUrl}/sectors`,
    siteName: "Al Mawasim Decor & Curtains",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Commercial Interior Solutions Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Interior Solutions & Office Blinds Abu Dhabi",
    description:
      "B2B commercial interior solutions for offices, hotels, and retail in Abu Dhabi.",
    images: ["/og-image.jpg"],
  },
};

export default function SectorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}