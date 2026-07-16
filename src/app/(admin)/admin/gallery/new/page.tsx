"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createGalleryImage } from "@/actions/gallery";

export default function NewGalleryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    // NEW: Enforce 5MB file size limit (5 * 1024 * 1024 bytes)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      alert("This image is too large! Please select an image under 5MB.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      
      // Upload to your VPS
      const uploadData = new FormData();
      uploadData.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!uploadRes.ok) throw new Error("Image upload failed");
      const uploadJson = await uploadRes.json();

      // Save to database
      await createGalleryImage({
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        imageUrl: uploadJson.url,
        isPublished: formData.get("isPublished") === "on",
      });

      router.push("/admin/gallery");
    } catch (error: any) {
      console.error(error);
      
      // NEW: Handle the custom error thrown by our Server Action
      if (error.message.includes("GALLERY_FULL")) {
        alert("Upload failed: Your gallery has reached the maximum limit of 18 images. Please delete an old image before uploading a new one.");
      } else {
        alert("Upload failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Upload to Gallery</h2>
        <Link href="/admin/gallery" className="text-blue-600 hover:underline">
          &larr; Back to Gallery
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {/* Helper Note for the Admin */}
        <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm mb-4">
          <strong>Note:</strong> Maximum 18 images allowed in the gallery. Max file size: 5MB per image.
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image Title (Used for SEO / Lightbox)</label>
          <input 
            type="text" name="title" required 
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
            placeholder="e.g., Wave Fold Curtains in Villa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select name="category" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900">
            <option value="Curtains">Curtains</option>
            <option value="Blinds">Blinds</option>
            <option value="Flooring">Flooring</option>
            <option value="Upholstery">Upholstery</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Image File (Max: 5MB)</label>
          <input 
            type="file" 
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-md border border-gray-200">
          <input 
            type="checkbox" name="isPublished" id="isPublished" defaultChecked 
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
            Publish Image to Public Gallery
          </label>
        </div>

        <button 
          type="submit" disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
}