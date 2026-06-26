import { getPayload } from 'payload';
import configPromise from '@/payload.config'; // Adjust path if your config is located elsewhere
import SectorsClient from './SectorsClient';

export default async function SectorPage() {
  // 1. Initialize Payload securely on the server
  const payload = await getPayload({ config: configPromise });
  
  let sectorsData = null;

  // 2. Fetch the specific page document where pageType is 'sectors'
  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        pageType: { equals: 'sectors' },
      },
      limit: 1,
    });

    if (pages.docs.length > 0) {
      sectorsData = pages.docs[0];
    }
  } catch (error) {
    console.error('Failed to fetch Sectors Page data:', error);
  }

  // 3. Pass the fetched data down to the Client Component
  return <SectorsClient initialData={sectorsData} />;
}