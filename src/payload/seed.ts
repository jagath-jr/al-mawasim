import { getPayload } from 'payload'
import configPromise from '../payload.config'

export const seed = async () => {
  const payload = await getPayload({ config: configPromise })

  payload.logger.info('Seeding database...')

  // 1. Create Admin User
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@company.com',
      password: 'password123',
      role: 'admin',
    },
  })

  // 2. Populate Site Settings
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      emails: [{ email: 'contact@company.com' }],
      phones: [{ number: '+1-555-0123' }],
      address: {
        street: '123 Business Rd',
        city: 'Metropolis',
        state: 'NY',
        zip: '10001',
        country: 'USA',
      },
    },
  })

  // 3. Create Home Page Draft
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      pageType: 'home',
      _status: 'published',
      homeConfig: {
        statistics: {
          satisfactionScore: 99,
          satisfactionLabel: 'Client Satisfaction',
          projectsCompleted: 150,
          projectsLabel: 'Projects Delivered',
          yearsExperience: 10,
          yearsLabel: 'Years in Industry',
          teamMembers: 45,
          teamLabel: 'Experts on Staff',
        },
      },
    },
  })

  payload.logger.info('Database seeded!')
}