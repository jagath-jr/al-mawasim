"use client";

import { useState } from "react";
import Image from "next/image";
import { loginAction } from "@/actions/auth"; // Import our server action

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await loginAction(formData);

      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles = "mt-1.5 w-full px-4 py-3 border border-[#9C7C3E]/30 rounded-xl text-[#1A1A1A] bg-[#FDFBF7] outline-none focus:ring-2 focus:ring-[#C5A869]/50 focus:border-[#C5A869] transition-all placeholder-gray-400";
  const labelStyles = "block text-sm font-bold text-[#1A1A1A]";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7] p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#C5A869]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#9C7C3E]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#FFFFFF] p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#9C7C3E]/20 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="bg-[#1A1A1A] p-5 rounded-2xl shadow-inner border border-[#9C7C3E]/30">
            <Image src="/AL MAWASIM LOGO (1).png" alt="Logo" width={160} height={45} className="object-contain" priority />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-wide">CMS Portal</h2>
          <p className="text-[#9C7C3E] text-sm mt-1.5 font-medium">Sign in to manage your digital presence</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-6 border border-red-100 flex items-center justify-center gap-2">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className={labelStyles}>Username</label>
            <input name="username" type="text" className={inputStyles} placeholder="admin" required disabled={isLoading} />
          </div>
          <div>
            <label className={labelStyles}>Password</label>
            <input name="password" type="password" className={inputStyles} placeholder="••••••••" required disabled={isLoading} />
          </div>
          
          <button type="submit" disabled={isLoading} className="w-full bg-[#1A1A1A] text-[#C5A869] py-3.5 rounded-xl hover:bg-[#C5A869] hover:text-[#1A1A1A] transition-all font-bold text-lg border border-[#9C7C3E]/30 mt-4 disabled:opacity-70 flex items-center justify-center gap-2">
            {isLoading ? "Authenticating..." : "Sign In to Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}