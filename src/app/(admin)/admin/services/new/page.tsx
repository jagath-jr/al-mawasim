"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createService } from "@/actions/services";

export default function NewServicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      let imageUrl = "";

      // 1. Upload the image to the VPS first (if a file was selected)
      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");
        
        const uploadJson = await uploadRes.json();
        imageUrl = uploadJson.url; // e.g., /uploads/12345-curtains.webp
      }

      // 2. Save everything to PostgreSQL
      await createService({
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        description: formData.get("description") as string,
        layout: formData.get("layout") as string,
        subSectionTitle: formData.get("subSectionTitle") as string,
        image: imageUrl,
        isActive: formData.get("isActive") === "on", // Gets checkbox value
      });
      
      // 3. Redirect back to the services list
      router.push("/admin/services");
    } catch (error) {
      console.error(error);
      alert("Failed to save service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Add New Service</h2>
        <Link href="/admin/services" className="text-blue-600 hover:underline">
          &larr; Back to Services
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Service Title</label>
          <input 
            type="text" name="title" required 
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
            placeholder="e.g., Curtains"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input 
            type="text" name="subtitle" 
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
            placeholder="e.g., Elegant Curtain Solutions..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            name="description" required rows={5}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
            placeholder="Describe the service in detail..."
          ></textarea>
        </div>

        {/* Sub-Cards Header Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sub-Cards Header Title (Optional)</label>
          <input 
            type="text" name="subSectionTitle" 
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
            placeholder="e.g., Available Curtain Types"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Layout Style</label>
          <select name="layout" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900">
            <option value="textLeft">Text Left, Image Right</option>
            <option value="imageLeft">Image Left, Text Right</option>
            <option value="textLeftResponsive">Text Left (Responsive Style)</option>
          </select>
        </div>

        <div className="p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">Main Display Image</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        {/* NEW FIELD: Status Toggle */}
        <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-md border border-gray-200">
          <input 
            type="checkbox" 
            name="isActive" 
            id="isActive"
            defaultChecked 
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Publish this Service (Active)
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Uploading & Saving..." : "Save Service"}
        </button>
      </form>
    </div>
  );
}