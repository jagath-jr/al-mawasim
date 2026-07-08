// app/gallery/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Your Company Name',
  description: 'Explore our gallery showcasing successfully delivered power transmission, distribution, and electromechanical works.',
  openGraph: {
    title: 'Gallery | Your Company Name',
    description: 'Explore our gallery showcasing successfully delivered power transmission, distribution, and electromechanical works.',
    images: ['/gallery-hero-bg.webp'],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      {children}
    </main>
  );
}