import { getPayload } from 'payload';
import configPromise from '@/payload.config'; // Adjust path if necessary
import AboutClient from './AboutClient';

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise });
  let aboutData = null;

  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        pageType: { equals: 'about' },
      },
      limit: 1,
    });

    if (pages.docs.length > 0) {
      aboutData = pages.docs[0];
    }
  } catch (error) {
    console.error('Failed to fetch About Page data:', error);
  }

  return <AboutClient initialData={aboutData} />;
}