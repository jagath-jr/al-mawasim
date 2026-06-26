import './globals.css';

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://al-mawasim.vercel.app/"),

  title: {
    default: "Al Mawasim | Trading, Contracting & Interior Solutions",
    template: "%s | Al Mawasim",
  },

  description:
    "Al Mawasim provides premium trading, contracting, interior decoration, gypsum works, flooring, electrical, plumbing, and maintenance services.",

  keywords: [
    "Al Mawasim",
    "Trading Company",
    "Contracting",
    "Interior Design",
    "Gypsum Work",
    "Flooring",
    "Electrical Works",
    "Plumbing",
    "Maintenance",
    "Saudi Arabia"
  ],

  authors: [
    {
      name: "Al Mawasim",
    },
  ],

  creator: "Al Mawasim",

  publisher: "Al Mawasim",

  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    locale: "en_US",
    url: "https://al-mawasim.vercel.app/",
    siteName: "Al Mawasim",
    title: "Al Mawasim | Trading, Contracting & Interior Solutions",
    description:
      "Professional trading, contracting, and interior solutions for residential, commercial, and industrial projects.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al Mawasim",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Al Mawasim",
    description:
      "Professional trading, contracting, and interior solutions.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "Business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Add suppressHydrationWarning here
    <html lang="en" suppressHydrationWarning>
      {/* And add it here */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}