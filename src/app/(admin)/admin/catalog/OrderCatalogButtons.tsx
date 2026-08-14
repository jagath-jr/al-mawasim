"use client";

import { useTransition } from "react";
import { moveCatalog } from "@/actions/catalogs";

export default function OrderCatalogButtons({ id, isFirst, isLast }: { id: string, isFirst: boolean, isLast: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleMove = (direction: 'up' | 'down') => {
    startTransition(async () => {
      await moveCatalog(id, direction);
    });
  };

  return (
    <div className="flex justify-center">
      <div className="inline-flex bg-[#1A1A1A]/80 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-xl">
        <button
          onClick={() => handleMove('up')}
          disabled={isFirst || isPending}
          className="p-1.5 sm:p-2 text-white hover:text-[#1A1A1A] hover:bg-[#C5A869] rounded-full disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-all duration-300"
          title="Move Left/Earlier"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="w-px bg-white/20 mx-1 sm:mx-2 my-1" />
        
        <button
          onClick={() => handleMove('down')}
          disabled={isLast || isPending}
          className="p-1.5 sm:p-2 text-white hover:text-[#1A1A1A] hover:bg-[#C5A869] rounded-full disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-all duration-300"
          title="Move Right/Later"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}