'use client';

import Image from 'next/image';

export default function HowItWorks() {
  const clients = [
    { name: "Amana", src: "/logo-amana.png" },
    { name: "Daikin", src: "/logo-daikin.png" },
    { name: "Honeywell", src: "/logo-honeywell.png" },
    { name: "Lennox", src: "/logo-lennox.png" },
    { name: "Carrier", src: "/logo-carrier.png" }
  ];

  return (
    <section className="bg-white py-12 border-t border-gray-100 overflow-hidden">
      
      {/* Inline style for the custom marquee animation to avoid needing tailwind config changes */}
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
        
        {/* First Loop */}
        <div className="flex animate-scroll group-hover:[animation-play-state:paused] w-max">
          {/* We map the array a few times to ensure it covers the screen width */}
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

        {/* Second Identical Loop (Seamlessly follows the first) */}
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
  );
}