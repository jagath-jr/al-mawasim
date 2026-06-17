'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin safely for Next.js
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate the cards when the section scrolls into view
    if (sectionRef.current && cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { 
          opacity: 0, 
          y: 60 // Start 60px below their final position
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, // 0.2 seconds between each card appearing
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%', // Animation starts when the top of the section hits 75% down the viewport
            toggleActions: 'play none none none' // Play once and stay there
          }
        }
      );
    }
  }, []);

  const servicesData = [
    { 
      title: "Curtains & Drapes", 
      img: "/home/home-curtains-drapes.webp", 
      desc: "Trust us to deliver elegant curtain solutions, professional installation, and customized designs for homes, offices, hotels, and commercial interiors." 
    },
    { 
      title: "Flooring Solutions", 
      img: "/home/home-Flooring-Solutions.webp", 
      desc: "Trust us to provide durable and stylish flooring solutions for residential, commercial, and hospitality environments." 
    },
    { 
      title: "Blinds & Window Coverings", 
      img: "/home/home-Blinds-Window-Coverings.webp", 
      desc: "Trust us to deliver modern window treatment solutions with excellent light control, privacy, and functionality for every space." 
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#e4e6fb] py-24 px-6 lg:px-12 w-full"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {servicesData.map((service, idx) => (
          <div 
            key={idx} 
            // Save each card to our ref array for GSAP to animate
            ref={(el) => { cardsRef.current[idx] = el; }}
            className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col group"
          >
            {/* Image Container with a subtle zoom effect on hover */}
            <div className="h-56 relative overflow-hidden bg-gray-200">
              {/* Note: Update the image paths in servicesData to match your actual public folder assets */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${service.img})` }}
              ></div>
            </div>
            
            {/* Card Content */}
            <div className="p-8 flex flex-col flex-grow bg-white">
              <h3 className="text-[#1e293b] text-xl font-bold mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-8 flex-grow leading-relaxed">
                {service.desc}
              </p>
              
              <button className="w-full py-3 bg-[#4d3c8c] hover:bg-[#3a2d6b] text-white font-medium rounded-md text-sm transition-colors shadow-sm">
                Read more
              </button>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}