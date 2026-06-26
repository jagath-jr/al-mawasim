import { getPayload } from 'payload';
import configPromise from '@/payload.config'; // Adjust path if your config is elsewhere
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  // 1. Initialize Payload securely on the server
  const payload = await getPayload({ config: configPromise });
  
  let siteSettings = null;
  
  // 2. Fetch the Site Settings from Payload
  try {
    siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    });
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
  }

  // 3. Extract the first email and phone number for the Navbar
  const navbarSettings = {
    email: siteSettings?.emails?.[0]?.email,
    phone: siteSettings?.phones?.[0]?.number,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={navbarSettings} />
      
      {/* The flex-grow class pushes the footer to the bottom if the page content is short */}
      <main className="flex-grow pt-8 lg:pt-8">
        {children}
      </main>
      
      <Footer settings={siteSettings} />
    </div>
  );
}