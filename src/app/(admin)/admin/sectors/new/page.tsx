"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSector } from "@/actions/sectors";

export default function NewSectorPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Select an image.");
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const uploadData = new FormData();
      uploadData.append("file", file);
      
      const res = await fetch("/api/upload", { method: "POST", body: uploadData });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();

      await createSector({
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        description: formData.get("description") as string,
        image: url,
        isActive: formData.get("isActive") === "on",
      });

      router.push("/admin/sectors");
    } catch (err) {
      alert("Failed to save sector.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Add Sector</h2>
        <Link href="/admin/sectors" className="text-blue-600 hover:underline">&larr; Back</Link>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Sector Title</label>
          <input 
            type="text" name="title" required placeholder="e.g. Residential" 
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input 
            type="text" name="subtitle" required placeholder="e.g. Transforming Homes with Elegant Interior Solutions" 
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            name="description" required rows={5} placeholder="Describe the sector in detail..." 
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>

        <div className="p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">Display Image</label>
          <input 
            type="file" accept="image/*" required 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
          />
        </div>

        <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-md border border-gray-200">
          <input type="checkbox" name="isActive" id="isActive" defaultChecked className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Publish Sector</label>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-semibold disabled:opacity-50">
          {isSubmitting ? "Saving & Uploading..." : "Save Sector"}
        </button>
      </form>
    </div>
  );
}