import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Al Mawasim Decor & Curtains LLC for premium curtains, blinds, flooring, wallpaper, and interior solutions in Abu Dhabi. Request a quote today.",
  keywords: [
    "contact Al Mawasim",
    "curtains Abu Dhabi contact",
    "interior design Abu Dhabi",
    "request quote curtains",
    "curtain installation Abu Dhabi",
    "blinds Abu Dhabi contact",
  ],
  openGraph: {
    title: "Contact Us | Al Mawasim Decor & Curtains",
    description:
      "Get in touch with Al Mawasim Decor & Curtains LLC for premium curtains, blinds, flooring, wallpaper, and interior solutions in Abu Dhabi. Request a quote today.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}