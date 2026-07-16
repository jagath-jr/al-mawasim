"use client";

import { useState, useEffect } from "react";
import { getAboutSettings, updateAboutSettings } from "@/actions/about";
import Image from "next/image";

export default function AdminAboutPage() {
  const [settings, setSettings] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // File inputs
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [grid1File, setGrid1File] = useState<File | null>(null);
  const [grid2File, setGrid2File] = useState<File | null>(null);
  const [servicesFile, setServicesFile] = useState<File | null>(null);

  useEffect(() => {
    getAboutSettings().then(setSettings);
  }, []);

  if (!settings) return (
    <div className="p-10 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-4 border-[#C5A869] border-t-transparent rounded-full animate-spin mb-4"></div>
      <div className="text-[#9C7C3E] font-medium tracking-wide animate-pulse">Loading settings...</div>
    </div>
  );

  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      let heroUrl = settings.heroImage;
      let grid1Url = settings.gridImage1;
      let grid2Url = settings.gridImage2;
      let servicesUrl = settings.servicesImage;

      // Upload Helper using our secure API Route
      const upload = async (file: File) => {
        const data = new FormData(); data.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: data });
        if (!res.ok) throw new Error("Upload Failed");
        return (await res.json()).url;
      };

      if (heroFile) heroUrl = await upload(heroFile);
      if (grid1File) grid1Url = await upload(grid1File);
      if (grid2File) grid2Url = await upload(grid2File);
      if (servicesFile) servicesUrl = await upload(servicesFile);

      await updateAboutSettings({
        heroTitle: formData.get("heroTitle"),
        heroSubtitle: formData.get("heroSubtitle"),
        welcomeBadge: formData.get("welcomeBadge"),
        welcomeTitle: formData.get("welcomeTitle"),
        welcomeText: formData.get("welcomeText"),
        statsProjects: parseInt(formData.get("statsProjects") as string) || 0,
        statsSatisfaction: parseInt(formData.get("statsSatisfaction") as string) || 0,
        reasonsBadge: formData.get("reasonsBadge"),
        reasonsTitle: formData.get("reasonsTitle"),
        reasonsText: formData.get("reasonsText"),
        servicesBadge: formData.get("servicesBadge"),
        servicesTitle: formData.get("servicesTitle"),
        servicesText: formData.get("servicesText"),
        heroImage: heroUrl,
        gridImage1: grid1Url,
        gridImage2: grid2Url,
        servicesImage: servicesUrl,
      });

      alert("About settings updated successfully!");
    } catch (err: any) {
      alert(`Failed to update settings: ${err.message}`);
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
            Content Management
          </span>
          <h2 className="text-3xl font-bold text-white">About Page Settings</h2>
          <p className="text-gray-300 mt-2 text-sm max-w-xl leading-relaxed">
            Update text, statistics, and showcase images for your public About Us page to ensure your company profile is accurate and engaging.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <form onSubmit={handleSaveSettings} className="bg-[#FFFFFF] p-6 sm:p-10 rounded-2xl shadow-sm border border-[#9C7C3E]/20 space-y-12">
        
        {/* HERO SECTION */}
        <div>
          <h3 className={sectionHeaderStyles}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
            1. Hero Section
          </h3>
          <div className="space-y-5">
            <div>
              <label className={labelStyles}>Title</label>
              <input type="text" name="heroTitle" defaultValue={settings.heroTitle} required className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Subtitle</label>
              <textarea name="heroSubtitle" defaultValue={settings.heroSubtitle} required rows={2} className={inputStyles}></textarea>
            </div>
            <div className="p-5 border border-[#9C7C3E]/20 rounded-xl bg-[#FDFBF7] flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="relative h-24 w-40 shrink-0 rounded-lg overflow-hidden shadow-md bg-gray-200 border border-[#9C7C3E]/30">
                <Image src={settings.heroImage} alt="Hero" fill className="object-cover" />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Update Hero Background</label>
                <input type="file" accept="image/*" onChange={(e) => setHeroFile(e.target.files?.[0] || null)} className={fileInputStyles} />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: WELCOME & GRID */}
        <div>
          <h3 className={sectionHeaderStyles}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
            2. Welcome Section
          </h3>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelStyles}>Small Badge</label>
                <input type="text" name="welcomeBadge" defaultValue={settings.welcomeBadge} required className={inputStyles} />
              </div>
              <div>
                <label className={labelStyles}>Heading</label>
                <input type="text" name="welcomeTitle" defaultValue={settings.welcomeTitle} required className={inputStyles} />
              </div>
            </div>
            <div>
              <label className={labelStyles}>Main Description</label>
              <textarea name="welcomeText" defaultValue={settings.welcomeText} required rows={5} className={inputStyles}></textarea>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="p-5 border border-[#9C7C3E]/20 rounded-xl bg-[#FDFBF7] flex flex-col gap-4">
                <div className="relative h-40 w-full rounded-lg overflow-hidden shadow-md bg-gray-200 border border-[#9C7C3E]/30">
                  <Image src={settings.gridImage1} alt="Grid 1" fill className="object-cover" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Update Grid Image 1</label>
                  <input type="file" accept="image/*" onChange={(e) => setGrid1File(e.target.files?.[0] || null)} className={fileInputStyles} />
                </div>
              </div>
              
              <div className="p-5 border border-[#9C7C3E]/20 rounded-xl bg-[#FDFBF7] flex flex-col gap-4">
                <div className="relative h-40 w-full rounded-lg overflow-hidden shadow-md bg-gray-200 border border-[#9C7C3E]/30">
                  <Image src={settings.gridImage2} alt="Grid 2" fill className="object-cover" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Update Grid Image 2</label>
                  <input type="file" accept="image/*" onChange={(e) => setGrid2File(e.target.files?.[0] || null)} className={fileInputStyles} />
                </div>
              </div>
              
              <div>
                <label className={labelStyles}>Projects Completed Counter</label>
                <input type="number" name="statsProjects" defaultValue={settings.statsProjects} required className={inputStyles} />
              </div>
              <div>
                <label className={labelStyles}>Customer Satisfaction (%)</label>
                <input type="number" name="statsSatisfaction" defaultValue={settings.statsSatisfaction} required className={inputStyles} />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: WHY CHOOSE US */}
        <div>
          <h3 className={sectionHeaderStyles}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
            3. Why Choose Us Section
          </h3>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelStyles}>Small Badge</label>
                <input type="text" name="reasonsBadge" defaultValue={settings.reasonsBadge} required className={inputStyles} />
              </div>
              <div>
                <label className={labelStyles}>Heading</label>
                <input type="text" name="reasonsTitle" defaultValue={settings.reasonsTitle} required className={inputStyles} />
              </div>
            </div>
            <div>
              <label className={labelStyles}>Description</label>
              <textarea name="reasonsText" defaultValue={settings.reasonsText} required rows={4} className={inputStyles}></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 3: SERVICES PROCESS */}
        <div>
          <h3 className={sectionHeaderStyles}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
            4. Services Process Section
          </h3>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelStyles}>Small Badge</label>
                <input type="text" name="servicesBadge" defaultValue={settings.servicesBadge} required className={inputStyles} />
              </div>
              <div>
                <label className={labelStyles}>Heading</label>
                <input type="text" name="servicesTitle" defaultValue={settings.servicesTitle} required className={inputStyles} />
              </div>
            </div>
            <div>
              <label className={labelStyles}>Description</label>
              <textarea name="servicesText" defaultValue={settings.servicesText} required rows={4} className={inputStyles}></textarea>
            </div>
            
            <div className="p-5 border border-[#9C7C3E]/20 rounded-xl bg-[#FDFBF7] flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="relative h-32 w-48 shrink-0 rounded-lg overflow-hidden shadow-md bg-gray-200 border border-[#9C7C3E]/30">
                <Image src={settings.servicesImage} alt="Services" fill className="object-cover" />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Update Display Image</label>
                <input type="file" accept="image/*" onChange={(e) => setServicesFile(e.target.files?.[0] || null)} className={fileInputStyles} />
              </div>
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
            "Save About Page Settings"
          )}
        </button>
      </form>
    </div>
  );
}