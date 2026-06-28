
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Mail, Phone, Calculator, Award, Wrench, Palette, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Safely register ScrollTrigger for Next.js
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  // ============================================
  // REFS FOR ALL SECTIONS
  // ============================================
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroFormRef = useRef<HTMLDivElement>(null);

  const servicesSectionRef = useRef<HTMLElement>(null);
  const servicesCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutRightTextRef = useRef<HTMLDivElement>(null);
  const masonryBoxesRef = useRef<(HTMLDivElement | null)[]>([]);
  const bannerCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const satisfactionRef = useRef<HTMLSpanElement>(null);
  const projectsRef = useRef<HTMLSpanElement>(null);
  const scrollTriggers = useRef<ScrollTrigger[]>([]);

  const whyChooseSectionRef = useRef<HTMLElement>(null);
  const whyChooseHeadingRef = useRef<HTMLHeadingElement>(null);
  const whyChooseCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // ============================================
  // ANIMATIONS SETUP
  // ============================================
  useEffect(() => {
    // --- HERO ANIMATIONS ---
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );
    }

    gsap.fromTo(
      heroFormRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
    );

    if (heroBgRef.current && heroSectionRef.current) {
      gsap.to(heroBgRef.current, {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    // --- SERVICES ANIMATIONS ---
    if (servicesSectionRef.current && servicesCardsRef.current.length > 0) {
      gsap.fromTo(
        servicesCardsRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: servicesSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // --- ABOUT & STATS ANIMATIONS ---
    if (aboutSectionRef.current) {
      // Initialize counters
      if (satisfactionRef.current) satisfactionRef.current.innerText = '0';
      if (projectsRef.current) projectsRef.current.innerText = '0';

      // Clear any existing ScrollTriggers
      scrollTriggers.current.forEach(st => st.kill());
      scrollTriggers.current = [];

      // Masonry boxes animation
      if (masonryBoxesRef.current.length > 0) {
        const st1 = ScrollTrigger.create({
          trigger: aboutSectionRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              masonryBoxesRef.current,
              { opacity: 0, scale: 0.9, y: -40 },
              { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)' }
            );
          },
          once: true
        });
        scrollTriggers.current.push(st1);
      }

      // Right text block animation
      const st2 = ScrollTrigger.create({
        trigger: aboutSectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            aboutRightTextRef.current,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
          );
        },
        once: true
      });
      scrollTriggers.current.push(st2);

      // Counter animation
      const st3 = ScrollTrigger.create({
        trigger: aboutSectionRef.current,
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
              if (satisfactionRef.current) satisfactionRef.current.innerText = '100';
              if (projectsRef.current) projectsRef.current.innerText = '500';
            }
          });
        },
        once: true
      });
      scrollTriggers.current.push(st3);

      // Banner cards animation
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
                { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
              );
            },
            once: true
          });
          scrollTriggers.current.push(st4);
        }
      }
    }

    // --- WHY CHOOSE US ANIMATIONS ---
    if (whyChooseSectionRef.current) {
      gsap.fromTo(
        whyChooseHeadingRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: whyChooseSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      if (whyChooseCardsRef.current.length > 0) {
        gsap.fromTo(
          whyChooseCardsRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: whyChooseSectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }

    // Refresh ScrollTrigger
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
      scrollTriggers.current.forEach(st => st.kill());
    };
  }, []);

  // ============================================
  // DATA
  // ============================================
  const servicesData = [
    { 
      title: "Curtains & Drapes Abu Dhabi", 
      img: "/home/home-curtains-drapes.webp", 
      desc: "Trust us to deliver elegant curtain solutions, professional installation, and customized designs for homes, offices, hotels, and commercial interiors." 
    },
    { 
      title: "Flooring Solutions Abu Dhabi", 
      img: "/home/home-Flooring-Solutions.webp", 
      desc: "Trust us to provide durable and stylish flooring solutions for residential, commercial, and hospitality environments." 
    },
    { 
      title: "Blinds & Window Coverings Abu Dhabi", 
      img: "/home/home-Blinds-Window-Coverings.webp", 
      desc: "Trust us to deliver modern window treatment solutions with excellent light control, privacy, and functionality for every space." 
    }
  ];

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
      desc: "Tailored interior solutions designed to perfectly match your space and style."
    },
    {
      icon: <Clock size={36} strokeWidth={1.5} />,
      title: "Timely Project Delivery",
      desc: "Projects completed efficiently and on schedule."
    }
  ];

  const clients = [
    { name: "Amana", src: "/logo-amana.png" },
    { name: "Daikin", src: "/logo-daikin.png" },
    { name: "Honeywell", src: "/logo-honeywell.png" },
    { name: "Lennox", src: "/logo-lennox.png" },
    { name: "Carrier", src: "/logo-carrier.png" }
  ];

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="w-full flex flex-col font-sans">
      
      {/* 1. HERO SECTION */}
      <section 
        ref={heroSectionRef}
        className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#2a1c38]"
      >
        <div 
          ref={heroBgRef}
          className="absolute -top-[15%] left-0 w-full h-[130%] bg-[url('/herobg-img.webp')] bg-cover bg-center bg-no-repeat"
        ></div>

        <div className="absolute inset-0 bg-[#655580]/70 mix-blend-multiply"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center pt-24 pb-16">
          
          <div ref={heroTextRef} className="text-white space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight drop-shadow-lg tracking-tight">
              Premium Curtains, Blinds, Flooring & Wallpaper Services in Abu Dhabi
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-lg drop-shadow-md leading-relaxed">
              AL MAWASIM DECOR & CURTAINS provides custom curtains, motorized curtains, roller blinds, zebra blinds, vertical blinds, Venetian blinds, SPC flooring, laminate flooring, wallpaper installation, and sofa upholstery services with professional installation across Abu Dhabi, UAE.
            </p>
          </div>

          <div 
            ref={heroFormRef} 
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

      {/* 2. SERVICES CARDS SECTION */}
      <section 
        ref={servicesSectionRef} 
        className="bg-[#e4e6fb] py-24 px-6 lg:px-12 w-full"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {servicesData.map((service, idx) => (
            <div 
              key={idx} 
              ref={(el) => { servicesCardsRef.current[idx] = el; }}
              className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col group"
            >
              <div className="h-56 relative overflow-hidden bg-gray-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${service.img})` }}
                ></div>
              </div>
              
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

      {/* 3. ABOUT, STATS & CONTACT BANNER SECTION */}
      <>
        <section ref={aboutSectionRef} className="py-24 px-6 lg:px-12 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-6">
              
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-6">
                <div 
                  ref={(el) => { masonryBoxesRef.current[0] = el; }}
                  className="h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden bg-gray-200 bg-cover bg-center shadow-md"
                  style={{ backgroundImage: "url('/home/home-Our-Specialize-01.webp')" }} 
                />
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

              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-6">
                <div 
                  ref={(el) => { masonryBoxesRef.current[2] = el; }}
                  className="bg-[#e2e4fb] h-32 sm:h-40 md:h-44 rounded-xl flex flex-col justify-center items-center shadow-sm p-2 sm:p-4 text-center"
                >
                  <h3 className="text-4xl sm:text-6xl font-bold text-[#112440] flex items-baseline tracking-tight mb-1 sm:mb-2">
                    <span ref={satisfactionRef}>100</span>
                    <span className="text-2xl sm:text-4xl ml-1">%</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#334155] font-medium">Customer Satisfaction</p>
                </div>
                <div 
                  ref={(el) => { masonryBoxesRef.current[3] = el; }}
                  className="h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden bg-gray-200 bg-cover bg-center shadow-md"
                  style={{ backgroundImage: "url('/home/home-Our-Specialize-02.webp')" }} 
                />
              </div>
              
            </div>

            <div ref={aboutRightTextRef} className="lg:pl-8">
              <span className="inline-block py-2 px-5 bg-[#f4f5f9] text-[#1e293b] text-sm font-semibold rounded-full mb-6 tracking-wide">
                Our Specialize
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#112440] mb-6 leading-[1.2] tracking-tight">
                Trusted Curtains & Interior Decor Company in Abu Dhabi
              </h2>
              <p className="text-[#4b5563] leading-relaxed text-sm sm:text-base md:text-lg">
                AL MAWASIM DECOR & CURTAINS specializes in premium curtains, roller blinds, zebra blinds, SPC flooring, wallpaper installation, sofa upholstery, and interior décor solutions for residential, commercial, hospitality, and office spaces in Abu Dhabi. With a commitment to quality craftsmanship, innovative designs, and professional installation, we help clients transform their spaces with elegant finishes, functional solutions, and exceptional attention to detail.
              </p>
            </div>
            
          </div>
        </section>

        <section className="bg-[#f5f6fa] py-12 sm:py-16 px-6 lg:px-12 contact-banner-trigger overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
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

            <div 
              ref={(el) => { bannerCardsRef.current[1] = el; }}
              className="bg-[#2a2a2a] text-white p-6 sm:p-8 rounded-xl flex items-center gap-5 shadow-lg hover:bg-[#1f1f1f] transition-colors cursor-pointer group"
            >
              <div className="rounded-full border-2 border-white p-2.5 group-hover:scale-110 transition-transform duration-300">
                <Phone className="text-white" size={20} fill="currentColor" strokeWidth={0} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Emergency Service</p>
                <p className="font-semibold tracking-wide text-sm lg:text-base text-white">Call +971 56 677 3793</p>
                <p className="font-semibold tracking-wide text-sm lg:text-base text-white">Call +971 55 521 8804</p>
              </div>
            </div>

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

      {/* 4. WHY CHOOSE US SECTION */}
      <section ref={whyChooseSectionRef} className="py-24 px-6 lg:px-12 bg-[#e2e4fb] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <h2 
            ref={whyChooseHeadingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#112440] text-center mb-16 sm:mb-20 tracking-tight"
          >
            Why Choose Al Mawasim Decor & Curtains
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-10">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                ref={(el) => { whyChooseCardsRef.current[idx] = el; }}
                className="flex flex-col items-start text-left group"
              >
                <div className="w-20 h-20 bg-[#112440] rounded-2xl flex items-center justify-center text-white mb-6 shadow-sm transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-md">
                  {feature.icon}
                </div>
                
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

      {/* 5. PROCESS & LOGO SLIDER SECTION */}
      <section className="bg-white py-12 border-t border-gray-100 overflow-hidden">
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
        `}} />

        <div className="max-w-7xl mx-auto flex group">
          
          <div className="flex animate-scroll group-hover:[animation-play-state:paused] w-max">
            {[...clients, ...clients, ...clients].map((client, idx) => (
              <div 
                key={idx} 
                className="w-[120px] sm:w-[150px] mx-8 sm:mx-12 flex justify-center items-center transition-transform duration-300 hover:scale-105 relative h-16 cursor-pointer"
              >
                <Image
                  src={client.src}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 120px, 150px"
                />
              </div>
            ))}
          </div>

          <div className="flex animate-scroll group-hover:[animation-play-state:paused] w-max" aria-hidden="true">
            {[...clients, ...clients, ...clients].map((client, idx) => (
              <div 
                key={idx} 
                className="w-[120px] sm:w-[150px] mx-8 sm:mx-12 flex justify-center items-center transition-transform duration-300 hover:scale-105 relative h-16 cursor-pointer"
              >
                <Image
                  src={client.src}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 120px, 150px"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}