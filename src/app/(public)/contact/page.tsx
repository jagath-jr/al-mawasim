"use client";

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
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

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-[#f8f9fc56]">      
      {/* ========================================
        1. FIXED BACKGROUND IMAGE 
        ========================================
      */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(110,95,165,0.75)_0%,rgba(255,255,255,0)_100%)]">
        <Image
          src="/contact/bg-contact.webp" // Update with a suitable interior/team hero image
          alt="Contact Us Background"
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
          {/* Left Side */}
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
              Get In Touch
            </motion.h1>
          </div>

          {/* Right Side */}
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
      <div className="relative z-20 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        
        {/* Circular Mail Icon Overlap */}
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

        {/* Inner Content Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 overflow-hidden">
          
          {/* LEFT COLUMN: Form Area */}
          <motion.div 
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-2 bg-[#f8f9fc] p-8 md:p-12 rounded-[2rem]"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[#4a398c] mb-4">
             Need Curtains, Blinds & Flooring Solutions in Abu Dhabi?
            </h2>
            <p className="text-slate-600 mb-10 text-sm md:text-base leading-relaxed">
              AL MAWASIM DECOR & CURTAINS provides custom curtains, roller blinds, zebra blinds, SPC flooring, wallpaper installation, and upholstery solutions for residential, commercial, hospitality, and office spaces across Abu Dhabi. Our experienced team delivers premium materials, elegant designs, and professional installation services tailored to transform every space with style, comfort, and functionality.
            </p>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inputs Column */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1e293b] mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#4a398c] focus:ring-1 focus:ring-[#4a398c] bg-white transition-all placeholder:text-gray-400" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1e293b] mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#4a398c] focus:ring-1 focus:ring-[#4a398c] bg-white transition-all placeholder:text-gray-400" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1e293b] mb-2">Phone</label>
                  <input 
                    type="tel" 
                    placeholder="Your Phone" 
                    className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#4a398c] focus:ring-1 focus:ring-[#4a398c] bg-white transition-all placeholder:text-gray-400" 
                  />
                </div>
              </div>

              {/* Textarea Column */}
              <div className="h-full flex flex-col">
                <label className="block text-sm font-semibold text-[#1e293b] mb-2">Message</label>
                <textarea 
                  placeholder="Your Message" 
                  className="w-full flex-grow min-h-[150px] md:min-h-0 px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#4a398c] focus:ring-1 focus:ring-[#4a398c] bg-white resize-none transition-all placeholder:text-gray-400"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 pt-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="bg-[#4a398c] text-white px-8 py-3.5 rounded-lg font-medium hover:bg-[#3b2d70] transition-colors shadow-sm"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: Contact Info */}
          <motion.div 
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-8 lg:pt-4"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-[#1e293b]">Our Office</h3>

            {/* Office Image Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-full h-[220px] rounded-2xl overflow-hidden shadow-sm"
            >
              <Image 
                src="/contact/leftcontact.webp" // Update with suitable office/building image
                alt="Our Office Building" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/80 via-[#1e293b]/10 to-transparent flex items-end justify-center pb-5">
                <p className="text-white font-medium text-sm tracking-wide">
                  Mon - Fri 08.00 - 18.00
                </p>
              </div>
            </motion.div>

            {/* Contact Details List */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6 pt-2"
            >
              
              <motion.div variants={fadeInUp} className="flex gap-3 items-start group">
                <MapPin className="w-5 h-5 text-[#1e293b] mt-0.5" strokeWidth={2} />
                <div>
                  <h4 className="font-semibold text-[#1e293b] text-sm mb-1">Visit Our Office</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Al Mawasim Decor<br />
                    Business Bay, Dubai, UAE
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-3 items-start group">
                <Mail className="w-5 h-5 text-[#1e293b] mt-0.5" strokeWidth={2} />
                <div>
                  <h4 className="font-semibold text-[#1e293b] text-sm mb-1">Send a Message</h4>
                  <p className="text-slate-600 text-sm">
                    info@almawasimdecor.com
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-3 items-start group">
                <Phone className="w-5 h-5 text-[#1e293b] mt-0.5" strokeWidth={2} />
                <div>
                  <h4 className="font-semibold text-[#1e293b] text-sm mb-1">Call Us Directly</h4>
                  <p className="text-slate-600 text-sm">
                    +971 56 677 3793
                  </p>
                  <p className="text-slate-600 text-sm">
                    +971 55 521 8804
                  </p>
                </div>
              </motion.div>

            </motion.div>
          </motion.div>

        </section>
      </div>
    </main>
  );
}