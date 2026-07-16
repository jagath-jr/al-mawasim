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

  const inputStyles = "w-full px-4 py-2.5 border border-[#9C7C3E]/30 rounded-lg text-sm text-[#1A1A1A] bg-[#FFFFFF] outline-none focus:ring-2 focus:ring-[#C5A869]/50 focus:border-[#C5A869] transition-all placeholder-gray-400";
  const labelStyles = "block text-sm font-semibold text-[#1A1A1A] mb-1.5";
  const fileInputStyles = "w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#1A1A1A] file:text-[#C5A869] hover:file:bg-[#C5A869] hover:file:text-[#1A1A1A] file:transition-all cursor-pointer";

  return (
    <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-2xl shadow-sm border border-[#9C7C3E]/20 mt-12">
      <div className="mb-8 border-b border-[#9C7C3E]/20 pb-4">
        <h3 className="text-2xl font-bold text-[#1A1A1A] flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
          Manage Sub-Cards (Grid Items)
        </h3>
        <p className="text-sm text-[#9C7C3E] mt-2 font-medium">
          These are the smaller cards that appear in a grid below the main service content.
        </p>
      </div>
      
      {/* List of Existing Sub-Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {subCards.length === 0 ? (
          <div className="col-span-full bg-[#FDFBF7] p-8 rounded-xl text-center border-2 border-dashed border-[#9C7C3E]/30">
            <svg className="w-10 h-10 text-[#C5A869] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-[#9C7C3E] text-sm font-semibold">
              No sub-cards added yet. Add your first one below!
            </p>
          </div>
        ) : (
          subCards.map((card) => (
            <div key={card.id} className="border border-[#9C7C3E]/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-[#C5A869]/50 relative group bg-[#FDFBF7]">
              <div className="h-40 w-full relative border-b border-[#9C7C3E]/20">
                <Image src={card.img} alt={card.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[#1A1A1A] truncate mb-1.5">{card.title}</h4>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">{card.desc}</p>
              </div>
              <button
                onClick={() => handleDelete(card.id)}
                disabled={isPending}
                className="absolute top-3 right-3 bg-red-500/90 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50 shadow-md hover:bg-red-600 hover:scale-105"
                title="Delete Sub-Card"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Form to Add New Sub-Card */}
      <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-xl border border-[#9C7C3E]/20">
        <h4 className="font-bold text-[#1A1A1A] mb-6 text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-[#C5A869]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Sub-Card
        </h4>
        
        <form onSubmit={handleAddSubCard} className="space-y-5">
          <div>
            <label className={labelStyles}>
              Card Heading (Title)
            </label>
            <input 
              type="text" 
              name="title" 
              required 
              placeholder="e.g., Roller Blinds"
              className={inputStyles} 
            />
          </div>

          <div>
            <label className={labelStyles}>
              Card Sub-Heading (Description)
            </label>
            <textarea 
              name="desc" 
              required 
              rows={3} 
              placeholder="e.g., Stylish roller blinds offering effective light control..."
              className={inputStyles}
            ></textarea>
          </div>

          <div className="p-5 border-2 border-dashed border-[#9C7C3E]/30 rounded-xl bg-[#FFFFFF]">
            <label className={labelStyles}>Card Image</label>
            <input 
              type="file" 
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className={fileInputStyles}
            />
          </div>

          <button 
            type="submit" 
            disabled={isUploading}
            className="w-full bg-[#1A1A1A] text-[#C5A869] py-3.5 rounded-xl text-sm hover:bg-[#C5A869] hover:text-[#1A1A1A] transition-all font-bold disabled:opacity-70 disabled:cursor-not-allowed shadow-md border border-[#9C7C3E]/30 mt-2"
          >
            {isUploading ? "Uploading Image & Saving Card..." : "Save Sub-Card to Grid"}
          </button>
        </form>
      </div>
    </div>
  );
}