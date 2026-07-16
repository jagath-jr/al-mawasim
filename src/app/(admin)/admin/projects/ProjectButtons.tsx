"use client";

import { useTransition } from "react";
import { moveProjectUp, moveProjectDown, deleteProject } from "@/actions/projects";

export function VisualProjectOrderButtons({ id, isFirst, isLast }: { id: string; isFirst: boolean; isLast: boolean }) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex justify-center gap-3 w-full mt-2">
      <button 
        disabled={isFirst || isPending} 
        onClick={() => startTransition(() => { moveProjectUp(id) })} 
        className="bg-[#FFFFFF]/95 hover:bg-[#FFFFFF] text-[#1A1A1A] hover:text-[#C5A869] px-4 py-2 rounded-full shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold text-xs flex items-center gap-2 border border-[#9C7C3E]/20"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        Move
      </button>
      <button 
        disabled={isLast || isPending} 
        onClick={() => startTransition(() => { moveProjectDown(id) })} 
        className="bg-[#FFFFFF]/95 hover:bg-[#FFFFFF] text-[#1A1A1A] hover:text-[#C5A869] px-4 py-2 rounded-full shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold text-xs flex items-center gap-2 border border-[#9C7C3E]/20"
      >
        Move 
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}

export function DeleteProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  
  const handleDelete = () => {
    if (window.confirm("Delete this project? This will also delete the uploaded image.")) {
      startTransition(() => { deleteProject(id); });
    }
  };
  
  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending} 
      className="bg-red-500/90 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-red-600 hover:scale-105 active:scale-95 disabled:opacity-50"
      title="Delete Project"
    >
      {isPending ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}