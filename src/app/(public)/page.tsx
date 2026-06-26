import { getPayload } from 'payload';
import configPromise from '@/payload.config'; // Adjust path if your config is located elsewhere
import HomeClient from './HomeClient';

export default async function HomePage() {
  // 1. Initialize Payload securely on the server
  const payload = await getPayload({ config: configPromise });

  let homeData = null;

  // 2. Fetch the specific page document where pageType is 'home'
  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        pageType: { equals: 'home' },
      },
      limit: 1,
    });

    if (pages.docs.length > 0) {
      homeData = pages.docs[0];
    }
  } catch (error) {
    console.error('Failed to fetch Home Page data:', error);
  }

  // 3. Pass the fetched data down to the Client Component
  return <HomeClient initialData={homeData} />;
}