"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
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

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// --- Expertise Data ---
const expertiseAreas = [
  {
    id: 1,
    title: "Curtains & Motorized Curtain Solutions",
    description: "Beautiful window treatments require precision, quality materials, and professional installation. Our curtain solutions provide elegant designs, seamless operation, and customized finishes for homes, offices, hotels, and commercial interiors.",
    image: "/expertise-curtains.jpg",
  },
  {
    id: 2,
    title: "Blinds & Window Covering Solutions",
    description: "Effective light control and privacy are essential for modern interiors. Our roller, zebra, vertical, and Venetian blinds help create comfortable spaces while maintaining style, functionality, and long-lasting performance.",
    image: "/expertise-blinds.jpg",
  },
  {
    id: 3,
    title: "Flooring Solutions",
    description: "The right flooring enhances both aesthetics and durability. We provide laminate wood, SPC, and luxury vinyl flooring solutions designed to improve interior spaces while ensuring easy maintenance and lasting value.",
    image: "/expertise-flooring.jpg",
  },
  {
    id: 4,
    title: "Sofa Upholstery Solutions",
    description: "We restore and customize furniture with premium upholstery materials, expert craftsmanship, and stylish finishes that improve comfort, appearance, and durability for residential and commercial environments.",
    image: "/expertise-upholstery.jpg",
  },
  {
    id: 5,
    title: "Wallpaper & Wall Finishing Solutions",
    description: "Our wallpaper and decorative wall finishing services add character, texture, and sophistication to interior spaces while creating unique environments that reflect modern design preferences.",
    image: "/expertise-wallpaper.jpg",
  },
  {
    id: 6,
    title: "Custom Cupboards & Interior Furnishings",
    description: "We provide practical storage and furnishing solutions designed to maximize space utilization, improve organization, and enhance the overall functionality and appearance of interior environments.",
    image: "/expertise-cupboards.jpg",
  },
];

export default function ExpertisePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden w-full">      
      {/* ========================================
        1. FIXED BACKGROUND IMAGE (Parallax)
        ========================================
      */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(110,95,165,0.75)_0%,rgba(255,255,255,0)_100%)]">
        {/* Recommend replacing with a bright window/interior background as seen in the design */}
        <Image
          src="/expertise-page-hero.webp" 
          alt="Expertise Background"
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
              className="inline-block bg-white/20 backdrop-blur-sm text-white px-5 py-1.5 rounded-full text-sm font-medium"
            >
              Our Service
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-wide"
            >
              Expertise
            </motion.h1>
          </div>

          {/* Right Side: Description */}
          <motion.div 
            variants={fadeInUp}
            className="mt-6 md:mt-0 md:text-right max-w-md lg:max-w-lg"
          >
            <p className="text-lg md:text-xl font-medium leading-snug drop-shadow-md text-[#3b3470]">
              Premium Curtains, Blinds & Interior Solutions
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================
        3. MAIN CONTENT (White & Light Gray Backgrounds)
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
            <Mail className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* --- INTRO SECTION --- */}
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
                  src="/expertise-intro.jpg" // Update with the drywall installation image or similar
                  alt="Team installing interior elements" 
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
                  Our Expertise
                </h2>
                <h3 className="text-xl md:text-3xl font-semibold text-[#1e293b] leading-snug pb-2">
                  Trusted Interior Décor & Furnishing Partner
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  AL MAWASIM DECOR & CURTAINS combines industry expertise, premium materials, and skilled craftsmanship to deliver exceptional interior solutions for residential, commercial, hospitality, and office spaces. We help clients transform interiors through customized curtains, blinds, flooring, upholstery, and wall finishing services that are stylish, functional, and tailored to their specific design requirements.
                </p>
              </motion.div>
            </div>
          </section>
        </div>

        {/* --- AREA OF EXPERTISE GRID SECTION (Light Gray Background) --- */}
        <div className="bg-[#f8f9fc] w-full pt-16 pb-32 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Centered Title */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center pb-16"
            >
              <h2 className="text-3xl md:text-5xl font-semibold text-[#4a398c]">
                Area of Expertise
              </h2>
              <div className="w-24 h-1.5 bg-[#4a398c] mx-auto mt-6 rounded-full"></div>
            </motion.div>

            {/* Grid */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
            >
              {expertiseAreas.map((area) => (
                <motion.div 
                  key={area.id}
                  variants={cardVariant}
                  className="flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-56 md:h-52 overflow-hidden rounded-2xl shadow-sm mb-6">
                    <Image 
                      src={area.image}
                      alt={area.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-[#1e293b] mb-3">
                      {area.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}