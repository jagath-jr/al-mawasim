"use client";

import Image from "next/image";
import { Image as ImageIcon } from "lucide-react"; // Renamed to avoid conflict with next/image
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

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// --- Dummy Data for Projects (Updated for Interior Decor) ---
const projects = [
  {
    id: 1,
    title: "Luxury Villa Curtains",
    location: "Downtown Dubai",
    image: "/project-1.jpg", 
  },
  {
    id: 2,
    title: "Corporate Office Blinds",
    location: "Business Bay, Dubai",
    image: "/project-2.jpg",
  },
  {
    id: 3,
    title: "Boutique Hotel Flooring",
    location: "Jumeirah, Dubai",
    image: "/project-3.jpg",
  },
  {
    id: 4,
    title: "Modern Apartment Upholstery",
    location: "Dubai Marina",
    image: "/project-4.jpg",
  },
  {
    id: 5,
    title: "Restaurant Wall Finishes",
    location: "DIFC, Dubai",
    image: "/project-5.jpg",
  },
  {
    id: 6,
    title: "Penthouse Interior Furnishing",
    location: "Palm Jumeirah",
    image: "/project-6.jpg",
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-[#f8f9fc]">      
      {/* ========================================
        1. FIXED BACKGROUND IMAGE (Parallax)
        ========================================
      */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(110,95,165,0.75)_0%,rgba(255,255,255,0)_100%)]">
        <Image
          src="/project-page-hero.webp" // Recommend replacing with an interior/curtain hero shot
          alt="Interior Projects"
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
              Discover
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-wide"
            >
              Our Projects
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
        3. MAIN CONTENT (Solid Background)
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
            <ImageIcon className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Projects Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                variants={cardVariant}
                className="flex flex-col group cursor-pointer"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative w-full h-[280px] rounded-[1.25rem] overflow-hidden mb-5 shadow-sm">
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content Container (Centered matching the mockup) */}
                <div className="text-center px-2">
                  <h3 className="text-2xl font-semibold text-[#112440] mb-1">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {project.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </section>
      </div>
    </main>
  );
}