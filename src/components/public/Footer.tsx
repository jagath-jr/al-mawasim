'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MapPin, Mail } from 'lucide-react'; 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely for Next.js SSR
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Modern, Official Brand SVGs ---
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M21.582 6.186a2.686 2.686 0 0 0-1.884-1.904C18.04 3.84 12 3.84 12 3.84s-6.04 0-7.698.442a2.686 2.686 0 0 0-1.884 1.904A28.434 28.434 0 0 0 2 12c0 1.93.18 3.896.418 5.814a2.686 2.686 0 0 0 1.884 1.904c1.658.442 7.698.442 7.698.442s6.04 0 7.698-.442a2.686 2.686 0 0 0 1.884-1.904A28.434 28.434 0 0 0 22 12c0-1.93-.18-3.896-.418-5.814zM10 15.464V8.536L16 12l-6 3.464z"/>
  </svg>
);

const XIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const TikTokIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  
  // 1. Get the current pathname to detect route changes
  const pathname = usePathname();

  useEffect(() => {
    if (!footerRef.current) return;

    // 2. Use gsap.context for safe React cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%', // Triggers when the top of the footer enters 85% of the screen
          toggleActions: 'play none none none' // Plays once
        }
      });

      // Top CTA Banner slides down and fades in
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );

      // The 4 main columns slide up in a staggered sequence
      if (columnsRef.current.length > 0) {
        tl.fromTo(
          columnsRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' },
          "-=0.3" 
        );
      }

      // Social Icons stagger pop-in effect
      tl.fromTo(
        '.social-icon',
        { opacity: 0, scale: 0.5, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)' },
        "-=0.4"
      );

      // The bottom copyright bar gently fades in at the end
      tl.fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        "-=0.2"
      );
    }, footerRef);

    // 3. Force ScrollTrigger to recalculate page heights after a tiny delay
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // 4. Cleanup function to prevent memory leaks and overlapping animations
    return () => {
      ctx.revert(); 
      clearTimeout(timeoutId);
    };
    
  }, [pathname]);

  const socialLinks = [
    { name: 'WhatsApp', icon: <WhatsAppIcon size={18} />, href: 'https://wa.me/971566773793' },
    { name: 'Instagram', icon: <InstagramIcon size={18} />, href: 'https://www.instagram.com/almawasimdecore_curtains' },
    { name: 'Facebook', icon: <FacebookIcon size={18} />, href: 'https://www.facebook.com/share/1E6L4Dd9i8/' },
    { name: 'TikTok', icon: <TikTokIcon size={18} />, href: 'https://www.tiktok.com/@almawasimdecore_curtains' },
    { name: 'YouTube', icon: <YoutubeIcon size={18} />, href: 'https://youtube.com/@almawasimdecoreandcurtains-llc' },
    { name: 'LinkedIn', icon: <LinkedinIcon size={18} />, href: 'https://www.linkedin.com/in/almawasim-curtains-7737b5394' },
    { name: 'X', icon: <XIcon size={18} />, href: 'https://x.com/almawasim7737' },
  ];

  return (
    <footer ref={footerRef} className="w-full font-sans flex flex-col overflow-hidden">
      
      {/* Top CTA Banner */}
      <div 
        ref={ctaRef}
        className="bg-[#4d3c8c] py-8 px-6 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <h2 className="text-white text-2xl sm:text-3xl font-medium tracking-wide text-center md:text-left">
          Get a Free Quote for Curtains, Blinds & Flooring Services in Abu Dhabi
        </h2>
        <Link 
          href="/schedule" 
          className="w-full md:w-auto text-center bg-[#3b3470] text-white px-8 py-3.5 rounded-md font-medium hover:bg-[#2d2757] transition-colors shadow-md"
        >
          Call Us Now
        </Link>
      </div>

      {/* Main Footer Content */}
      <div className="bg-[#262140] pt-16 pb-16 px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Description & Social Icons */}
          <div ref={(el) => { columnsRef.current[0] = el; }} className="lg:pr-6 flex flex-col h-full">
            <p className="text-gray-200 text-sm leading-relaxed text-center md:text-left mb-8">
              AL MAWASIM DECOR & CURTAINS provides custom curtains, roller blinds, zebra blinds, vertical blinds, Venetian blinds, motorized curtains, SPC flooring, laminate flooring, wallpaper installation, and sofa upholstery services across Abu Dhabi, UAE.
            </p>
            
            {/* Social Icons Container */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-auto">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="social-icon flex items-center justify-center w-9 h-9 rounded-full border border-gray-400 text-gray-300 hover:bg-white hover:text-[#262140] hover:border-white transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div ref={(el) => { columnsRef.current[1] = el; }} className="text-center md:text-left">
            <h3 className="text-white font-medium text-lg mb-6">Company</h3>
            <ul className="space-y-3 text-gray-200 text-sm inline-block text-left">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"></span> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"></span> About Us
                </Link>
              </li>
              {/* <li>
                <Link href="/expertise" className="hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"></span> Expertise
                </Link>
              </li> */}
              <li>
                <Link href="/services" className="hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"></span> Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"></span> Projects
                </Link>
              </li>
              <li>
                <Link href="/sectors" className="hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"></span> Sectors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"></span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Links */}
          <div ref={(el) => { columnsRef.current[2] = el; }} className="text-center md:text-left">
            <h3 className="text-white font-medium text-lg mb-6">Our Services</h3>
            <ul className="space-y-3 text-gray-200 text-sm inline-block text-left">
              <li>
                <Link href="/services/curtains" className="hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"></span> Curtains
                </Link>
              </li>
              <li>
                <Link href="/services/blinds" className="hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"></span> Blinds
                </Link>
              </li>
              <li>
                <Link href="/services/flooring" className="hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"></span> Flooring
                </Link>
              </li>
              <li>
                <Link href="/services/upholstery" className="hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"></span> Upholstery
                </Link>
              </li>
              <li>
                <Link href="/services/wall-finishes" className="hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"></span> Wall Finishes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (UPDATED) */}
          <div ref={(el) => { columnsRef.current[3] = el; }} className="text-center md:text-left flex flex-col items-center md:items-start space-y-8">
            
            {/* Contact Us */}
            <div className="group cursor-pointer flex flex-col gap-3">
              <div className="flex items-center justify-center md:justify-start gap-2 text-white font-medium">
                <Phone size={16} className="text-white group-hover:scale-110 transition-transform shrink-0" />
                <h4 className="text-base font-medium">Contact Us</h4>
              </div>
              <div className="text-gray-300 text-sm pl-0 md:pl-6 space-y-2 group-hover:text-white transition-colors">
                <p>+971 56 677 3793</p>
                <p>+971 55 521 8804</p>
              </div>
            </div>

            {/* Office Location */}
            <div className="group cursor-pointer flex flex-col gap-3">
              <div className="flex items-center justify-center md:justify-start gap-2 text-white font-medium">
                <MapPin size={16} className="text-white group-hover:scale-110 transition-transform shrink-0" />
                <h4 className="text-base font-medium">Office Location</h4>
              </div>
              <p className="text-gray-300 text-sm pl-0 md:pl-6 group-hover:text-white transition-colors">
                Abu Dhabi, UAE
              </p>
            </div>

            {/* Send a Message */}
            <div className="group cursor-pointer flex flex-col gap-3">
              <div className="flex items-center justify-center md:justify-start gap-2 text-white font-medium">
                <Mail size={16} className="text-white group-hover:scale-110 transition-transform shrink-0" />
                <h4 className="text-base font-medium">Send a Message</h4>
              </div>
              <p className="text-gray-300 text-sm pl-0 md:pl-6 group-hover:text-white transition-colors break-all sm:break-normal">
                info@almawasimdecor.com
              </p>
            </div>
            
          </div>

        </div>
      </div>

      {/* Bottom Bar - Copyright (UPDATED) */}
      <div 
        ref={bottomBarRef}
        className="bg-[#1f1b36] border-t border-white/5 py-6 px-6 lg:px-16 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-4"
      >
        <p className="text-center md:text-left">© 2026 AL MAWASIM DECOR & CURTAINS. All Rights Reserved.</p>
        <div className="flex flex-wrap justify-center items-center gap-6 mt-2 md:mt-0">
          <Link href="/terms" className="hover:text-white transition-colors whitespace-nowrap">Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-white transition-colors whitespace-nowrap">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}