import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer'; 
import FloatingWhatsApp from '@/components/public/FloatingWhatsApp'; // Adjust this path if necessary

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* The flex-grow class pushes the footer to the bottom if the page content is short */}
      <main className="flex-grow pt-8 lg:pt-8">
        {children}
      </main>
      
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}