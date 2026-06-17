'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Safely register ScrollTrigger for Next.js
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Animate the text container (staggering the H1 and P tags)
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );
    }

    // 2. Animate the form sliding in from the right
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
    );

    // 3. Smooth Parallax Background Effect
    if (bgRef.current && sectionRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#2a1c38]"
    >
      {/* The Parallax Background Image - Make sure to update the URL to your new interior image */}
      <div 
        ref={bgRef}
        className="absolute -top-[15%] left-0 w-full h-[130%] bg-[url('/herobg-img.webp')] bg-cover bg-center bg-no-repeat"
      ></div>

      {/* Purple/Mauve overlay to match the design and make text readable */}
      <div className="absolute inset-0 bg-[#655580]/70 mix-blend-multiply"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center pt-24 pb-16">
        
        {/* Left Side: Text */}
        <div ref={textRef} className="text-white space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg tracking-tight">
            Premium Interior Decor <br/> & Window Solutions
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-lg drop-shadow-md leading-relaxed">
            We provide complete curtains, blinds, flooring, upholstery, and wall finishing solutions for residential, commercial, hospitality, and office spaces with premium materials and professional installation services.
          </p>
        </div>

        {/* Right Side: Request a Quote Form */}
        <div 
          ref={formRef} 
          className="bg-[#e4e3e8]/95 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-2xl max-w-md ml-auto w-full"
        >
          <h3 className="text-xl font-bold text-[#1f2937] mb-6">Request a Quote</h3>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full px-4 py-3 rounded-md bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-[#3c346e] outline-none transition-shadow" 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-4 py-3 rounded-md bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-[#3c346e] outline-none transition-shadow" 
            />
            <input 
              type="tel" 
              placeholder="Phone" 
              className="w-full px-4 py-3 rounded-md bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-[#3c346e] outline-none transition-shadow" 
            />
            <select 
              defaultValue=""
              className="w-full px-4 py-3 rounded-md bg-white border border-gray-200 text-gray-800 focus:ring-2 focus:ring-[#3c346e] outline-none transition-shadow appearance-none"
            >
              <option value="" disabled className="text-gray-500">Select service</option>
              <option value="curtains-blinds" className="text-gray-800">Curtains & Blinds</option>
              <option value="flooring" className="text-gray-800">Flooring</option>
              <option value="upholstery" className="text-gray-800">Upholstery</option>
              <option value="wall-finishing" className="text-gray-800">Wall Finishing</option>
            </select>
            
            <button 
              type="button"
              className="w-full bg-[#3b3470] hover:bg-[#2d2757] text-white font-medium py-3.5 rounded-md transition-colors mt-2 shadow-md"
            >
              Send Request
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}