import './globals.css';

export const metadata = {
  title: 'Al Mawasim Decor & Curtains | Premium Interior Solutions',
  description: 'Your trusted partner for premium interior décor, curtains, blinds, flooring, upholstery, and wall finishing solutions for residential and commercial spaces.',
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