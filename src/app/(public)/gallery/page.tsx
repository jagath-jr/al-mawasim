'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ImageIcon } from 'lucide-react';

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// --- Gallery Data ---
const galleryImages = [
  { id: 1, src: '/gallery/gallery-1.webp', alt: '3D honeycomb wall design' },
  { id: 2, src: '/gallery/gallery-2.webp', alt: 'Wave Fold Curtains' },
  { id: 3, src: '/gallery/gallery-3.webp', alt: 'Tailored double Pinch Pleat Curtains' },
  { id: 4, src: '/gallery/gallery-4.webp', alt: 'Roman Blinds' },
  { id: 5, src: '/gallery/gallery-5.webp', alt: 'Custom Office Zebra Blinds' },
  { id: 6, src: '/gallery/gallery-6.webp', alt: 'Interior Design Showcase' },
];

export default function GalleryPage() {
  // State for the Lightbox Modal
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);

  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-[#fdfbf74e]">
      
      {/* ========================================
        1. FIXED BACKGROUND IMAGE (Parallax)
        ========================================
      */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(26,26,26,0.85)_0%,rgba(255,255,255,0)_100%)]">
        <Image 
          src="/gallery/bg-gallery.webp" // Update with an interior decor hero image
          alt="Gallery Hero"
          fill
          className="object-cover opacity-60 mix-blend-multiply"
          priority
        />
      </div>

      {/* =========================================
          2. HERO BANNER SECTION
      ========================================= */}
      <section className="relative w-full h-[350px] md:h-[450px] flex items-center pt-10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-4">
            {/* Badge */}
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-[#C5A869]/80 backdrop-blur-sm text-[#1A1A1A] px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide"
            >
              Discover
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-wide"
            >
              Our Gallery
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 md:mt-0 md:text-right max-w-md lg:max-w-lg"
          >
            <p className="text-lg md:text-xl font-medium leading-snug drop-shadow-md text-gray-200">
              Premium Curtains, Blinds & Interior Solutions Abu Dhabi
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          3. MAIN CONTENT AREA
      ========================================= */}
      <div className="relative z-20 bg-[#FDFBF7] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-32">
        
        {/* Decorative Top Overlap Icon */}
        <motion.div 
          initial={{ scale: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, x: "-50%", y: "-50%" }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
          className="absolute top-0 left-1/2 z-30 origin-center"
        >
          <div className="bg-[#C5A869] p-4 rounded-full border-[6px] border-[#FDFBF7] shadow-sm flex items-center justify-center">
            <ImageIcon className="w-7 h-7 text-[#1A1A1A]" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* --- INTRO TEXT SECTION --- */}
        <section className="pt-24 pb-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium max-w-4xl text-center mx-auto"
            >
              Explore our gallery showcasing our successfully delivered interior decor projects. 
              From elegant custom curtains and motorized blinds to premium flooring and sophisticated wall finishes, 
              each space reflects our commitment to quality, style, and flawless execution.
            </motion.p>
          </div>
        </section>

        {/* --- IMAGE GRID SECTION --- */}
        <section className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {galleryImages.map((image) => (
                <motion.div 
                  key={image.id} 
                  variants={fadeInUp}
                  onClick={() => setSelectedImage({ src: image.src, alt: image.alt })}
                  className="group relative w-full aspect-square overflow-hidden cursor-pointer rounded-2xl border border-[#EAE1D0] bg-[#F5F0E6] shadow-sm hover:shadow-md transition-all"
                >
                  {/* Image */}
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-[#FDFBF7]/95 p-4 rounded-full shadow-lg transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-75">
                      {/* Expand Icon (Gold) */}
                      <svg className="w-6 h-6 text-[#C5A869]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* =========================================
          LIGHTBOX MODAL (Click to View)
      ========================================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)} // Close when clicking backdrop
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111]/95 backdrop-blur-sm p-4 sm:p-8"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-50 bg-[#FDFBF7]/10 hover:bg-[#C5A869] text-[#FDFBF7] hover:text-[#1A1A1A] p-3 rounded-full backdrop-blur transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside image from closing modal
              className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center"
            >
              <Image 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                fill 
                className="object-contain"
                quality={100}
              />
              
              {/* Image Caption in Lightbox */}
              <div className="absolute bottom-[-40px] left-0 right-0 text-center text-gray-300 text-sm tracking-wide font-medium">
                {selectedImage.alt}
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}