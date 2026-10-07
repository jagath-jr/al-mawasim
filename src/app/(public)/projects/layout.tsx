import type { Metadata } from "next";

const siteUrl = "https://almawasim.ae";

export const metadata: Metadata = {
  title: "Interior Decoration & Curtain Projects Abu Dhabi | Al Mawasim",
  description:
    "Explore our portfolio of interior decoration projects in Abu Dhabi. See our completed villa curtains, motorized curtains, and flooring installations.",
  keywords: [
    "interior decoration projects abu dhabi",
    "villa curtains abu dhabi",
    "motorized curtains abu dhabi",
    "curtain projects abu dhabi",
    "flooring projects abu dhabi",
  ],
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    title: "Interior Decoration & Curtain Projects Abu Dhabi | Al Mawasim",
    description:
      "Explore our portfolio of interior decoration projects in Abu Dhabi. See our completed villa curtains, motorized curtains, and flooring installations.",
    url: `${siteUrl}/projects`,
    siteName: "Al Mawasim Decor & Curtains",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al Mawasim Interior Decoration Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Decoration & Curtain Projects Abu Dhabi | Al Mawasim",
    description:
      "Explore our portfolio of completed villa curtains, motorized curtains, and flooring installations in Abu Dhabi.",
    images: ["/og-image.jpg"],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}