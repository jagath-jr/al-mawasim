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

// --- Sector Data ---
const sectors = [
  {
    id: 1,
    title: "Residential",
    subtitle: "Transforming Homes with Elegant Interior Solutions",
    description: "AL MAWASIM DECOR & CURTAINS supports villas, apartments, and residential properties with a comprehensive range of curtains, blinds, flooring, upholstery, and wall finishing solutions. Our expertise in customized interior décor helps homeowners create stylish, comfortable, and functional living environments. From design consultation and material selection to professional installation, we deliver solutions that enhance the beauty and value of every home.",
    image: "/sector-residential.jpg",
  },
  {
    id: 2,
    title: "Commercial Offices",
    subtitle: "Creating Professional & Productive Workspaces",
    description: "AL MAWASIM DECOR & CURTAINS plays a vital role in enhancing office interiors through modern window treatments, flooring solutions, and customized furnishing services. We provide specialized décor solutions for corporate offices, business centers, and commercial facilities. Our experienced team ensures efficient project execution with high-quality finishes that elevate professional environments while maintaining functionality and comfort.",
    image: "/sector-commercial.jpg",
  },
  {
    id: 3,
    title: "Hospitality",
    subtitle: "Interior Solutions for Exceptional Guest Experiences",
    description: "The hospitality sector requires attractive interiors that combine style, comfort, and durability. AL MAWASIM DECOR & CURTAINS provides curtains, upholstery, flooring, wallpapers, and decorative solutions for hotels, resorts, serviced apartments, and hospitality venues. Our solutions are designed to enhance guest experiences, support operational efficiency, and maintain the aesthetic appeal of hospitality properties.",
    image: "/sector-hospitality.jpg",
  },
  {
    id: 4,
    title: "Hotels & Resorts",
    subtitle: "Enhancing Hospitality Interiors with Premium Décor",
    description: "AL MAWASIM DECOR & CURTAINS delivers customized décor and furnishing services for hotel rooms, lobbies, restaurants, and recreational spaces. We assist clients with window treatments, upholstery, flooring upgrades, and decorative wall finishes, helping them maintain luxurious interiors and create welcoming environments that leave lasting impressions on guests.",
    image: "/sector-hotels.jpg",
  },
  {
    id: 5,
    title: "Retail & Showrooms",
    subtitle: "Elevating Customer Experiences Through Design",
    description: "Retail environments rely on attractive interiors to engage customers and strengthen brand identity. AL MAWASIM DECOR & CURTAINS supports retail stores, boutiques, and showrooms with customized décor solutions that improve visual appeal and functionality. Our services help businesses create inviting spaces while maintaining durability and practical performance.",
    image: "/sector-retail.jpg",
  },
  {
    id: 6,
    title: "Educational Institutions",
    subtitle: "Creating Comfortable Learning Environments",
    description: "Schools, colleges, and educational facilities require practical and aesthetically pleasing interior solutions. AL MAWASIM DECOR & CURTAINS provides curtains, blinds, flooring, and furnishing solutions that contribute to comfortable and productive learning spaces. Our services are designed to meet the functional requirements of educational environments while enhancing their overall appearance.",
    image: "/sector-education.jpg",
  },
  {
    id: 7,
    title: "Healthcare Facilities",
    subtitle: "Enhancing Medical & Care Environments",
    description: "AL MAWASIM DECOR & CURTAINS provides specialized interior solutions for clinics, hospitals, medical centers, and healthcare facilities. Our expertise includes privacy curtains, flooring systems, blinds, and wall finishing solutions designed to support comfort, hygiene, and functionality. We work closely with clients to deliver reliable solutions that meet operational needs while creating welcoming healthcare environments.",
    image: "/sector-healthcare.jpg",
  },
];

export default function SectorPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-white">      
      {/* ========================================
        1. FIXED BACKGROUND IMAGE (Parallax)
        ========================================
      */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(110,95,165,0.75)_0%,rgba(255,255,255,0)_100%)]">
        <Image
          src="/sector-page-hero.webp" // Recommend replacing with an interior living space image
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
              Sector
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
                  src="/sector-intro-curtains.jpg" // Update with curtain close-up image
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
                  Industries We Serve
                </h2>
                <h3 className="text-xl md:text-2xl font-medium text-[#1e293b] leading-snug">
                  Supporting Residential & Commercial Spaces with Premium Interior Solutions
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  AL MAWASIM DECOR & CURTAINS provides specialized interior décor and furnishing solutions across a diverse range of sectors. Our experience, skilled workforce, and premium product selections enable us to meet the unique design and functional requirements of every space we serve.
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
          {sectors.map((sector, index) => {
            // Determine if the layout should be reversed (Image on left, Text on right)
            const isReversed = index % 2 !== 0;
            // Alternating background colors to match the mockup style
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
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2">
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