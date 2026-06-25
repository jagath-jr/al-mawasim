import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore Al Mawasim Decor & Curtains' portfolio of completed residential, commercial, and hospitality projects in Abu Dhabi featuring premium curtains, blinds, flooring, and interior solutions.",
  keywords: [
    "Al Mawasim projects",
    "curtain projects Abu Dhabi",
    "interior design portfolio",
    "flooring projects Abu Dhabi",
    "wallpaper installation projects",
    "blinds installation projects",
    "commercial curtains Abu Dhabi",
    "residential interior projects",
  ],
  openGraph: {
    title: "Our Projects | Al Mawasim Decor & Curtains",
    description:
      "Explore Al Mawasim Decor & Curtains' portfolio of completed residential, commercial, and hospitality projects in Abu Dhabi featuring premium curtains, blinds, flooring, and interior solutions.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al Mawasim Projects Portfolio",
      },
    ],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}