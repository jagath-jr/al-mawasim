"use client";

import React from "react";
import Image from "next/image";
import { Palette } from "lucide-react";
import { motion, Variants } from "framer-motion";

// ========================================
// 1. DATA MODELS & CONTENT
// ========================================

const heroData = {
  tagline: "Our Service",
  title: "Our Services",
  description: "Premium Curtains, Blinds & Interior Solutions",
  backgroundImage: "/services-page-hero.webp", // Update with your actual image path
};

type LayoutType = "textLeft" | "textLeftResponsive" | "imageLeft";

interface SubCard {
  title: string;
  desc: string;
  img: string;
}

interface ServiceSection {
  id: string;
  title: string;
  subtitle: React.ReactNode;
  description: React.ReactNode;
  image: string;
  layout: LayoutType;
  subSectionTitle?: string;
  subCards?: SubCard[];
}

const servicesData: ServiceSection[] = [
  {
    id: "curtains",
    title: "Curtains",
    subtitle: (
      <>
        Elegant Curtain Solutions for Residential &<br />
        Commercial Interiors
      </>
    ),
    description: (
      <>
        AL MAWASIM DECOR & CURTAINS provides exquisite curtain solutions that enhance the aesthetic appeal and functionality of any space. From classic drapes to modern motorized systems, we offer premium fabrics, precise tailoring, and professional installation services to perfectly match your interior design preferences.
      </>
    ),
    image: "/service-curtains-main.jpg",
    layout: "textLeft",
    subSectionTitle: "Available Curtain Types",
    subCards: [
      {
        title: "Curtains",
        desc: "Classic and contemporary fabric curtains designed to add warmth and elegance to any room.",
        img: "/curtain-type-1.jpg",
      },
      {
        title: "Office Curtains",
        desc: "Professional and sleek window coverings optimized for light control in corporate environments.",
        img: "/curtain-type-2.jpg",
      },
      {
        title: "Motorized Curtains",
        desc: "Convenient and modern automated curtain systems for seamless operation.",
        img: "/curtain-type-3.jpg",
      },
      {
        title: "Roller Blinds",
        desc: "Simple, effective, and stylish roller blinds available in various opacities.",
        img: "/curtain-type-4.jpg",
      },
      {
        title: "Zebra Blinds",
        desc: "Adjustable light control with unique alternating sheer and solid stripes.",
        img: "/curtain-type-5.jpg",
      },
      {
        title: "Vertical Blinds",
        desc: "Perfect for large windows and sliding doors, offering excellent privacy and light management.",
        img: "/curtain-type-6.jpg",
      },
      {
        title: "Aluminum Venetian Blinds",
        desc: "Durable, moisture-resistant, and stylish metallic blinds for a modern touch.",
        img: "/curtain-type-7.jpg",
      },
    ],
  },
  {
    id: "furniture-upholstery",
    title: "Furniture & Upholstery",
    subtitle: (
      <>
        Premium Furniture Enhancement &<br />
        Upholstery Solutions
      </>
    ),
    description: (
      <>
        AL MAWASIM DECOR & CURTAINS offers specialized furniture upholstery and restoration services. We breathe new life into your sofas, chairs, and custom seating with high-quality fabrics, expert craftsmanship, and meticulous attention to detail, ensuring comfort and elegance.
      </>
    ),
    image: "/service-upholstery-main.jpg",
    layout: "textLeftResponsive",
    subSectionTitle: "Available Furniture Solutions",
    subCards: [
      {
        title: "Sofa Upholstery",
        desc: "Revitalize your living room with custom sofa reupholstery using premium fabrics and materials.",
        img: "/upholstery-1.jpg",
      },
      {
        title: "Custom Furniture & Upholstery Solutions",
        desc: "Bespoke furniture pieces tailored to your exact comfort and aesthetic requirements.",
        img: "/upholstery-2.jpg",
      },
    ],
  },
  {
    id: "flooring",
    title: "Flooring Options",
    subtitle: (
      <>
        Durable Flooring Solutions for Modern<br />
        Interior Spaces
      </>
    ),
    description: (
      <>
        AL MAWASIM DECOR & CURTAINS provides a wide range of premium flooring solutions to suit any style and requirement. From laminate and hardwood to luxury vinyl and SPC flooring, we deliver flawless installation services that add warmth, character, and lasting value to your spaces.
      </>
    ),
    image: "/service-flooring-main.jpg",
    layout: "imageLeft",
    subSectionTitle: "Available Flooring Types",
    subCards: [
      {
        title: "Laminate/Wood Flooring",
        desc: "Classic and elegant wood finishes that bring natural warmth to any room.",
        img: "/flooring-1.jpg",
      },
      {
        title: "SPC Flooring",
        desc: "Stone Plastic Composite flooring offering superior durability and water resistance.",
        img: "/flooring-2.jpg",
      },
      {
        title: "LVT Flooring",
        desc: "Luxury Vinyl Tiles that beautifully mimic natural materials with easy maintenance.",
        img: "/flooring-3.jpg",
      },
    ],
  },
  {
    id: "wall-finishes",
    title: "Wall Finishes",
    subtitle: (
      <>
        Decorative Wall Solutions for Beautiful<br />
        Residential & Commercial Spaces
      </>
    ),
    description: (
      <>
        Transform your walls into stunning focal points with our extensive range of wallpapers and decorative wall finishes. We offer customized designs, varied textures, and professional installation to elevate the ambiance of any room.
      </>
    ),
    image: "/service-wall-main.jpg",
    layout: "textLeft",
    subSectionTitle: "Available Wall Finishes Types",
    subCards: [
      {
        title: "Wallpaper & Wallcoverings",
        desc: "A vast selection of patterns, textures, and murals to instantly upgrade your interiors.",
        img: "/wall-1.jpg",
      },
      {
        title: "Painting Services",
        desc: "Professional interior painting services for a fresh, vibrant, and flawless finish.",
        img: "/wall-2.jpg",
      },
    ],
  },
  {
    id: "carpets",
    title: "Carpets & Rugs",
    subtitle: (
      <>
        Comfortable Flooring Environments for<br />
        Residential & Commercial Spaces
      </>
    ),
    description: (
      <>
        Enhance comfort and acoustics with our premium carpet and rug collections. Whether you need wall-to-wall carpeting for commercial spaces or customized rugs for residential living areas, we provide high-quality materials and expert fitting.
      </>
    ),
    image: "/service-carpets-main.jpg",
    layout: "textLeftResponsive",
    subSectionTitle: "Available Carpets Types",
    subCards: [
      {
        title: "Carpets",
        desc: "Plush and durable broadloom carpets ideal for bedrooms, offices, and hotels.",
        img: "/carpet-1.jpg",
      },
      {
        title: "Custom Carpet Solutions",
        desc: "Bespoke rugs and carpets designed to fit your unique dimensions and style.",
        img: "/carpet-2.jpg",
      },
    ],
  },
  {
    id: "storage",
    title: "Storage & Interior Solutions",
    subtitle: (
      <>
        Custom Cabinets & Smart Storage Solutions for<br />
        Organized Spaces
      </>
    ),
    description: (
      <>
        Maximize your space with our custom cupboards, wardrobes, and interior storage solutions. We design and install functional, aesthetically pleasing storage units tailored to your specific organizational needs and interior aesthetics.
      </>
    ),
    image: "/service-storage-main.jpg",
    layout: "imageLeft",
    subSectionTitle: "Available Storage & Interior Types",
    subCards: [
      {
        title: "Custom Media Cabinets",
        desc: "Sleek and functional entertainment units designed for modern living rooms.",
        img: "/storage-1.jpg",
      },
      {
        title: "Functional Storage Units",
        desc: "Smart shelving and wardrobe systems that optimize your available space.",
        img: "/storage-2.jpg",
      },
    ],
  },
];

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
// 3. PAGE COMPONENT
// ========================================

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#f8f9fc] overflow-x-hidden">      
      {/* ========================================
        FIXED BACKGROUND IMAGE (Parallax)
        ========================================
      */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(110,95,165,0.75)_0%,rgba(255,255,255,0)_100%)]">
        <Image
          src={heroData.backgroundImage}
          alt="Services Hero"
          fill
          className="object-cover opacity-60 mix-blend-multiply"
          priority
        />
      </div>

      {/* ========================================
        HERO TEXT CONTENT
        ========================================
      */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center pt-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          {/* Left Side */}
          <div className="space-y-4">
            <motion.span
              variants={fadeInUp}
              className="inline-block bg-white/20 backdrop-blur-sm text-white px-5 py-1.5 rounded-full text-sm font-medium"
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

          {/* Right Side */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 md:mt-0 text-white md:text-right max-w-md lg:max-w-lg"
          >
            <p className="text-lg md:text-xl font-medium leading-snug drop-shadow-md lg:text-[#3b3470]">
              {heroData.description}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================
        MAIN CONTENT
        ========================================
      */}
      <div className="relative z-20 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-32">
        {/* Decorative Top Overlap Icon */}
        <motion.div
          initial={{ scale: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, x: "-50%", y: "-50%" }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
          className="absolute top-0 left-1/2 z-30 origin-center"
        >
          <div className="bg-[#4a398c] p-4 rounded-full border-[6px] border-white shadow-sm flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-24">
          {servicesData.map((section) => {
            const hasSubCards = section.subCards && section.subCards.length > 0;

            // Generate Layout specific classes based on enum
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
                <h2 className="text-3xl font-bold text-[#4a398c] mb-2">
                  {section.title}
                </h2>
                <h3 className="text-lg font-semibold text-[#1e293b] mb-4">
                  {section.subtitle}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {section.description}
                </p>
              </motion.div>
            );

            const imageContent = (
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
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            );

            return (
              <section
                key={section.id}
                className={
                  !hasSubCards ? "grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" : ""
                }
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

                {/* Sub-Cards Layer (Rendered conditionally) */}
                {hasSubCards && (
                  <div className="pt-8">
                    <motion.h4
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="text-2xl font-semibold text-[#4a398c] text-center mb-10"
                    >
                      {section.subSectionTitle}
                    </motion.h4>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className={`grid grid-cols-1 sm:grid-cols-2 ${
                        section.subCards!.length === 2 || section.subCards!.length === 4
                          ? "lg:grid-cols-2 max-w-4xl mx-auto"
                          : "lg:grid-cols-3"
                      } gap-6 mb-6`}
                    >
                      {section.subCards!.map((card, idx) => (
                        <motion.div
                          key={idx}
                          variants={fadeInUp}
                          className="border border-[#e4e6fb] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow group"
                        >
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={card.img}
                              alt={card.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-5 text-center">
                            <h5 className="font-semibold text-[#1e293b] text-base mb-2">
                              {card.title}
                            </h5>
                            <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
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