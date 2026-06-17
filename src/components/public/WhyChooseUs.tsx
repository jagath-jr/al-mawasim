'use client';

import { useEffect, useRef } from 'react';
import { Award, Wrench, Palette, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // 1. Animate the main heading dropping in
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Staggered slide-in animation for the feature boxes
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 }, // Starting 50px below and invisible
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15, // 0.15s delay between each box
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  const features = [
    {
      icon: <Award size={36} strokeWidth={1.5} />,
      title: "Premium Quality Materials",
      desc: "High-quality materials selected for durability and elegance."
    },
    {
      icon: <Wrench size={36} strokeWidth={1.5} />,
      title: "Professional Installation",
      desc: "Precise installation delivered by experienced professionals."
    },
    {
      icon: <Palette size={36} strokeWidth={1.5} />,
      title: "Customized Solutions",
      // Note: Corrected the lorem-ipsum/placeholder text from the mockup to fit the interior decor context better
      desc: "Tailored interior solutions designed to perfectly match your space and style."
    },
    {
      icon: <Clock size={36} strokeWidth={1.5} />,
      title: "Timely Project Delivery",
      desc: "Projects completed efficiently and on schedule."
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 bg-[#e2e4fb] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#112440] text-center mb-16 sm:mb-20 tracking-tight"
        >
          Why Choose Al Mawasim Decor & Curtains
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-10">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="flex flex-col items-start text-left group"
            >
              {/* Icon Box */}
              <div className="w-20 h-20 bg-[#112440] rounded-2xl flex items-center justify-center text-white mb-6 shadow-sm transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-md">
                {feature.icon}
              </div>
              
              {/* Text Content */}
              <h3 className="text-lg sm:text-xl font-bold text-[#112440] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}