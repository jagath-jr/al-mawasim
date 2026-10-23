"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Palette } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
// 2. CLIENT COMPONENT
// ========================================

export default function ServicesClient({ heroData, servicesData }: ServicesClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // --- HERO ANIMATIONS (on load, not scroll) ---
      gsap.fromTo(
        "[data-hero-item]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Decorative palette icon
      gsap.fromTo(
        "[data-hero-icon]",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(2)",
          delay: 0.6,
        }
      );

      // --- SCROLL-TRIGGERED ANIMATIONS ---
      // Every element with data-animate will fade up when scrolled into view
      gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Directional animations (slide in from left/right)
      gsap.utils.toArray<HTMLElement>("[data-animate-left]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-animate-right]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    // Refresh ScrollTrigger after images load / layout settles
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-[#fdfbf74e] overflow-x-hidden"
    >
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-4">
            <span
              data-hero-item
              className="inline-block bg-[#C5A869]/80 backdrop-blur-sm text-[#1A1A1A] px-5 py-1.5 rounded-full text-sm font-semibold"
            >
              {heroData.tagline}
            </span>
            <h1
              data-hero-item
              className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-wide"
            >
              {heroData.title}
            </h1>
          </div>

          <div
            data-hero-item
            className="mt-6 md:mt-0 text-white md:text-right max-w-md lg:max-w-lg"
          >
            <p className="text-lg md:text-xl font-medium leading-snug drop-shadow-md text-gray-200">
              {heroData.description}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="relative z-20 bg-[#FDFBF7] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-32">
        {/* Decorative Top Overlap Icon */}
        <div
          data-hero-icon
          className="absolute top-0 left-1/2 z-30 origin-center"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="bg-[#C5A869] p-4 rounded-full border-[6px] border-[#FDFBF7] shadow-sm flex items-center justify-center">
            <Palette className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-24">
          {servicesData.map((section) => {
            const hasSubCards = section.subCards && section.subCards.length > 0;
            const isResponsiveTextLeft = section.layout === "textLeftResponsive";
            const isImageLeft = section.layout === "imageLeft";

            // Text block with directional animation
            const textContent = (
              <div
                data-animate-left={!isImageLeft ? "" : undefined}
                data-animate-right={isImageLeft ? "" : undefined}
                data-animate={undefined}
                className={isResponsiveTextLeft ? "order-2 lg:order-1" : undefined}
              >
                <h2 className="text-3xl font-bold text-[#9C7C3E] mb-2">
                  {section.title}
                </h2>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4 whitespace-pre-line">
                  {section.subtitle}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {section.description}
                </p>
              </div>
            );

            // Image block with directional animation (opposite of text)
            const imageContent = section.image && (
              <div
                data-animate-right={!isImageLeft ? "" : undefined}
                data-animate-left={isImageLeft ? "" : undefined}
                data-animate={undefined}
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
              </div>
            );

            return (
              <section
                key={section.id}
                id={section.id}
                className={
                  !hasSubCards
                    ? "grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                    : ""
                }
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
                      <h4
                        data-animate
                        className="text-2xl font-semibold text-[#9C7C3E] text-center mb-10"
                      >
                        {section.subSectionTitle}
                      </h4>
                    )}

                    <div
                      className={`grid grid-cols-1 sm:grid-cols-2 ${
                        section.subCards.length === 2 ||
                        section.subCards.length === 4
                          ? "lg:grid-cols-2 max-w-4xl mx-auto"
                          : "lg:grid-cols-3"
                      } gap-6 mb-6`}
                    >
                      {section.subCards.map((card) => (
                        <div
                          key={card.id}
                          data-animate
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
                        </div>
                      ))}
                    </div>
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