"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { sendContactEmail } from "@/actions/contact";

const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const slideInLeft: Variants = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } };
const slideInRight: Variants = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } };

export default function ContactClient({ settings }: { settings: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // NEW: Added "rate_limited" to the status types
  const [status, setStatus] = useState<"idle" | "success" | "error" | "rate_limited">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    try {
      const formData = new FormData(e.currentTarget);
      await sendContactEmail(formData);
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      // NEW: Check if the server threw our custom rate limit error
      if (error.message && error.message.includes("RATE_LIMIT_EXCEEDED")) {
        setStatus("rate_limited");
      } else {
        setStatus("error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden w-full bg-[#fdfbf74e]">      
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(26,26,26,0.85)_0%,rgba(255,255,255,0)_100%)]">
        <Image src={settings.heroImage} alt="Contact Us Background" fill className="object-cover opacity-60 mix-blend-multiply" priority />
      </div>

      <section className="relative w-full h-[350px] md:h-[450px] flex items-center pt-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-4">
            <motion.span variants={fadeInUp} className="inline-block bg-[#C5A869]/80 backdrop-blur-sm text-[#1A1A1A] px-5 py-1.5 rounded-full text-sm font-semibold">Our Service</motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-wide">Get In Touch</motion.h1>
          </div>
          <motion.div variants={fadeInUp} className="mt-6 md:mt-0 md:text-right max-w-md lg:max-w-lg">
            <p className="text-lg md:text-xl font-medium leading-snug drop-shadow-md text-gray-200">Premium Curtains, Blinds & Interior Solutions Abu Dhabi</p>
          </motion.div>
        </motion.div>
      </section>

      <div className="relative z-20 bg-[#FDFBF7] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <motion.div initial={{ scale: 0, x: "-50%", y: "-50%" }} animate={{ scale: 1, x: "-50%", y: "-50%" }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }} className="absolute top-0 left-1/2 z-30 origin-center">
          <div className="bg-[#C5A869] p-4 rounded-full border-[6px] border-[#FDFBF7] shadow-sm flex items-center justify-center">
            <Mail className="w-7 h-7 text-[#1A1A1A]" strokeWidth={1.5} />
          </div>
        </motion.div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 overflow-hidden">
          
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="lg:col-span-2 bg-[#F5F0E6] p-8 md:p-12 rounded-[2rem] border border-[#EAE1D0]">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-4">{settings.formTitle}</h2>
            <p className="text-gray-600 mb-10 text-sm md:text-base leading-relaxed whitespace-pre-line">{settings.formText}</p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Name</label>
                  <input type="text" name="name" required placeholder="Your Name" className="w-full px-4 py-3.5 rounded-lg border border-[#EAE1D0] focus:outline-none focus:ring-1 focus:ring-[#C5A869] bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Email</label>
                  <input type="email" name="email" required placeholder="Your Email" className="w-full px-4 py-3.5 rounded-lg border border-[#EAE1D0] focus:outline-none focus:ring-1 focus:ring-[#C5A869] bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Phone</label>
                  <input type="tel" name="phone" placeholder="Your Phone" className="w-full px-4 py-3.5 rounded-lg border border-[#EAE1D0] focus:outline-none focus:ring-1 focus:ring-[#C5A869] bg-white text-gray-900" />
                </div>
              </div>

              <div className="h-full flex flex-col">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Message</label>
                <textarea name="message" required placeholder="Your Message" className="w-full flex-grow min-h-[150px] px-4 py-3.5 rounded-lg border border-[#EAE1D0] focus:outline-none focus:ring-1 focus:ring-[#C5A869] bg-white text-gray-900 resize-none"></textarea>
              </div>

              {/* NEW: Updated status messages block */}
              <div className="md:col-span-2 pt-2">
                <button type="submit" disabled={isSubmitting} className="bg-[#C5A869] text-[#1A1A1A] hover:text-[#FDFBF7] px-8 py-3.5 rounded-lg font-medium hover:bg-[#9C7C3E] transition-colors shadow-sm disabled:opacity-50">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                
                {status === "success" && <p className="text-green-600 mt-3 font-medium text-sm">Message sent successfully! We will get back to you soon.</p>}
                {status === "error" && <p className="text-red-600 mt-3 font-medium text-sm">Failed to send message. Please try again.</p>}
                {status === "rate_limited" && <p className="text-amber-600 mt-3 font-medium text-sm">You are sending messages too quickly. Please wait a minute and try again.</p>}
              </div>
            </form>
          </motion.div>

          <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="space-y-8 lg:pt-4">
            <h3 className="text-xl md:text-2xl font-semibold text-[#1A1A1A]">Our Office</h3>
            <div className="relative w-full h-[220px] rounded-2xl overflow-hidden shadow-sm border border-[#EAE1D0]">
              <Image src={settings.officeImage} alt="Our Office Building" fill className="object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/10 to-transparent flex items-end justify-center pb-5">
                <p className="text-[#FDFBF7] font-medium text-sm tracking-wide">{settings.workingHours}</p>
              </div>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex gap-3 items-start group">
                <MapPin className="w-5 h-5 text-[#C5A869] mt-0.5" strokeWidth={2} />
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] text-sm mb-1">Visit Our Office</h4>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{settings.address}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start group">
                <Mail className="w-5 h-5 text-[#C5A869] mt-0.5" strokeWidth={2} />
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] text-sm mb-1">Send a Message</h4>
                  <p className="text-gray-600 text-sm">{settings.email}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start group">
                <Phone className="w-5 h-5 text-[#C5A869] mt-0.5" strokeWidth={2} />
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] text-sm mb-1">Call Us Directly</h4>
                  <p className="text-gray-600 text-sm">{settings.phone1}</p>
                  {settings.phone2 && <p className="text-gray-600 text-sm">{settings.phone2}</p>}
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}