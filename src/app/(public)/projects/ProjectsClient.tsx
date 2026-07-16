"use client";

import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const cardVariant: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };

type ClientProject = { id: string; title: string; location: string; image: string; };

export default function ProjectsClient({ projects }: { projects: ClientProject[] }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-[#fdfbf74e]">      
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(26,26,26,0.85)_0%,rgba(255,255,255,0)_100%)]">
        <Image src="/projects/bg-project.webp" alt="Interior Projects" fill className="object-cover opacity-60 mix-blend-multiply" priority />
      </div>

      <section className="relative w-full h-[350px] md:h-[450px] flex items-center pt-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-4">
            <motion.span variants={fadeInUp} className="inline-block bg-[#C5A869]/80 backdrop-blur-sm text-[#1A1A1A] px-5 py-1.5 rounded-full text-sm font-semibold">Discover</motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-wide">Our Projects</motion.h1>
          </div>
          <motion.div variants={fadeInUp} className="mt-6 md:mt-0 md:text-right max-w-md lg:max-w-lg">
            <p className="text-lg md:text-xl font-medium leading-snug drop-shadow-md text-gray-200">Premium Curtains, Blinds & Interior Solutions</p>
          </motion.div>
        </motion.div>
      </section>

      <div className="relative z-20 bg-[#FDFBF7] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-32">
        <motion.div initial={{ scale: 0, x: "-50%", y: "-50%" }} animate={{ scale: 1, x: "-50%", y: "-50%" }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }} className="absolute top-0 left-1/2 z-30 origin-center">
          <div className="bg-[#C5A869] p-4 rounded-full border-[6px] border-[#FDFBF7] shadow-sm flex items-center justify-center">
            <ImageIcon className="w-7 h-7 text-[#1A1A1A]" strokeWidth={2} />
          </div>
        </motion.div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {projects.length === 0 ? (
               <p className="col-span-full text-center text-gray-500 py-10">Check back soon for new projects!</p>
            ) : (
              projects.map((project) => (
                <motion.div key={project.id} variants={cardVariant} className="flex flex-col group cursor-pointer">
                  <div className="relative w-full h-[280px] rounded-[1.25rem] overflow-hidden mb-5 shadow-sm border border-[#EAE1D0]">
                    <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="text-center px-2">
                    <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-1">{project.title}</h3>
                    <p className="text-gray-600 text-sm">{project.location}</p>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </section>
      </div>
    </main>
  );
}