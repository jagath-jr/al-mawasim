// src/app/(admin)/admin/catalog/DeleteCatalogButton.tsx
"use client";

import { useTransition } from "react";
import { deleteCatalog } from "@/actions/catalogs";

export default function DeleteCatalogButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Delete this catalog? (This won't delete the file from Google Drive, just the website link).")) {
      startTransition(async () => {
        await deleteCatalog(id);
      });
    }
  };

  return (
    <button onClick={handleDelete} disabled={isPending} className="text-red-500 hover:text-red-700 font-bold text-sm disabled:opacity-50 inline-flex items-center gap-1 cursor-pointer">
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}