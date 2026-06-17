import Hero from '@/components/public/Hero';
import Services from '@/components/public/Services';
import AboutStats from '@/components/public/AboutStats';
import WhyChooseUs from '@/components/public/WhyChooseUs';
import HowItWorks from '@/components/public/HowItWorks';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col font-sans">
      
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. SERVICES CARDS SECTION */}
      <Services />

      {/* 3. ABOUT, STATS & CONTACT BANNER SECTION */}
      <AboutStats />

      {/* 4. WHY CHOOSE US SECTION */}
      <WhyChooseUs />

      {/* 5. PROCESS & LOGO SLIDER SECTION */}
      <HowItWorks />

    </div>
  );
}