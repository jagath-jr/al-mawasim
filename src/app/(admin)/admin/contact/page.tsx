"use client";

import { useState, useEffect } from "react";
import { getContactSettings, updateContactSettings } from "@/actions/contact";
import Image from "next/image";

export default function AdminContactPage() {
  const [settings, setSettings] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [officeFile, setOfficeFile] = useState<File | null>(null);

  useEffect(() => {
    getContactSettings().then(setSettings);
  }, []);

  if (!settings) return (
    <div className="p-10 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-4 border-[#C5A869] border-t-transparent rounded-full animate-spin mb-4"></div>
      <div className="text-[#9C7C3E] font-medium tracking-wide animate-pulse">Loading settings...</div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      let heroUrl = settings.heroImage;
      let officeUrl = settings.officeImage;

      if (heroFile) {
        const uploadData = new FormData();
        uploadData.append("file", heroFile);
        const res = await fetch("/api/upload", { method: "POST", body: uploadData });
        heroUrl = (await res.json()).url;
      }

      if (officeFile) {
        const uploadData = new FormData();
        uploadData.append("file", officeFile);
        const res = await fetch("/api/upload", { method: "POST", body: uploadData });
        officeUrl = (await res.json()).url;
      }

      await updateContactSettings({
        formTitle: formData.get("formTitle"),
        formText: formData.get("formText"),
        address: formData.get("address"),
        email: formData.get("email"),
        phone1: formData.get("phone1"),
        phone2: formData.get("phone2"),
        workingHours: formData.get("workingHours"),
        heroImage: heroUrl,
        officeImage: officeUrl,
        // NEW FIELDS
        footerText: formData.get("footerText"),
        whatsapp: formData.get("whatsapp"),
        instagram: formData.get("instagram"),
        facebook: formData.get("facebook"),
        tiktok: formData.get("tiktok"),
        youtube: formData.get("youtube"),
        linkedin: formData.get("linkedin"),
        xUrl: formData.get("xUrl"),
      });

      alert("Contact & Footer settings updated successfully!");
    } catch (err) {
      alert("Failed to update settings.");
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
          <h2 className="text-3xl font-bold text-white">Contact & Footer Settings</h2>
          <p className="text-gray-300 mt-2 text-sm max-w-xl leading-relaxed">
            Update your public contact information, social media links, and global footer content to ensure clients can easily reach you.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FFFFFF] p-6 sm:p-10 rounded-2xl shadow-sm border border-[#9C7C3E]/20 space-y-12">
        
        {/* TEXT DETAILS */}
        <div>
          <h3 className={sectionHeaderStyles}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
            Contact Form Details
          </h3>
          <div className="space-y-5">
            <div>
              <label className={labelStyles}>Form Headline</label>
              <input type="text" name="formTitle" defaultValue={settings.formTitle} required className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Form Introduction Text</label>
              <textarea name="formText" defaultValue={settings.formText} required rows={4} className={inputStyles}></textarea>
            </div>
          </div>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className={sectionHeaderStyles}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
            Company Contact Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelStyles}>Email Address</label>
              <input type="email" name="email" defaultValue={settings.email} required className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Working Hours</label>
              <input type="text" name="workingHours" defaultValue={settings.workingHours} required className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Primary Phone</label>
              <input type="text" name="phone1" defaultValue={settings.phone1} required className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Secondary Phone (Optional)</label>
              <input type="text" name="phone2" defaultValue={settings.phone2} className={inputStyles} />
            </div>
            <div className="md:col-span-2">
              <label className={labelStyles}>Office Address</label>
              <textarea name="address" defaultValue={settings.address} required rows={3} className={inputStyles}></textarea>
            </div>
          </div>
        </div>
                
        {/* IMAGES */}
        <div>
          <h3 className={sectionHeaderStyles}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
            Page Images
          </h3>
          <div className="space-y-6">
            <div className="p-5 border border-[#9C7C3E]/20 rounded-xl bg-[#FDFBF7] flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="relative h-24 w-40 rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-gray-200 border border-[#9C7C3E]/30">
                 <Image src={settings.heroImage} alt="Hero" fill className="object-cover" />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Update Background Hero Image</label>
                <input type="file" accept="image/*" onChange={(e) => setHeroFile(e.target.files?.[0] || null)} className={fileInputStyles} />
              </div>
            </div>

            <div className="p-5 border border-[#9C7C3E]/20 rounded-xl bg-[#FDFBF7] flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="relative h-24 w-40 rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-gray-200 border border-[#9C7C3E]/30">
                 <Image src={settings.officeImage} alt="Office" fill className="object-cover" />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Update Office Image</label>
                <input type="file" accept="image/*" onChange={(e) => setOfficeFile(e.target.files?.[0] || null)} className={fileInputStyles} />
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA & FOOTER */}
        <div>
          <h3 className={sectionHeaderStyles}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />
            Footer & Social Media Links
          </h3>
          <div className="space-y-5">
            <div>
              <label className={labelStyles}>Footer About Text</label>
              <textarea name="footerText" defaultValue={settings.footerText} required rows={3} className={inputStyles}></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 bg-[#FDFBF7] rounded-xl border border-[#9C7C3E]/20">
              <div>
                <label className={labelStyles}>WhatsApp Link</label>
                <input type="text" name="whatsapp" defaultValue={settings.whatsapp} className={inputStyles} placeholder="https://wa.me/..." />
              </div>
              <div>
                <label className={labelStyles}>Instagram Link</label>
                <input type="text" name="instagram" defaultValue={settings.instagram} className={inputStyles} placeholder="https://instagram.com/..." />
              </div>
              <div>
                <label className={labelStyles}>Facebook Link</label>
                <input type="text" name="facebook" defaultValue={settings.facebook} className={inputStyles} placeholder="https://facebook.com/..." />
              </div>
              <div>
                <label className={labelStyles}>TikTok Link</label>
                <input type="text" name="tiktok" defaultValue={settings.tiktok} className={inputStyles} placeholder="https://tiktok.com/..." />
              </div>
              <div>
                <label className={labelStyles}>YouTube Link</label>
                <input type="text" name="youtube" defaultValue={settings.youtube} className={inputStyles} placeholder="https://youtube.com/..." />
              </div>
              <div>
                <label className={labelStyles}>LinkedIn Link</label>
                <input type="text" name="linkedin" defaultValue={settings.linkedin} className={inputStyles} placeholder="https://linkedin.com/in/..." />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyles}>X (Twitter) Link</label>
                <input type="text" name="xUrl" defaultValue={settings.xUrl} className={inputStyles} placeholder="https://x.com/..." />
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
            "Save All Contact Settings"
          )}
        </button>
      </form>
    </div>
  );
}