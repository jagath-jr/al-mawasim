"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Users, Check } from "lucide-react";
import { motion, Variants, useMotionValue, useTransform, animate, useInView } from "framer-motion";

// --- Custom Animated Counter Component ---
function AnimatedNumber({ to }: { to: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration: 2, ease: "easeOut" });
    }
  }, [inView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

// --- Explicitly Typed Animation Variants ---
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

// Variant for the Masonry Grid to stagger and slide
const masonryContainer: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.7, 
      ease: "easeOut",
      staggerChildren: 0.15 
    } 
  },
};

// Zoom-in variant for the individual boxes
const zoomInBox: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// --- Features Data ---
const features = [
  {
    title: "Experienced Professionals",
    description: "Skilled specialists delivering quality workmanship and reliable service."
  },
  {
    title: "Customized Design Solutions",
    description: "Tailored interior solutions for every style and space."
  },
  {
    title: "Premium Quality Materials",
    description: "High-quality materials ensuring durability and elegant finishes."
  },
  {
    title: "Professional Service Approach",
    description: "Clear communication and dependable project execution."
  },
  {
    title: "Fast Project Completion",
    description: "Efficient delivery and timely installation services."
  },
  {
    title: "Commitment to Excellence",
    description: "Dedicated to quality, reliability, and customer satisfaction."
  }
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-[#f8f9fc56]">      
      {/* ========================================
        1. FIXED BACKGROUND IMAGE (Parallax)
        ========================================
      */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(110,95,165,0.75)_0%,rgba(255,255,255,0)_100%)]">
        <Image
          src="/about-us/aboutus-bg-img.webp" // Recommend replacing with a curtain/interior wide shot
          alt="About Us Background"
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
              About Us
            </motion.h1>
          </div>

          <motion.div 
            variants={fadeInUp}
            className="mt-6 md:mt-0 text-white md:text-right max-w-md lg:max-w-lg"
          >
            <p className="text-lg md:text-xl font-medium leading-snug drop-shadow-md lg:text-[#3b3470]">
              Premium Curtains, Blinds & Interior Solutions
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================
        3. MAIN CONTENT
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
            <Users className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-24 lg:space-y-32">
          
          {/* --- SECTION 1: HISTORY & MASONRY GRID --- */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Text Content */}
            <motion.div 
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-6"
            >
              <span className="inline-block bg-[#e4e6fb] text-[#4a398c] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
                Welcome
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1e293b] leading-tight">
                History of Our Company
              </h2>
              <div className="space-y-4 text-slate-500 text-sm md:text-base leading-relaxed">
                <p>
                  Welcome to AL MAWASIM DECOR & CURTAINS – LLC, your trusted partner for premium interior décor, curtains, blinds, flooring, upholstery, and wall finishing solutions. With years of industry experience and a commitment to quality craftsmanship, we specialize in delivering customized interior solutions tailored to the unique requirements of residential, commercial, hospitality, and office spaces. 
                </p>
                <p>
                  From elegant curtains and motorized systems to flooring, wallpapers, upholstery, and custom furnishings, our experienced team is dedicated to providing stylish, functional, and professionally installed solutions that enhance every environment. Our focus on quality, reliability, and customer satisfaction enables us to transform spaces of all sizes while building long-term relationships based on trust, excellence, and outstanding service.
                </p>
              </div>
            </motion.div>

            {/* Right: Masonry Grid Layout with Zoom & Counter Animations */}
            <motion.div 
              variants={masonryContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-4 lg:gap-6"
            >
              {/* Column 1 */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <motion.div variants={zoomInBox} className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden shadow-sm">
                  <Image 
                    src="/interior-flooring.jpg" // Update image path
                    alt="Team installing flooring" 
                    fill 
                    className="object-cover" 
                  />
                </motion.div>
                <motion.div variants={zoomInBox} className="bg-[#4a398c] rounded-xl p-6 md:p-8 flex flex-col justify-center items-center text-white shadow-sm h-36 md:h-40">
                  <h4 className="text-4xl md:text-5xl font-bold mb-1 flex items-center">
                    <AnimatedNumber to={500} /><span className="text-2xl md:text-3xl ml-1">+</span>
                  </h4>
                  <p className="text-xs md:text-sm font-medium text-white/90">Projects Completed</p>
                </motion.div>
              </div>

              {/* Column 2 (Offset downwards) */}
              <div className="flex flex-col gap-4 lg:gap-6 pt-8 md:pt-12">
                <motion.div variants={zoomInBox} className="bg-[#eff0fc] rounded-xl p-6 md:p-8 flex flex-col justify-center items-center text-[#1e293b] shadow-sm h-36 md:h-40">
                  <h4 className="text-4xl md:text-5xl font-bold mb-1 flex items-baseline">
                    <AnimatedNumber to={100} /><span className="text-2xl md:text-3xl ml-1">%</span>
                  </h4>
                  <p className="text-xs md:text-sm font-medium text-slate-600">Customer Satisification</p>
                </motion.div>
                <motion.div variants={zoomInBox} className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden shadow-sm">
                  <Image 
                    src="/interior-living.jpg" // Update image path
                    alt="Living room interior" 
                    fill 
                    className="object-cover" 
                  />
                </motion.div>
              </div>
            </motion.div>

          </section>

          {/* --- SECTION 2: WHY CHOOSE US --- */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#f2f4fb] rounded-3xl p-8 md:p-16 shadow-sm"
          >
            <div className="text-center mb-16 flex flex-col items-center">
              <span className="bg-[#e4e6fb] text-[#4a398c] px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
                Top 6 Reasons
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-6">
                Why Choose Us
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Delivering premium interior décor solutions with quality craftsmanship, professional installation, and customized designs for residential and commercial spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-12">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="bg-[#4a398c] p-2 rounded-lg shrink-0 mt-1 shadow-sm">
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-[#1e293b] font-semibold text-lg mb-2">{feature.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* --- SECTION 3: THE SPACES WE SERVE --- */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-8">
            
            {/* Left: Brands/Logos Grid mimicking the mockup */}
            <motion.div 
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="order-2 lg:order-1 relative w-full h-[300px] lg:h-[400px] flex items-center justify-center bg-[#f8f9fc] rounded-2xl p-6"
            >
              {/* Replace this block with your actual grouped logos image if preferred */}
              <div className="relative w-full h-full opacity-90 transition-transform duration-700 hover:scale-105">
                <Image 
                  src="/about-us/aboutl-us-services.png" // Update with the actual logos compilation image
                  alt="Brands We Work With" 
                  fill 
                  className="object-contain" 
                />
              </div>
            </motion.div>

            {/* Right: Text Content */}
            <motion.div 
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="order-1 lg:order-2 space-y-6"
            >
              <span className="inline-block bg-[#e4e6fb] text-[#4a398c] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
                Services Process
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1e293b] leading-tight">
                The Spaces We Serve
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                AL MAWASIM DECOR & CURTAINS serves a diverse range of residential, commercial, hospitality, and office environments through premium décor solutions, skilled craftsmanship, and customized interior services. From homes and apartments to offices, hotels, retail outlets, and corporate spaces, we are committed to delivering stylish, functional, and high-quality solutions that help our clients create beautiful and comfortable interiors with confidence.
              </p>
            </motion.div>

          </section>

        </div>
      </div>
    </main>
  );
}