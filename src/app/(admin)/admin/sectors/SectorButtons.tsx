"use client";

import { useTransition } from "react";
import { moveSectorUp, moveSectorDown, deleteSector } from "@/actions/sectors";

export function SectorOrderButtons({ id, isFirst, isLast }: { id: string; isFirst: boolean; isLast: boolean }) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex flex-col gap-1 items-center justify-center w-8">
      <button disabled={isFirst || isPending} onClick={() => startTransition(() => { moveSectorUp(id) })} className="text-gray-400 hover:text-gray-900 disabled:opacity-20 transition">▲</button>
      <button disabled={isLast || isPending} onClick={() => startTransition(() => { moveSectorDown(id) })} className="text-gray-400 hover:text-gray-900 disabled:opacity-20 transition">▼</button>
    </div>
  );
}

export function DeleteSectorButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    if (window.confirm("Delete this sector?")) startTransition(() => { deleteSector(id); });
  };
  return (
    <button onClick={handleDelete} disabled={isPending} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
  );
}