"use client";

import { useTransition } from "react";
import { deleteService } from "@/actions/services";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this service? This cannot be undone.")) {
      startTransition(async () => {
        await deleteService(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 font-bold text-sm disabled:opacity-50 transition-colors inline-flex items-center gap-1 cursor-pointer"
      title="Delete Service"
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