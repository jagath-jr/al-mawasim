import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings (Global)',
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  // Globals cannot be deleted by design, fulfilling your data integrity requirement
  fields: [
    {
      name: 'emails',
      type: 'array',
      label: 'Company Email Addresses',
      minRows: 1,
      fields: [{ name: 'email', type: 'email', required: true }],
    },
    {
      name: 'phones',
      type: 'array',
      label: 'Phone Numbers',
      minRows: 1,
      fields: [{ name: 'number', type: 'text', required: true }],
    },
    {
      name: 'address',
      type: 'group',
      label: 'Physical Address',
      fields: [
        { name: 'street', type: 'text', required: true },
        {
          type: 'row',
          fields: [
            { name: 'city', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'state', type: 'text', required: true, admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'zip', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'country', type: 'text', required: true, admin: { width: '50%' } },
          ],
        },
      ],
    },
  ],
}