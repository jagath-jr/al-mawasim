"use client";

import { useTransition } from "react";
import { moveImageUp, moveImageDown } from "@/actions/gallery";

export default function VisualOrderButtons({ id, isFirst, isLast }: { id: string, isFirst: boolean, isLast: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-center gap-3 w-full mt-2">
      <button 
        disabled={isFirst || isPending}
        onClick={() => startTransition(() => { moveImageUp(id) })}
        className="bg-[#FFFFFF]/95 hover:bg-[#FFFFFF] text-[#1A1A1A] hover:text-[#C5A869] px-4 py-2 rounded-full shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold text-xs flex items-center gap-2 border border-[#9C7C3E]/20"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        Move
      </button>
      <button 
        disabled={isLast || isPending}
        onClick={() => startTransition(() => { moveImageDown(id) })}
        className="bg-[#FFFFFF]/95 hover:bg-[#FFFFFF] text-[#1A1A1A] hover:text-[#C5A869] px-4 py-2 rounded-full shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold text-xs flex items-center gap-2 border border-[#9C7C3E]/20"
      >
        Move 
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}