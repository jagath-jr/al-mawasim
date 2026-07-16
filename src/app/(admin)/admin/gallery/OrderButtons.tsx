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
        className="text-gray-500 hover:text-gray-900 disabled:opacity-30 transition-colors duration-200 text-lg font-bold"
        title="Move Up"
        aria-label="Move image up"
      >
        ▲
      </button>
      <button 
        disabled={isLast || isPending}
        onClick={() => startTransition(() => { moveImageDown(id) })}
        className="text-gray-500 hover:text-gray-900 disabled:opacity-30 transition-colors duration-200 text-lg font-bold"
        title="Move Down"
        aria-label="Move image down"
      >
        ▼
      </button>
    </div>
  );
}