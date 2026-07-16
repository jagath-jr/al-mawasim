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
      className="text-red-600 hover:text-red-800 font-medium text-sm disabled:opacity-50 transition"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}