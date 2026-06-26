import { getPayload } from 'payload';
import configPromise from '@/payload.config'; // Adjust path if your config is located elsewhere
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage() {
  // 1. Initialize Payload securely on the server
  const payload = await getPayload({ config: configPromise });
  
  let projectsData = null;

  // 2. Fetch the specific page document where pageType is 'projects'
  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        pageType: { equals: 'projects' },
      },
      limit: 1,
    });

    if (pages.docs.length > 0) {
      projectsData = pages.docs[0];
    }
  } catch (error) {
    console.error('Failed to fetch Projects Page data:', error);
  }

  // 3. Pass the fetched data down to the Client Component
  return <ProjectsClient initialData={projectsData} />;
}