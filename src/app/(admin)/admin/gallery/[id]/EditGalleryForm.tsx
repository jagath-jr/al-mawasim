"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateGalleryImage } from "@/actions/gallery";
import Image from "next/image";

export default function EditGalleryForm({ project }: { project: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      let imageUrl = project.imageUrl;

      if (file) {
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
          alert("Image is too large. Max 5MB.");
          setIsSubmitting(false);
          return;
        }

        const uploadData = new FormData();
        uploadData.append("file", file);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });

        if (!uploadRes.ok) throw new Error("Upload failed");
        const uploadJson = await uploadRes.json();
        imageUrl = uploadJson.url;
      }

      await updateGalleryImage(project.id, {
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        imageUrl: imageUrl,
        isPublished: formData.get("isPublished") === "on",
      });

      router.push("/admin/gallery");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update image.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Edit Gallery Image</h2>
        <Link href="/admin/gallery" className="text-blue-600 hover:underline">
          &larr; Back to Gallery
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Image Title (Used for SEO / Lightbox)</label>
          <input 
            type="text" 
            name="title" 
            required 
            defaultValue={project.title} 
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select 
            name="category" 
            defaultValue={project.category} 
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
          >
            <option value="Curtains">Curtains</option>
            <option value="Blinds">Blinds</option>
            <option value="Flooring">Flooring</option>
            <option value="Upholstery">Upholstery</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 flex gap-6 items-center">
          <div className="relative h-24 w-24 rounded overflow-hidden shadow-sm flex-shrink-0">
             <Image src={project.imageUrl} alt="Current" fill className="object-cover" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Update Image File (Leave blank to keep current)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-md border border-gray-200">
          <input 
            type="checkbox" 
            name="isPublished" 
            id="isPublished" 
            defaultChecked={project.isPublished} 
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
          />
          <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
            Publish Image to Public Gallery
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Image"}
        </button>
      </form>
    </div>
  );
}