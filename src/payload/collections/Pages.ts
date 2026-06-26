import type { CollectionConfig } from 'payload'
import { publishedOnly, canMutatePage, isAdmin } from '../access'
import { formatSlug } from '../hooks/formatSlug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'pageType', '_status'],
  },
  versions: {
    drafts: true,
    maxPerDoc: 20, // Retains 20 versions with undo capabilities
  },
  access: {
    read: publishedOnly,
    create: canMutatePage,
    update: canMutatePage,
    delete: isAdmin, // Only admins can delete
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true, admin: { width: '50%' } },
        { 
          name: 'slug', 
          type: 'text', 
          admin: { width: '50%', position: 'sidebar' },
          hooks: { beforeValidate: [formatSlug('title')] } 
        },
      ],
    },
    {
      name: 'pageType',
      type: 'select',
      required: true,
      options: [
        { label: 'Home Page', value: 'home' },
        { label: 'About Us', value: 'about' },
        { label: 'Services', value: 'services' },
        { label: 'Projects', value: 'projects' },
        { label: 'Sectors', value: 'sectors' },
        { label: 'Contact', value: 'contact' },
      ],
      admin: { position: 'sidebar' },
    },
    
    // --- HOME PAGE FIELDS ---
    {
      name: 'homeConfig',
      type: 'group',
      admin: { condition: (_, siblingData) => siblingData.pageType === 'home' },
      fields: [
        {
          name: 'heroSlider',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'headline', type: 'text', required: true },
            { name: 'subheadline', type: 'text' },
            { name: 'ctaText', type: 'text' },
            { name: 'ctaLink', type: 'text' },
          ],
        },
        {
          name: 'servicesShowcase',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'iconType', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'statistics',
          type: 'group',
          fields: [
            { type: 'row', fields: [
              { name: 'satisfactionScore', type: 'number', admin: { width: '50%' } },
              { name: 'satisfactionLabel', type: 'text', admin: { width: '50%' } },
            ]},
            { type: 'row', fields: [
              { name: 'projectsCompleted', type: 'number', admin: { width: '50%' } },
              { name: 'projectsLabel', type: 'text', admin: { width: '50%' } },
            ]},
            { type: 'row', fields: [
              { name: 'yearsExperience', type: 'number', admin: { width: '50%' } },
              { name: 'yearsLabel', type: 'text', admin: { width: '50%' } },
            ]},
            { type: 'row', fields: [
              { name: 'teamMembers', type: 'number', admin: { width: '50%' } },
              { name: 'teamLabel', type: 'text', admin: { width: '50%' } },
            ]},
          ],
        },
      ],
    },

    // --- ABOUT PAGE FIELDS ---
    {
      name: 'aboutConfig',
      type: 'group',
      admin: { condition: (_, siblingData) => siblingData.pageType === 'about' },
      fields: [
        {
          name: 'missionVision',
          type: 'richText',
        },
        {
          name: 'contentBlocks',
          type: 'blocks',
          blocks: [
            {
              slug: 'text-block',
              fields: [{ name: 'content', type: 'richText' }],
            },
            {
              slug: 'image-text-block',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'content', type: 'richText', required: true },
                { name: 'imagePosition', type: 'radio', options: ['left', 'right'], defaultValue: 'left' },
              ],
            },
            {
              slug: 'team-block',
              fields: [
                {
                  name: 'members',
                  type: 'array',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'role', type: 'text', required: true },
                    { name: 'bio', type: 'textarea' },
                    { name: 'photo', type: 'upload', relationTo: 'media' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // --- SERVICES PAGE FIELDS ---
    {
      name: 'servicesConfig',
      type: 'group',
      admin: { condition: (_, siblingData) => siblingData.pageType === 'services' },
      fields: [
        {
          name: 'mainServices',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'icon', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            {
              name: 'subServices',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'icon', type: 'text' },
              ],
            },
          ],
        },
      ],
    },

    // --- PROJECTS PAGE FIELDS ---
    {
      name: 'projectsConfig',
      type: 'group',
      admin: { condition: (_, siblingData) => siblingData.pageType === 'projects' },
      fields: [
        {
          name: 'projects',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'clientName', type: 'text' },
            { name: 'category', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'featuredImage', type: 'upload', relationTo: 'media' },
            { name: 'gallery', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media' }] },
            { name: 'completionDate', type: 'date' },
            { name: 'testimonial', type: 'textarea' },
          ],
        },
      ],
    },

    // --- SECTORS PAGE FIELDS ---
    {
      name: 'sectorsConfig',
      type: 'group',
      admin: { condition: (_, siblingData) => siblingData.pageType === 'sectors' },
      fields: [
        {
          name: 'sectors',
          type: 'array',
          // Note: arrays in payload are inherently drag-to-reorder in the UI
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'icon', type: 'text' },
            { name: 'featuredImage', type: 'upload', relationTo: 'media' },
            { name: 'order', type: 'number', admin: { description: 'Used for frontend sorting if needed' } },
          ],
        },
      ],
    },

    // --- CONTACT PAGE FIELDS ---
    {
      name: 'contactConfig',
      type: 'group',
      admin: { condition: (_, siblingData) => siblingData.pageType === 'contact' },
      fields: [
        {
          name: 'globalSettingsReminder',
          type: 'ui',
          admin: {
            components: {
              Field: () => {
                // Using a generic function for the copy-paste requirement. 
                // In an actual React component you'd render UI.
                return null; 
              },
            },
            description: 'NOTE: Phone numbers, emails, and address are pulled directly from the Global Site Settings and displayed on the frontend automatically.',
          }
        },
        { name: 'pageIntroduction', type: 'richText' },
        {
          name: 'contactForm',
          type: 'group',
          fields: [
            { name: 'recipientEmail', type: 'email', required: true },
            { name: 'subject', type: 'text', defaultValue: 'New Contact Form Submission' },
            { name: 'successMessage', type: 'text', defaultValue: 'Thank you for reaching out. We will get back to you shortly.' },
          ],
        },
        {
          name: 'map',
          type: 'group',
          fields: [
            { name: 'embedUrl', type: 'text' },
            { name: 'latitude', type: 'number' },
            { name: 'longitude', type: 'number' },
            { name: 'customMarker', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}