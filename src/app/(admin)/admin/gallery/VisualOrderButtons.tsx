"use client";

import { useTransition } from "react";
import { moveImageUp, moveImageDown } from "@/actions/gallery";

export default function VisualOrderButtons({ id, isFirst, isLast }: { id: string, isFirst: boolean, isLast: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-center gap-4 w-full mt-4">
      <button 
        disabled={isFirst || isPending}
        onClick={() => startTransition(() => { moveImageUp(id) })}
        className="bg-white/95 hover:bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition font-semibold text-sm flex items-center gap-2"
      >
        <span>&larr;</span> Move
      </button>
      <button 
        disabled={isLast || isPending}
        onClick={() => startTransition(() => { moveImageDown(id) })}
        className="bg-white/95 hover:bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition font-semibold text-sm flex items-center gap-2"
      >
        Move <span>&rarr;</span>
      </button>
    </div>
  );
}