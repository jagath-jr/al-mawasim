import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Al Mawasim Decor & Curtains' professional services including custom curtains, motorized curtains, roller blinds, zebra blinds, SPC flooring, laminate flooring, wallpaper installation, and furniture upholstery in Abu Dhabi.",
  keywords: [
    "Al Mawasim services",
    "curtains Abu Dhabi",
    "motorized curtains",
    "roller blinds Abu Dhabi",
    "zebra blinds",
    "vertical blinds Abu Dhabi",
    "Venetian blinds",
    "SPC flooring Abu Dhabi",
    "laminate flooring",
    "wallpaper installation Abu Dhabi",
    "furniture upholstery",
    "interior decoration Abu Dhabi",
    "curtain installation",
    "blackout curtains",
    "sheer curtains",
  ],
  openGraph: {
    title: "Our Services | Al Mawasim Decor & Curtains",
    description:
      "Explore Al Mawasim Decor & Curtains' professional services including custom curtains, motorized curtains, roller blinds, zebra blinds, SPC flooring, laminate flooring, wallpaper installation, and furniture upholstery in Abu Dhabi.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al Mawasim Services - Curtains, Blinds & Flooring",
      },
    ],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}