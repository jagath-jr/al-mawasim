"use client";

import React from "react";
import Image from "next/image";
import { Palette } from "lucide-react";
import { motion, Variants } from "framer-motion";

// ========================================
// 1. DATA TYPES (Matching Prisma Schema)
// ========================================

interface SubCard {
  id: string;
  title: string;
  desc: string;
  img: string;
  serviceId: string;
}

interface ServiceSection {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  image: string | null;
  layout: string; // "textLeft" | "textLeftResponsive" | "imageLeft"
  subSectionTitle: string | null;
  isActive: boolean;
  subCards: SubCard[];
}

interface ServicesClientProps {
  heroData: {
    tagline: string;
    title: string;
    description: string;
    backgroundImage: string;
  };
  servicesData: ServiceSection[];
}

// ========================================
// 2. ANIMATION VARIANTS
// ========================================

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// ========================================
// 3. CLIENT COMPONENT
// ========================================

export default function ServicesClient({ heroData, servicesData }: ServicesClientProps) {
  return (
    <main className="relative min-h-screen bg-[#fdfbf74e] overflow-x-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(26,26,26,0.85)_0%,rgba(255,255,255,0)_100%)]">
        <Image
          src={heroData.backgroundImage}
          alt="Services Hero - Al Mawasim Decor Abu Dhabi"
          fill
          sizes="100vw"
          className="object-cover opacity-60 mix-blend-multiply"
          priority
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center pt-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          <div className="space-y-4">
            <motion.span
              variants={fadeInUp}
              className="inline-block bg-[#C5A869]/80 backdrop-blur-sm text-[#1A1A1A] px-5 py-1.5 rounded-full text-sm font-semibold"
            >
              {heroData.tagline}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-wide"
            >
              {heroData.title}
            </motion.h1>
          </div>

          <motion.div
            variants={fadeInUp}
            className="mt-6 md:mt-0 text-white md:text-right max-w-md lg:max-w-lg"
          >
            <p className="text-lg md:text-xl font-medium leading-snug drop-shadow-md text-gray-200">
              {heroData.description}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <div className="relative z-20 bg-[#FDFBF7] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-32">
        
        {/* Decorative Top Overlap Icon */}
        <motion.div
          initial={{ scale: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, x: "-50%", y: "-50%" }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
          className="absolute top-0 left-1/2 z-30 origin-center"
        >
          <div className="bg-[#C5A869] p-4 rounded-full border-[6px] border-[#FDFBF7] shadow-sm flex items-center justify-center">
            <Palette className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2} />
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-24">
          {servicesData.map((section) => {
            const hasSubCards = section.subCards && section.subCards.length > 0;
            const isResponsiveTextLeft = section.layout === "textLeftResponsive";
            const isImageLeft = section.layout === "imageLeft";

            const textContent = (
              <motion.div
                variants={isImageLeft ? slideInRight : slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={isResponsiveTextLeft ? "order-2 lg:order-1" : undefined}
              >
                <h2 className="text-3xl font-bold text-[#9C7C3E] mb-2">
                  {section.title}
                </h2>
                {/* whitespace-pre-line respects paragraph breaks from the database */}
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4 whitespace-pre-line">
                  {section.subtitle}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {section.description}
                </p>
              </motion.div>
            );

            const imageContent = section.image && (
              <motion.div
                variants={isImageLeft ? slideInLeft : slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={`relative h-[250px] lg:h-[300px] w-full rounded-2xl overflow-hidden shadow-sm ${
                  isResponsiveTextLeft ? "order-1 lg:order-2" : ""
                }`}
              >
                <Image
                  src={section.image}
                  alt={`${section.title} Installation Services in Abu Dhabi`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            );

            return (
              <section
                key={section.id}
                id={section.id}
                className={!hasSubCards ? "grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" : ""}
                style={{ scrollMarginTop: "150px" }}
              >
                {/* Main Row Layer */}
                {hasSubCards ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
                    {isImageLeft ? (
                      <>
                        {imageContent}
                        {textContent}
                      </>
                    ) : (
                      <>
                        {textContent}
                        {imageContent}
                      </>
                    )}
                  </div>
                ) : isImageLeft ? (
                  <>
                    {imageContent}
                    {textContent}
                  </>
                ) : (
                  <>
                    {textContent}
                    {imageContent}
                  </>
                )}

                {/* Sub-Cards Layer */}
                {hasSubCards && (
                  <div className="pt-8">
                    {section.subSectionTitle && (
                      <motion.h4
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-2xl font-semibold text-[#9C7C3E] text-center mb-10"
                      >
                        {section.subSectionTitle}
                      </motion.h4>
                    )}

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className={`grid grid-cols-1 sm:grid-cols-2 ${
                        section.subCards.length === 2 || section.subCards.length === 4
                          ? "lg:grid-cols-2 max-w-4xl mx-auto"
                          : "lg:grid-cols-3"
                      } gap-6 mb-6`}
                    >
                      {section.subCards.map((card) => (
                        <motion.div
                          key={card.id}
                          variants={fadeInUp}
                          className="border border-[#EAE1D0] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow group"
                        >
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={card.img}
                              alt={`Custom ${card.title} in Abu Dhabi`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-5 text-center">
                            <h5 className="font-semibold text-[#1A1A1A] text-base mb-2">
                              {card.title}
                            </h5>
                            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                              {card.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}