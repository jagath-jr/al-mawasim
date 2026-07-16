"use client";

import { useTransition } from "react";
import { moveImageUp, moveImageDown } from "@/actions/gallery";

export default function OrderButtons({ id, isFirst, isLast }: { id: string, isFirst: boolean, isLast: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-1 items-center justify-center w-8">
      <button 
        disabled={isFirst || isPending}
        onClick={() => startTransition(() => { moveImageUp(id) })}
        className="text-[#9C7C3E] hover:text-[#C5A869] disabled:opacity-30 transition-colors duration-200"
        title="Move Up"
        aria-label="Move image up"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <button 
        disabled={isLast || isPending}
        onClick={() => startTransition(() => { moveImageDown(id) })}
        className="text-[#9C7C3E] hover:text-[#C5A869] disabled:opacity-30 transition-colors duration-200"
        title="Move Down"
        aria-label="Move image down"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}