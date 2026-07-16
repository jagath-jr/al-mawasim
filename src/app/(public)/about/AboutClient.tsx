"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Users, Check } from "lucide-react";
import { motion, Variants, useMotionValue, useTransform, animate, useInView } from "framer-motion";

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

const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const slideInLeft: Variants = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } };
const slideInRight: Variants = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } };
const masonryContainer: Variants = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.15 } } };
const zoomInBox: Variants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } };

const features = [
  { title: "Experienced Professionals", description: "Skilled specialists delivering quality workmanship and reliable service." },
  { title: "Customized Design Solutions", description: "Tailored interior solutions for every style and space." },
  { title: "Premium Quality Materials", description: "High-quality materials ensuring durability and elegant finishes." },
  { title: "Professional Service Approach", description: "Clear communication and dependable project execution." },
  { title: "Fast Project Completion", description: "Efficient delivery and timely installation services." },
  { title: "Commitment to Excellence", description: "Dedicated to quality, reliability, and customer satisfaction." }
];

export default function AboutClient({ settings }: { settings: any }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-[#fdfbf74e]">      
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(26,26,26,0.85)_0%,rgba(255,255,255,0)_100%)]">
        <Image src={settings.heroImage} alt="About Us Background" fill className="object-cover opacity-60 mix-blend-multiply" priority />
      </div>

      <section className="relative w-full h-[350px] md:h-[450px] flex items-center pt-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-4">
            <motion.span variants={fadeInUp} className="inline-block bg-[#C5A869]/80 backdrop-blur-sm text-[#1A1A1A] px-5 py-1.5 rounded-full text-sm font-semibold">Discover</motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-wide">{settings.heroTitle}</motion.h1>
          </div>
          <motion.div variants={fadeInUp} className="mt-6 md:mt-0 text-white md:text-right max-w-md lg:max-w-lg">
            <p className="text-lg md:text-xl font-medium leading-snug drop-shadow-md text-gray-200 whitespace-pre-line">{settings.heroSubtitle}</p>
          </motion.div>
        </motion.div>
      </section>

      <div className="relative z-20 bg-[#FDFBF7] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-32">
        <motion.div initial={{ scale: 0, x: "-50%", y: "-50%" }} animate={{ scale: 1, x: "-50%", y: "-50%" }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }} className="absolute top-0 left-1/2 z-30 origin-center">
          <div className="bg-[#C5A869] p-4 rounded-full border-[6px] border-[#FDFBF7] shadow-sm flex items-center justify-center">
            <Users className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2} />
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-24 lg:space-y-32">
          
          {/* SECTION 1: HISTORY & MASONRY GRID */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="space-y-6">
              <span className="inline-block bg-[#EAE1D0] text-[#1A1A1A] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">{settings.welcomeBadge}</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1A1A1A] leading-tight whitespace-pre-line">{settings.welcomeTitle}</h2>
              <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                <p>{settings.welcomeText}</p>
              </div>
            </motion.div>

            <motion.div variants={masonryContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 gap-4 lg:gap-6">
              <div className="flex flex-col gap-4 lg:gap-6">
                <motion.div variants={zoomInBox} className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden shadow-sm">
                  <Image src={settings.gridImage1} alt="Team" fill className="object-cover" />
                </motion.div>
                <motion.div variants={zoomInBox} className="bg-[#1A1A1A] rounded-xl p-6 md:p-8 flex flex-col justify-center items-center text-[#C5A869] shadow-sm h-36 md:h-40 border border-white/5">
                  <h4 className="text-4xl md:text-5xl font-bold mb-1 flex items-center"><AnimatedNumber to={settings.statsProjects} /><span className="text-2xl md:text-3xl ml-1">+</span></h4>
                  <p className="text-xs md:text-sm font-medium text-[#C5A869]/80">Projects Completed</p>
                </motion.div>
              </div>
              <div className="flex flex-col gap-4 lg:gap-6 pt-8 md:pt-12">
                <motion.div variants={zoomInBox} className="bg-[#C5A869] rounded-xl p-6 md:p-8 flex flex-col justify-center items-center text-[#1A1A1A] shadow-sm h-36 md:h-40">
                  <h4 className="text-4xl md:text-5xl font-bold mb-1 flex items-baseline"><AnimatedNumber to={settings.statsSatisfaction} /><span className="text-2xl md:text-3xl ml-1">%</span></h4>
                  <p className="text-xs md:text-sm font-medium text-[#1A1A1A]/80">Customer Satisfaction</p>
                </motion.div>
                <motion.div variants={zoomInBox} className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden shadow-sm">
                  <Image src={settings.gridImage2} alt="Interior" fill className="object-cover" />
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* SECTION 2: WHY CHOOSE US */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-[#F5F0E6] rounded-3xl p-8 md:p-16 shadow-sm border border-[#EAE1D0]">
            <div className="text-center mb-16 flex flex-col items-center">
              <span className="bg-[#EAE1D0] text-[#1A1A1A] px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">{settings.reasonsBadge}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">{settings.reasonsTitle}</h2>
              <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed whitespace-pre-line">{settings.reasonsText}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-12">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start group">
                  <div className="bg-[#C5A869] p-2 rounded-lg shrink-0 mt-1 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Check className="w-5 h-5 text-[#1A1A1A]" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-[#1A1A1A] font-semibold text-lg mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* SECTION 3: THE SPACES WE SERVE */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-8">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="order-2 lg:order-1 relative w-full h-[300px] lg:h-[400px] flex items-center justify-center bg-[#F5F0E6] border border-[#EAE1D0] rounded-2xl p-6">
              <div className="relative w-full h-full opacity-90 transition-transform duration-700 hover:scale-105">
                <Image src={settings.servicesImage} alt="Brands We Work With" fill className="object-contain" />
              </div>
            </motion.div>
            <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="order-1 lg:order-2 space-y-6">
              <span className="inline-block bg-[#EAE1D0] text-[#1A1A1A] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">{settings.servicesBadge}</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1A1A1A] leading-tight whitespace-pre-line">{settings.servicesTitle}</h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">{settings.servicesText}</p>
            </motion.div>
          </section>

        </div>
      </div>
    </main>
  );
}