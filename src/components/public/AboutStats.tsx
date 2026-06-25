'use client';

import { useEffect, useRef } from 'react';
import { Mail, Phone, Calculator } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  
  // Array refs for staggered animations
  const masonryBoxesRef = useRef<(HTMLDivElement | null)[]>([]);
  const bannerCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Refs for the number counters
  const satisfactionRef = useRef<HTMLSpanElement>(null);
  const projectsRef = useRef<HTMLSpanElement>(null);
  
  // Store ScrollTrigger instances for cleanup
  const scrollTriggers = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Initialize counters with 0
    if (satisfactionRef.current) satisfactionRef.current.innerText = '0';
    if (projectsRef.current) projectsRef.current.innerText = '0';

    // Clear any existing ScrollTriggers
    scrollTriggers.current.forEach(st => st.kill());
    scrollTriggers.current = [];

    // 1. "Zoom Down" staggered animation for the 4 masonry boxes
    if (masonryBoxesRef.current.length > 0) {
      const st1 = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            masonryBoxesRef.current,
            { opacity: 0, scale: 0.9, y: -40 },
            {
              opacity: 1, 
              scale: 1, 
              y: 0, 
              duration: 0.8, 
              stagger: 0.15, 
              ease: 'back.out(1.2)',
            }
          );
        },
        once: true
      });
      scrollTriggers.current.push(st1);
    }

    // 2. Slide in the right text block
    const st2 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          rightTextRef.current,
          { opacity: 0, x: 50 },
          { 
            opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          }
        );
      },
      once: true
    });
    scrollTriggers.current.push(st2);

    // 3. Counter Animation for 100% and 500+
    const st3 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      onEnter: () => {
        const counterTarget = { sat: 0, proj: 0 };
        gsap.to(counterTarget, {
          sat: 100,
          proj: 500,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (satisfactionRef.current) {
              satisfactionRef.current.innerText = Math.floor(counterTarget.sat).toString();
            }
            if (projectsRef.current) {
              projectsRef.current.innerText = Math.floor(counterTarget.proj).toString();
            }
          },
          onComplete: () => {
            // Ensure final values are set
            if (satisfactionRef.current) satisfactionRef.current.innerText = '100';
            if (projectsRef.current) projectsRef.current.innerText = '500';
          }
        });
      },
      once: true
    });
    scrollTriggers.current.push(st3);

    // 4. Slide-in reveal for the bottom contact banner cards
    if (bannerCardsRef.current.length > 0) {
      const bannerTrigger = document.querySelector('.contact-banner-trigger');
      if (bannerTrigger) {
        const st4 = ScrollTrigger.create({
          trigger: bannerTrigger,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              bannerCardsRef.current,
              { opacity: 0, x: -60 },
              {
                opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
              }
            );
          },
          once: true
        });
        scrollTriggers.current.push(st4);
      }
    }

    // Refresh ScrollTrigger after a short delay to ensure proper calculations
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
      scrollTriggers.current.forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      {/* --- TOP: ABOUT & STATS SECTION --- */}
      <section ref={sectionRef} className="py-24 px-6 lg:px-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Masonry-style Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-6">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-4 sm:gap-6 lg:gap-6">
              {/* Tall Image (Living Room) */}
              <div 
                ref={(el) => { masonryBoxesRef.current[0] = el; }}
                className="h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden bg-gray-200 bg-cover bg-center shadow-md"
                style={{ backgroundImage: "url('/home/home-Our-Specialize-01.webp')" }} 
              />
              {/* 500+ Box */}
              <div 
                ref={(el) => { masonryBoxesRef.current[1] = el; }}
                className="bg-[#4a398c] h-32 sm:h-40 md:h-44 rounded-xl flex flex-col justify-center items-center text-white shadow-lg p-2 sm:p-4 text-center"
              >
                <h3 className="text-4xl sm:text-5xl font-bold flex items-center tracking-tight mb-1 sm:mb-2">
                  <span ref={projectsRef}>500</span>+
                </h3>
                <p className="text-xs sm:text-sm text-white/90 font-medium">Projects Completed</p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4 sm:gap-6 lg:gap-6">
              {/* 98% Box */}
              <div 
                ref={(el) => { masonryBoxesRef.current[2] = el; }}
                className="bg-[#e2e4fb] h-32 sm:h-40 md:h-44 rounded-xl flex flex-col justify-center items-center shadow-sm p-2 sm:p-4 text-center"
              >
                <h3 className="text-4xl sm:text-6xl font-bold text-[#112440] flex items-baseline tracking-tight mb-1 sm:mb-2">
                  <span ref={satisfactionRef}>100</span>
                  <span className="text-2xl sm:text-4xl ml-1">%</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#334155] font-medium">Customer Satisification</p>
              </div>
              {/* Tall Image (Curtains) */}
              <div 
                ref={(el) => { masonryBoxesRef.current[3] = el; }}
                className="h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden bg-gray-200 bg-cover bg-center shadow-md"
                style={{ backgroundImage: "url('/home/home-Our-Specialize-02.webp')" }} 
              />
            </div>
            
          </div>

          {/* Right Side: Text Content */}
          <div ref={rightTextRef} className="lg:pl-8">
            <span className="inline-block py-2 px-5 bg-[#f4f5f9] text-[#1e293b] text-sm font-semibold rounded-full mb-6 tracking-wide">
              Our Specialize
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#112440] mb-6 leading-[1.2] tracking-tight">
              Trusted Curtains & Interior Decor Company in Abu Dhabi
            </h2>
            <p className="text-[#4b5563] leading-relaxed text-sm sm:text-base md:text-lg">
              AL MAWASIM DECOR & CURTAINS specializes in premium curtains, roller blinds, zebra blinds, SPC flooring, wallpaper installation, sofa upholstery, and interior décor solutions for residential, commercial, hospitality, and office spaces in Abu Dhabi.. With a commitment to quality craftsmanship, innovative designs, and professional installation, we help clients transform their spaces with elegant finishes, functional solutions, and exceptional attention to detail.
            </p>
          </div>
          
        </div>
      </section>

      {/* --- BOTTOM: CONTACT BANNER --- */}
      <section className="bg-[#f5f6fa] py-12 sm:py-16 px-6 lg:px-12 contact-banner-trigger overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: Email */}
          <div 
            ref={(el) => { bannerCardsRef.current[0] = el; }}
            className="bg-[#2a2a2a] text-white p-6 sm:p-8 rounded-xl flex items-center gap-5 shadow-lg hover:bg-[#1f1f1f] transition-colors cursor-pointer group"
          >
            <Mail className="text-white group-hover:scale-110 transition-transform duration-300" size={40} strokeWidth={1.5} />
            <div>
              <p className="text-sm text-gray-400 mb-1">Email Us</p>
              <p className="font-semibold tracking-wide text-sm lg:text-base text-gray-100">info@almawasimdecor.com</p>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div 
            ref={(el) => { bannerCardsRef.current[1] = el; }}
            className="bg-[#2a2a2a] text-white p-6 sm:p-8 rounded-xl flex items-center gap-5 shadow-lg hover:bg-[#1f1f1f] transition-colors cursor-pointer group"
          >
            <div className="rounded-full border-2 border-white p-2.5 group-hover:scale-110 transition-transform duration-300">
              <Phone className="text-white" size={20} fill="currentColor" strokeWidth={0} />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Emergency Service</p>
              <p className="font-semibold tracking-wide text-sm lg:text-base text-white">Call  +971 56 677 3793</p>
              <p className="font-semibold tracking-wide text-sm lg:text-base text-white">Call +971 55 521 8804 </p>
            </div>
          </div>

          {/* Card 3: Free Estimation */}
          <div 
            ref={(el) => { bannerCardsRef.current[2] = el; }}
            className="bg-[#2a2a2a] text-white p-6 sm:p-8 rounded-xl flex items-center gap-5 shadow-lg hover:bg-[#1f1f1f] transition-colors cursor-pointer group"
          >
            <Calculator className="text-white group-hover:scale-110 transition-transform duration-300" size={40} strokeWidth={1.5} />
            <div>
              <p className="text-sm text-gray-400 mb-1">Request For</p>
              <p className="font-semibold tracking-wide text-sm lg:text-base text-white">Free Estimation</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}