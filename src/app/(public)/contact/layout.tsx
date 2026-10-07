import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curtain & Blinds Shop in Abu Dhabi | Contact Al Mawasim",
  description:
    "Visit or contact Al Mawasim Decor & Curtains. Serving Abu Dhabi, Mohammed Bin Zayed City, and Mussafah. Free window measurements, quote requests, and fast installation.",
  keywords: [
    "curtain shop abu dhabi",
    "curtains near me",
    "curtain shop near me",
    "best curtain shop near me",
    "curtain shop mussafah",
    "curtains Mohammed Bin Zayed City",
    "blinds near me",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Curtain & Blinds Shop in Abu Dhabi | Al Mawasim Contact",
    description:
      "Contact Al Mawasim Decor for custom curtains, blinds, and flooring in Abu Dhabi. Call or WhatsApp +971 56 677 3793 for free measurements.",
    url: "https://almawasim.ae/contact",
    images: ["/og-image.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}