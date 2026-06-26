import { getPayload } from 'payload';
import configPromise from '@/payload.config'; // Adjust path if your config is located elsewhere
import ContactClient from './ContactClient';

export default async function ContactPage() {
  // 1. Initialize Payload securely on the server
  const payload = await getPayload({ config: configPromise });
  
  let contactData = null;
  let siteSettings = null;

  try {
    // 2. Fetch the specific page document where pageType is 'contact'
    const pages = await payload.find({
      collection: 'pages',
      where: {
        pageType: { equals: 'contact' },
      },
      limit: 1,
    });

    if (pages.docs.length > 0) {
      contactData = pages.docs[0];
    }

    // 3. Fetch the Global Site Settings for the dynamic contact info
    siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    });
  } catch (error) {
    console.error('Failed to fetch Contact Page data:', error);
  }

  // 4. Pass the fetched data down to the Client Component
  return <ContactClient initialData={contactData} siteSettings={siteSettings} />;
}