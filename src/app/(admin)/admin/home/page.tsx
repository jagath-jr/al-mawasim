"use client";

import { useState, useEffect } from "react";
import { getHomeSettings, updateHomeSettings, getClientLogos, addClientLogo, deleteClientLogo } from "@/actions/home";
import Image from "next/image";
import type { NextConfig } from "next";

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
    <div className="p-10 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-4 border-[#C5A869] border-t-transparent rounded-full animate-spin mb-4"></div>
      <div className="text-[#9C7C3E] font-medium tracking-wide animate-pulse">Loading settings...</div>
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

  const inputStyles = "mt-1 w-full px-4 py-2.5 border border-[#9C7C3E]/30 rounded-lg text-[#1A1A1A] bg-[#FDFBF7] outline-none focus:ring-2 focus:ring-[#C5A869]/50 focus:border-[#C5A869] transition-all";
  const labelStyles = "block text-sm font-semibold text-[#1A1A1A]";
  const sectionHeaderStyles = "text-xl font-bold text-[#1A1A1A] mb-5 border-b border-[#9C7C3E]/20 pb-3 flex items-center gap-2";
  const fileInputStyles = "w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1A1A1A] file:text-[#C5A869] hover:file:bg-[#C5A869] hover:file:text-[#1A1A1A] file:transition-all cursor-pointer";

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#9C7C3E]/40 p-8 rounded-2xl shadow-lg border border-[#9C7C3E]/30 relative overflow-hidden">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-[#C5A869] text-[#1A1A1A] rounded-full mb-3">
            Site Configuration
          </span>
          <h2 className="text-3xl font-bold text-white">Home Page Settings</h2>
          <p className="text-gray-300 mt-2 text-sm max-w-xl leading-relaxed">
            Update text, images, stats, and partner logos displayed on the landing page.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="bg-[#C5A869]/10 border border-[#C5A869]/30 text-[#1A1A1A] p-4 rounded-xl text-sm flex items-start gap-3">
        <svg className="w-5 h-5 text-[#9C7C3E] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>
          <span className="font-bold text-[#9C7C3E]">Dynamic Content Note:</span> The 3 "Services" cards and the "Contact Us" banners are automatically pulled from your Services CMS and Contact CMS!
        </p>
      </div>

      {/* PART 1: TEXT & MAIN IMAGES */}
      <form onSubmit={handleSaveSettings} className="bg-[#FFFFFF] p-6 sm:p-10 rounded-2xl shadow-sm border border-[#9C7C3E]/20 space-y-12">
        
        {/* HERO SECTION */}
        <div>
          <h3 className={sectionHeaderStyles}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
            1. Hero Section
          </h3>
          <div className="space-y-5">
            <div>
              <label className={labelStyles}>Hero Title</label>
              <textarea name="heroTitle" defaultValue={settings.heroTitle} required rows={2} className={inputStyles}></textarea>
            </div>
            <div>
              <label className={labelStyles}>Hero Subtitle</label>
              <textarea name="heroSubtitle" defaultValue={settings.heroSubtitle} required rows={3} className={inputStyles}></textarea>
            </div>
            <div className="p-5 border border-[#9C7C3E]/20 rounded-xl bg-[#FDFBF7] flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="relative h-24 w-40 rounded-lg overflow-hidden shadow-md flex-shrink-0 border border-[#9C7C3E]/30">
                <Image src={settings.heroImage} alt="Hero" fill className="object-cover" />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Update Hero Background</label>
                <input type="file" accept="image/*" onChange={(e) => setHeroFile(e.target.files?.[0] || null)} className={fileInputStyles} />
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div>
          <h3 className={sectionHeaderStyles}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
            2. About Section
          </h3>
          <div className="space-y-5">
            <div>
              <label className={labelStyles}>About Title</label>
              <textarea name="aboutTitle" defaultValue={settings.aboutTitle} required rows={2} className={inputStyles}></textarea>
            </div>
            <div>
              <label className={labelStyles}>About Description</label>
              <textarea name="aboutDescription" defaultValue={settings.aboutDescription} required rows={4} className={inputStyles}></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
              <div className="p-5 border border-[#9C7C3E]/20 rounded-xl bg-[#FDFBF7] flex flex-col gap-4">
                <div className="relative h-40 w-full rounded-lg overflow-hidden shadow-md border border-[#9C7C3E]/30">
                  <Image src={settings.aboutImage1} alt="About 1" fill className="object-cover" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Update Top Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setAbout1File(e.target.files?.[0] || null)} className={fileInputStyles} />
                </div>
              </div>
              <div className="p-5 border border-[#9C7C3E]/20 rounded-xl bg-[#FDFBF7] flex flex-col gap-4">
                <div className="relative h-40 w-full rounded-lg overflow-hidden shadow-md border border-[#9C7C3E]/30">
                  <Image src={settings.aboutImage2} alt="About 2" fill className="object-cover" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Update Bottom Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setAbout2File(e.target.files?.[0] || null)} className={fileInputStyles} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div>
          <h3 className={sectionHeaderStyles}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
            3. Statistics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelStyles}>Projects Completed</label>
              <input type="number" name="statsProjects" defaultValue={settings.statsProjects} required className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Customer Satisfaction (%)</label>
              <input type="number" name="statsSatisfaction" defaultValue={settings.statsSatisfaction} required className={inputStyles} />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full bg-[#1A1A1A] text-[#C5A869] py-4 rounded-xl hover:bg-[#C5A869] hover:text-[#1A1A1A] transition-all font-bold disabled:opacity-70 disabled:cursor-not-allowed text-lg shadow-md border border-[#9C7C3E]/30 flex justify-center items-center gap-3 mt-4"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving Updates...
            </>
          ) : (
            "Save Main Home Settings"
          )}
        </button>
      </form>

      {/* PART 2: PARTNER LOGOS MANAGER */}
      <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-2xl shadow-sm border border-[#9C7C3E]/20">
        <h3 className={sectionHeaderStyles}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
          4. Scrolling Partner Logos
        </h3>
        
        {/* Upload Form */}
        <form onSubmit={handleAddLogo} className="bg-[#FDFBF7] p-6 rounded-xl border border-[#9C7C3E]/20 mb-8 flex flex-col md:flex-row items-start md:items-end gap-5">
          <div className="flex-1 w-full">
            <label className={labelStyles}>Company Name</label>
            <input type="text" name="name" required placeholder="e.g. Daikin" className={inputStyles} />
          </div>
          <div className="flex-1 w-full">
            <label className={labelStyles}>Logo Image (PNG transparent)</label>
            <input type="file" accept="image/*" required onChange={(e) => setLogoFile(e.target.files?.[0] || null)} className={fileInputStyles} />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full md:w-auto bg-[#1A1A1A] text-[#C5A869] px-8 py-3.5 rounded-xl hover:bg-[#C5A869] hover:text-[#1A1A1A] transition-all font-bold shadow-md disabled:opacity-70 disabled:cursor-not-allowed border border-[#9C7C3E]/30 whitespace-nowrap"
          >
            {isSubmitting ? "Uploading..." : "+ Add Logo"}
          </button>
        </form>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {logos.length === 0 ? (
            <p className="text-[#9C7C3E] font-medium col-span-4 text-center py-10 bg-[#FDFBF7] rounded-xl border-2 border-dashed border-[#9C7C3E]/30">
              No logos added yet. Add your first partner logo above.
            </p>
          ) : (
            logos.map((logo) => (
              <div key={logo.id} className="border border-[#9C7C3E]/20 rounded-xl p-5 flex flex-col items-center relative group bg-[#FDFBF7] hover:shadow-md hover:border-[#C5A869]/50 transition-all">
                <div className="relative w-full h-20">
                  <Image src={logo.image} alt={logo.name} fill className="object-contain" />
                </div>
                <p className="text-sm text-[#1A1A1A] mt-4 font-bold truncate w-full text-center">{logo.name}</p>
                <button 
                  onClick={() => { 
                    if(window.confirm("Are you sure you want to delete this logo?")) { 
                      deleteClientLogo(logo.id); getClientLogos().then(setLogos); 
                    } 
                  }} 
                  className="absolute -top-3 -right-3 bg-red-500/90 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:scale-110 transition-all shadow-md focus:opacity-100"
                  aria-label="Delete Logo"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}