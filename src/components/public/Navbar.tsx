'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { Phone, Mail, Clock, Menu, X } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // 1. Initial Page Load Animation
  useEffect(() => {
    gsap.fromTo(
      '.nav-item',
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power4.out', delay: 0.1 }
    );
  }, []);

  // 2. Scroll Hide/Show Animation
  useEffect(() => {
    setIsScrolled(window.scrollY > 20);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Close mobile menu if scrolling significantly
      if (isOpen && Math.abs(currentScrollY - lastScrollY.current) > 20) {
        setIsOpen(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        gsap.to(headerRef.current, { yPercent: -100, duration: 0.4, ease: 'power2.out' });
      } else {
        gsap.to(headerRef.current, { yPercent: 0, duration: 0.4, ease: 'power2.out' });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // 3. Mobile Menu Animation
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      
      gsap.fromTo(
        '.mobile-nav-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      gsap.to(mobileMenuRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isOpen]);

  // 4. NEW: Close mobile menu when clicking or touching outside of the header
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // If the menu is open, and the click target is NOT inside the header element
      if (isOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Listen for both clicks and mobile touches
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    // { name: 'Expertise', href: '/expertise' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Sectors', href: '/sectors' },
    { name: 'Contact', href: '/contact' },
  ];

  const isTransparent = isHome && !isScrolled && !isOpen;

  return (
    <header ref={headerRef} className="w-full font-sans fixed top-0 left-0 z-50 transition-colors duration-300">
      
      {/* Top Bar - Contact and Hours */}
      <div className="bg-[#4d3c8c] text-gray-100 text-xs sm:text-sm py-2.5 px-4 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 relative z-20 shadow-sm">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Phone size={14} className="sm:w-4 sm:h-4" />
            <span>+971 56 677 3793</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="sm:w-4 sm:h-4" />
            <span>info@almawasimdecor.com</span>
          </div>
        </div>
        <div className="flex items-center gap-2 hidden sm:flex">
          <Clock size={14} className="sm:w-4 sm:h-4" />
          <span>Mon - Fri 08.00 - 18.00</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`py-4 px-6 lg:px-12 flex justify-between items-center transition-all duration-300 relative z-10 ${
          isTransparent 
            ? 'border-transparent' 
            : 'border-b border-[#4d3c8c]/10 shadow-sm'
        }`}
        style={{
          background: isTransparent 
            ? 'transparent' 
            : 'linear-gradient(90deg, #e8e6ef 0%, #f4f3f7 100%)'
        }}
      >
        
       {/* 1. Left Side: Logo */}
<div className="flex-shrink-0 lg:w-[200px] nav-item opacity-0">
   <Link 
    href="/" 
    className="block transition-colors duration-300"
   >
     <Image 
  src="/AL MAWASIM LOGO (1).png"
  alt="Company Logo"
  width={200}
  height={60}
  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto transition-all duration-300"
  priority
/>
   </Link>
</div>

        {/* 2. Center: Desktop Links */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`nav-item opacity-0 font-medium relative group transition-colors duration-300 py-2 ${
                  isTransparent 
                    ? isActive ? 'text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.8)]' : 'text-white/90 hover:text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.8)]'
                    : isActive ? 'text-[#1a202c] font-semibold' : 'text-[#334155] hover:text-[#4d3c8c]'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-0.5 left-1/2 h-[2px] -translate-x-1/2 transition-all duration-300 ease-out ${
                  isTransparent ? 'bg-white shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : 'bg-[#4d3c8c]'
                } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            );
          })}
        </div>

        {/* 3. Right Side: CTA Button & Mobile Toggle */}
        <div className="flex justify-end items-center lg:w-[200px]">
          <Link 
            href="/contact" 
            className={`hidden lg:flex nav-item opacity-0 px-6 py-2.5 rounded-md font-medium shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 ${
              isTransparent
                ? 'bg-white text-[#3b3470] hover:bg-gray-100'
                : 'bg-[#3b3470] text-white hover:bg-[#2d2757]'
            }`}
          >
            Schedule Now
          </Link>

          {/* Mobile Hamburger Button */}
          <button 
            className={`lg:hidden p-2 focus:outline-none nav-item opacity-0 transition-colors duration-300 ${
              isTransparent 
                ? 'text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]' 
                : 'text-[#1a202c]'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div 
        ref={mobileMenuRef} 
        className="overflow-hidden bg-white border-b border-gray-100 lg:hidden shadow-lg absolute w-full"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="flex flex-col items-start px-6 py-6 gap-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={`mobile-nav-item opacity-0 relative inline-block pb-2 transition-colors group ${
                  isActive 
                    ? 'text-[#4d3c8c] font-bold' 
                    : 'text-[#334155] font-medium hover:text-[#4d3c8c]'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-out bg-[#4d3c8c] ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            );
          })}
          
          <Link 
            href="/schedule" 
            onClick={() => setIsOpen(false)}
            className="mobile-nav-item opacity-0 bg-[#3b3470] text-white px-4 py-3 rounded-md font-medium hover:bg-[#2d2757] transition-colors text-center mt-4 w-full active:scale-95 shadow-sm"
          >
            Schedule Now
          </Link>
        </div>
      </div>
    </header>
  );
}