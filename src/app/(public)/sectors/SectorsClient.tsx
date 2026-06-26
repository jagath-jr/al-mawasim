"use client";

import Image from "next/image";
import { Briefcase } from "lucide-react";
import { motion, Variants } from "framer-motion";

// --- Explicitly Typed Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
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

// --- Fallback Sector Data ---
const fallbackSectors = [
  {
    id: 1,
    title: "Residential",
    subtitle: "Transforming Homes with Elegant Interior Solutions",
    description: "AL MAWASIM DECOR & CURTAINS provides custom curtains, motorized curtains, roller blinds, zebra blinds, SPC flooring, wallpaper installation, and furniture upholstery solutions for villas, apartments, and residential properties across Abu Dhabi, creating stylish and comfortable living spaces.",
    image: "/sectors/Residential-sectors.webp",
  },
  {
    id: 2,
    title: "Commercial Offices",
    subtitle: "Professional Interior Solutions for Offices & Workspaces",
    description: "We provide office curtains, roller blinds, vertical blinds, SPC flooring, and customized furnishing solutions for offices, business centers, and commercial facilities across Abu Dhabi, creating functional and professional workspaces.",
    image: "/sectors/CommercialOffices-sectors.webp",
  },
  {
    id: 3,
    title: "Hospitality",
    subtitle: "Premium Décor Solutions for Hotels & Hospitality Spaces",
    description: "The hospitality sector requires attractive interiors that combine style, comfort, and durability. AL MAWASIM DECOR & CURTAINS provides hotel curtains, motorized curtains, upholstery, SPC flooring, wallpaper installation, and decorative solutions for hotels, resorts, serviced apartments, and hospitality venues throughout Abu Dhabi.",
    image: "/sectors/Hospitality-sectors.webp",
  },
  {
    id: 4,
    title: "Hotels & Resorts",
    subtitle: "Luxury Interior Solutions for Hotels & Resorts",
    description: "We provide motorized curtains, window treatments, upholstery, flooring, and wall finishing solutions for hotels and resorts across Abu Dhabi, creating elegant interiors that enhance guest comfort and experience.",
    image: "/sectors/Hotels-Resorts-sectors.webp",
  },
  {
    id: 5,
    title: "Retail & Showrooms",
    subtitle: "Stylish Interiors for Retail Stores & Showrooms",
    description: "We provide custom curtains, roller blinds, flooring, wallpaper installation, and decorative solutions for retail stores, boutiques, and showrooms across Abu Dhabi, helping create attractive and functional commercial spaces.",
    image: "/sectors/Retail-Showrooms-sectors.webp",
  },
  {
    id: 6,
    title: "Educational Institutions",
    subtitle: "Interior Solutions for Schools & Educational Facilities",
    description: "AL MAWASIM DECOR & CURTAINS provides curtains, roller blinds, flooring, and furnishing solutions for schools, colleges, and educational facilities across Abu Dhabi, helping create comfortable and productive learning environments.",
    image: "/sectors/EducationalInstitutions-sectors.webp",
  },
  {
    id: 7,
    title: "Healthcare Facilities",
    subtitle: "Specialized Interior Solutions for Healthcare Facilities",
    description: "We provide privacy curtains, roller blinds, flooring systems, wallpaper installation, and wall finishing solutions for clinics, hospitals, and medical centers across Abu Dhabi, improving comfort, hygiene, and functionality.",
    image: "/sectors/HealthcareFacilities-sectors.webp",
  },
];

export interface SectorsClientProps {
  initialData?: any;
}

export default function SectorsClient({ initialData }: SectorsClientProps) {
  
  // Extract CMS Data
  const cmsSectors = initialData?.sectorsConfig?.sectors || [];

  // Map CMS data to UI format, sorting by the 'order' field if available
  const displaySectors = cmsSectors.length > 0 
    ? [...cmsSectors]
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
        .map((s: any, idx: number) => ({
          id: s.id || Math.random().toString(),
          title: s.name,
          subtitle: fallbackSectors[idx]?.subtitle || "", // Fallback since subtitle wasn't in schema
          description: s.description,
          image: s.featuredImage?.url || fallbackSectors[idx]?.image || "/sectors/Residential-sectors.webp"
        }))
    : fallbackSectors;

  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-[#f8f9fc4e]">      
      {/* ========================================
        1. FIXED BACKGROUND IMAGE (Parallax)
        ========================================
      */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(110,95,165,0.75)_0%,rgba(255,255,255,0)_100%)]">
        <Image
          src="/sectors/bg-sectors.webp"
          alt="Interior Sector Overview"
          fill
          className="object-cover opacity-40 mix-blend-multiply"
          priority
        />
      </div>

      {/* ========================================
        2. HERO TEXT CONTENT
        ========================================
      */}
      <section className="relative w-full h-[350px] md:h-[450px] flex items-center pt-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          {/* Left Side: Badge and Title */}
          <div className="space-y-4">
            <motion.span 
              variants={fadeInUp}
              className="inline-block bg-white/20 backdrop-blur-sm text-white px-5 py-1.5 rounded-full text-sm font-medium tracking-wide"
            >
              Our Service
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-wide"
            >
              {initialData?.title || "Sector"}
            </motion.h1>
          </div>

          {/* Right Side: Description */}
          <motion.div 
            variants={fadeInUp}
            className="mt-6 md:mt-0 md:text-right max-w-md lg:max-w-lg"
          >
            <p className="text-lg md:text-xl font-medium leading-snug drop-shadow-md text-[#3b3470]">
              Premium Curtains, Blinds & Interior Solutions Abu Dhabi
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================
        3. MAIN CONTENT
        ========================================
      */}
      <div className="relative z-20 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-0">
        
        {/* Decorative Top Overlap Icon */}
        <motion.div 
          initial={{ scale: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, x: "-50%", y: "-50%" }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
          className="absolute top-0 left-1/2 z-30 origin-center"
        >
          <div className="bg-[#4a398c] p-4 rounded-full border-[6px] border-white shadow-sm flex items-center justify-center">
            <Briefcase className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* --- INTRO SECTION --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div 
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm"
              >
                <Image 
                  src="/sectors/OurSector-sectors.webp"
                  alt="Industries We Serve" 
                  fill 
                  className="object-cover" 
                />
              </motion.div>

              <motion.div 
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-5"
              >
                <h2 className="text-3xl md:text-4xl font-semibold text-[#4a398c]">
                  Our Sector
                </h2>
                <h3 className="text-xl md:text-2xl font-medium text-[#1e293b] leading-snug">
                  Interior Solutions for Residential, Commercial & Hospitality Spaces in Abu Dhabi
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  AL MAWASIM DECOR & CURTAINS provides premium curtains, blinds, flooring, wallpaper installation, upholstery, and interior décor solutions for residential, commercial, hospitality, retail, educational, and healthcare sectors across Abu Dhabi. Our experienced team delivers customized solutions, premium materials, and professional installation services tailored to the unique requirements of every space.
                </p>
              </motion.div>
            </div>
          </section>

          {/* --- CENTERED TITLE --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-8"
          >
            <h2 className="text-3xl md:text-5xl font-semibold text-[#4a398c]">
              Industries We Serve
            </h2>
            <div className="w-24 h-1.5 bg-[#4a398c] mx-auto mt-6 rounded-full"></div>
          </motion.div>
        </div>

        {/* --- ALTERNATING SECTORS LIST --- */}
        <section className="flex flex-col w-full pb-20 mt-8">
          {displaySectors.map((sector: any, index: number) => {
            // Determine if the layout should be reversed (Image on left, Text on right)
            const isReversed = index % 2 !== 0;
            // Alternating background colors
            const bgClass = isReversed ? "bg-[#f8f9fc]" : "bg-white";

            return (
              <div 
                key={sector.id} 
                className={`w-full py-16 lg:py-24 ${bgClass}`}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    
                    {/* Text Content */}
                    <motion.div 
                      variants={isReversed ? slideInRight : slideInLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className={`space-y-4 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
                    >
                      <h3 className="text-2xl md:text-4xl font-semibold text-[#4a398c]">
                        {sector.title}
                      </h3>
                      <h4 className="text-lg md:text-xl font-medium text-[#1e293b]">
                        {sector.subtitle}
                      </h4>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2 whitespace-pre-line">
                        {sector.description}
                      </p>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div 
                      variants={isReversed ? slideInLeft : slideInRight}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className={`relative w-full h-[250px] md:h-[320px] rounded-[1.25rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
                    >
                      <Image 
                        src={sector.image} 
                        alt={sector.title} 
                        fill 
                        className="object-cover transition-transform duration-700 hover:scale-105" 
                      />
                    </motion.div>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </section>

      </div>
    </main>
  );
}
