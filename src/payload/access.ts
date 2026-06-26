import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin')
}

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin' || user?.role === 'editor')
}

export const canMutatePage: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') return true
  if (user?.role === 'editor') return true // Editors can update/create, but delete is disabled on the collection level
  return false
}

export const publishedOnly: Access = ({ req: { user } }) => {
  if (user?.role === 'admin' || user?.role === 'editor') {
    return true
  }
  return {
    _status: {
      equals: 'published',
    },
  }
}