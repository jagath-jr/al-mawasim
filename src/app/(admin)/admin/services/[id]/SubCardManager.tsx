"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { addSubCard, deleteSubCard } from "@/actions/services";

type SubCard = { id: string; title: string; desc: string; img: string };

export default function SubCardManager({ serviceId, subCards }: { serviceId: string; subCards: SubCard[] }) {
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleAddSubCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image for the sub-card.");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData(e.currentTarget);
      
      // 1. Upload image to VPS
      const uploadData = new FormData();
      uploadData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!uploadRes.ok) throw new Error("Image upload failed");
      const uploadJson = await uploadRes.json();

      // 2. Save Sub-Card to PostgreSQL
      await addSubCard(serviceId, {
        title: formData.get("title") as string,
        desc: formData.get("desc") as string,
        img: uploadJson.url,
      });

      // 3. Reset form
      (e.target as HTMLFormElement).reset();
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add sub-card.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (subCardId: string) => {
    if (window.confirm("Delete this sub-card? This cannot be undone.")) {
      startTransition(async () => {
        await deleteSubCard(subCardId, serviceId);
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-12 border-t-4 border-gray-800">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Manage Sub-Cards (Grid Items)</h3>
        <p className="text-sm text-gray-500">These are the smaller cards that appear in a grid below the main service content.</p>
      </div>
      
      {/* List of Existing Sub-Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {subCards.length === 0 ? (
          <p className="text-gray-500 text-sm col-span-full bg-gray-50 p-4 rounded text-center border border-dashed">
            No sub-cards added yet. Add your first one below!
          </p>
        ) : (
          subCards.map((card) => (
            <div key={card.id} className="border rounded-md overflow-hidden shadow-sm relative group bg-white">
              <div className="h-40 w-full relative">
                <Image src={card.img} alt={card.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-900 truncate mb-1">{card.title}</h4>
                <p className="text-xs text-gray-600 line-clamp-3">{card.desc}</p>
              </div>
              <button
                onClick={() => handleDelete(card.id)}
                disabled={isPending}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition disabled:opacity-50 shadow-md hover:bg-red-700"
                title="Delete Sub-Card"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Form to Add New Sub-Card */}
      <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4 text-lg">+ Add New Sub-Card</h4>
        
        <form onSubmit={handleAddSubCard} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Heading (Title)
            </label>
            <input 
              type="text" 
              name="title" 
              required 
              placeholder="e.g., Roller Blinds"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Sub-Heading (Description)
            </label>
            <textarea 
              name="desc" 
              required 
              rows={3} 
              placeholder="e.g., Stylish roller blinds offering effective light control..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
            ></textarea>
          </div>

          <div className="p-4 border-2 border-dashed border-gray-300 rounded-md bg-white">
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Image</label>
            <input 
              type="file" 
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <button 
            type="submit" 
            disabled={isUploading}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-md text-sm hover:bg-gray-800 transition font-medium disabled:opacity-50"
          >
            {isUploading ? "Uploading Image & Saving Card..." : "Save Sub-Card to Grid"}
          </button>
        </form>
      </div>
    </div>
  );
}