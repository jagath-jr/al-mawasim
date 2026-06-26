import { getPayload } from 'payload';
import configPromise from '@/payload.config'; // Adjust path if your config is located elsewhere
import ServicesClient from './ServicesClient';

export default async function ServicesPage() {
  // 1. Initialize Payload securely on the server
  const payload = await getPayload({ config: configPromise });
  
  let servicesData = null;

  // 2. Fetch the specific page document where pageType is 'services'
  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        pageType: { equals: 'services' },
      },
      limit: 1,
    });

    if (pages.docs.length > 0) {
      servicesData = pages.docs[0];
    }
  } catch (error) {
    console.error('Failed to fetch Services Page data:', error);
  }

  // 3. Pass the fetched data down to the Client Component
  return <ServicesClient initialData={servicesData} />;
}