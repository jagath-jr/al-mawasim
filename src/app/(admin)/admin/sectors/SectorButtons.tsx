"use client";

import { useTransition } from "react";
import { moveSectorUp, moveSectorDown, deleteSector } from "@/actions/sectors";

export function SectorOrderButtons({ id, isFirst, isLast }: { id: string; isFirst: boolean; isLast: boolean }) {
  const [isPending, startTransition] = useTransition();
  
  return (
    <div className="flex flex-col gap-1 items-center justify-center w-8">
      <button 
        disabled={isFirst || isPending} 
        onClick={() => startTransition(() => { moveSectorUp(id) })} 
        className="text-[#9C7C3E] hover:text-[#C5A869] disabled:opacity-30 transition-colors duration-200"
        title="Move Up"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <button 
        disabled={isLast || isPending} 
        onClick={() => startTransition(() => { moveSectorDown(id) })} 
        className="text-[#9C7C3E] hover:text-[#C5A869] disabled:opacity-30 transition-colors duration-200"
        title="Move Down"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}

export function DeleteSectorButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this sector?")) {
      startTransition(() => { deleteSector(id); });
    }
  };
  
  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending} 
      className="text-red-500 hover:text-red-700 font-bold text-sm disabled:opacity-50 transition-colors inline-flex items-center gap-1 cursor-pointer"
      title="Delete Sector"
    >
      {isPending ? (
        <span className="animate-pulse">Deleting...</span>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </>
      )}
    </button>
  );
}