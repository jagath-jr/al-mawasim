import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AL MAWASIM DECOR & CURTAINS LLC, a trusted provider of custom curtains, blinds, flooring, wallpaper, upholstery, and interior solutions in Abu Dhabi.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}