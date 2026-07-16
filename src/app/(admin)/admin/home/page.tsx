"use client";

import { useState, useEffect } from "react";
import { getHomeSettings, updateHomeSettings, getClientLogos, addClientLogo, deleteClientLogo } from "@/actions/home";
import Image from "next/image";

export default function AdminHomePage() {
  const [settings, setSettings] = useState<any>(null);
  const [logos, setLogos] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // File inputs
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [about1File, setAbout1File] = useState<File | null>(null);
  const [about2File, setAbout2File] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    getHomeSettings().then(setSettings);
    getClientLogos().then(setLogos);
  }, []);

  if (!settings) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="p-10 text-center text-[#9C7C3E] font-medium animate-pulse">Loading settings...</div>
    </div>
  );

  // --- SAVE HOME SETTINGS ---
  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      let heroUrl = settings.heroImage;
      let about1Url = settings.aboutImage1;
      let about2Url = settings.aboutImage2;

      // Upload Helper
      const upload = async (file: File) => {
        const data = new FormData(); data.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: data });
        return (await res.json()).url;
      };

      if (heroFile) heroUrl = await upload(heroFile);
      if (about1File) about1Url = await upload(about1File);
      if (about2File) about2Url = await upload(about2File);

      await updateHomeSettings({
        heroTitle: formData.get("heroTitle"),
        heroSubtitle: formData.get("heroSubtitle"),
        aboutTitle: formData.get("aboutTitle"),
        aboutDescription: formData.get("aboutDescription"),
        statsProjects: parseInt(formData.get("statsProjects") as string) || 0,
        statsSatisfaction: parseInt(formData.get("statsSatisfaction") as string) || 0,
        heroImage: heroUrl,
        aboutImage1: about1Url,
        aboutImage2: about2Url,
      });

      alert("Home settings updated successfully!");
    } catch (err) {
      alert("Failed to update settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

// --- ADD CLIENT LOGO ---
  const handleAddLogo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!logoFile) return alert("Please select a logo image.");
    setIsSubmitting(true);
    
    try {
      const form = e.currentTarget;
      const companyName = new FormData(form).get("name") as string;

      // 1. Upload the Image to the API
      const data = new FormData(); 
      data.append("file", logoFile);
      
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      
      // If the API failed, throw the specific error
      if (!res.ok) {
        throw new Error(result.error || "Failed to upload image to the server.");
      }

      // 2. Save the database record
      await addClientLogo({ name: companyName, image: result.url });
      
      // 3. Clean up the form
      form.reset(); 
      setLogoFile(null);
      
      // 4. Refresh the logos on the screen
      const updatedLogos = await getClientLogos();
      setLogos(updatedLogos);
      
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message || "Something went wrong."}`);
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const inputStyles = "mt-1 w-full px-4 py-3 border border-[#C5A869]/30 rounded-xl text-[#1A1A1A] bg-[#FDFBF7] outline-none focus:ring-2 focus:ring-[#C5A869] focus:border-transparent transition-all";
  const fileInputStyles = "w-full text-[#1A1A1A]/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#C5A869]/10 file:text-[#9C7C3E] hover:file:bg-[#C5A869]/20 cursor-pointer transition-colors";

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1A1A1A]">Home Page Settings</h2>
        <p className="text-[#1A1A1A]/60 mt-2 text-base">Update text, images, stats, and partner logos.</p>
        <div className="bg-[#C5A869]/10 text-[#9C7C3E] p-4 mt-4 rounded-xl text-sm font-medium border border-[#C5A869]/20 flex gap-3 items-start shadow-sm">
          <span className="text-lg leading-none">💡</span>
          <p>The 3 "Services" cards and the "Contact Us" banners are automatically pulled from your Services CMS and Contact CMS!</p>
        </div>
      </div>

      {/* PART 1: TEXT & MAIN IMAGES */}
      <form onSubmit={handleSaveSettings} className="bg-[#FFFFFF] p-6 md:p-8 rounded-2xl shadow-sm border border-[#C5A869]/20 space-y-10">
        
        {/* HERO SECTION */}
        <div>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-5 border-b border-[#C5A869]/20 pb-3">1. Hero Section</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A]/80">Hero Title</label>
              <textarea name="heroTitle" defaultValue={settings.heroTitle} required rows={2} className={inputStyles}></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A]/80">Hero Subtitle</label>
              <textarea name="heroSubtitle" defaultValue={settings.heroSubtitle} required rows={3} className={inputStyles}></textarea>
            </div>
            <div className="p-5 border border-[#C5A869]/20 rounded-xl bg-[#FDFBF7] flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative h-24 w-40 rounded-lg overflow-hidden shadow-sm bg-gray-100 flex-shrink-0">
                <Image src={settings.heroImage} alt="Hero" fill className="object-cover" />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-[#1A1A1A]/80 mb-3">Update Hero Background</label>
                <input type="file" accept="image/*" onChange={(e) => setHeroFile(e.target.files?.[0] || null)} className={fileInputStyles} />
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-5 border-b border-[#C5A869]/20 pb-3">2. About Section</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A]/80">About Title</label>
              <textarea name="aboutTitle" defaultValue={settings.aboutTitle} required rows={2} className={inputStyles}></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A]/80">About Description</label>
              <textarea name="aboutDescription" defaultValue={settings.aboutDescription} required rows={4} className={inputStyles}></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="p-5 border border-[#C5A869]/20 rounded-xl bg-[#FDFBF7] flex flex-col gap-4">
                <div className="relative h-40 w-full rounded-lg overflow-hidden shadow-sm bg-gray-100">
                  <Image src={settings.aboutImage1} alt="About 1" fill className="object-cover" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A]/80 mb-2">Update Top Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setAbout1File(e.target.files?.[0] || null)} className={fileInputStyles} />
                </div>
              </div>
              <div className="p-5 border border-[#C5A869]/20 rounded-xl bg-[#FDFBF7] flex flex-col gap-4">
                <div className="relative h-40 w-full rounded-lg overflow-hidden shadow-sm bg-gray-100">
                  <Image src={settings.aboutImage2} alt="About 2" fill className="object-cover" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A]/80 mb-2">Update Bottom Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setAbout2File(e.target.files?.[0] || null)} className={fileInputStyles} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-5 border-b border-[#C5A869]/20 pb-3">3. Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A]/80">Projects Completed</label>
              <input type="number" name="statsProjects" defaultValue={settings.statsProjects} required className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A]/80">Customer Satisfaction (%)</label>
              <input type="number" name="statsSatisfaction" defaultValue={settings.statsSatisfaction} required className={inputStyles} />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full bg-[#C5A869] text-[#FFFFFF] py-4 rounded-xl hover:bg-[#9C7C3E] transition-all font-bold disabled:opacity-50 text-lg shadow-md shadow-[#C5A869]/20 active:scale-[0.99]"
        >
          {isSubmitting ? "Saving Updates..." : "Save Main Home Settings"}
        </button>
      </form>

      {/* PART 2: PARTNER LOGOS MANAGER */}
      <div className="bg-[#FFFFFF] p-6 md:p-8 rounded-2xl shadow-sm border border-[#C5A869]/20">
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-5 border-b border-[#C5A869]/20 pb-3">4. Scrolling Partner Logos</h3>
        
        {/* Upload Form */}
        <form onSubmit={handleAddLogo} className="bg-[#FDFBF7] p-5 md:p-6 rounded-xl border border-[#C5A869]/20 mb-8 flex flex-col md:flex-row items-start md:items-end gap-5">
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-[#1A1A1A]/80 mb-2">Company Name</label>
            <input type="text" name="name" required placeholder="e.g. Daikin" className={inputStyles} />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-[#1A1A1A]/80 mb-2">Logo Image (PNG transparent)</label>
            <input type="file" accept="image/*" required onChange={(e) => setLogoFile(e.target.files?.[0] || null)} className={fileInputStyles} />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full md:w-auto bg-[#1A1A1A] text-[#FDFBF7] px-8 py-3 rounded-xl hover:bg-black transition-all font-semibold md:h-[50px] shadow-md active:scale-[0.98]"
          >
            + Add Logo
          </button>
        </form>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {logos.length === 0 ? (
            <p className="text-[#1A1A1A]/50 col-span-4 text-center py-6 bg-[#FDFBF7] rounded-xl border border-dashed border-[#C5A869]/30">
              No logos added yet. Add your first partner logo above.
            </p>
          ) : (
            logos.map((logo) => (
              <div key={logo.id} className="border border-[#C5A869]/20 rounded-xl p-4 flex flex-col items-center relative group bg-[#FDFBF7] hover:shadow-md transition-shadow">
                <div className="relative w-full h-20">
                  <Image src={logo.image} alt={logo.name} fill className="object-contain p-2" />
                </div>
                <p className="text-sm text-[#1A1A1A]/70 mt-3 font-semibold">{logo.name}</p>
                <button 
                  onClick={() => { 
                    if(window.confirm("Are you sure you want to delete this logo?")) { 
                      deleteClientLogo(logo.id); getClientLogos().then(setLogos); 
                    } 
                  }} 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-md focus:opacity-100"
                  aria-label="Delete Logo"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}