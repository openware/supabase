import { User } from 'types'

export function isAdmin(profile: User): boolean {
  const admins = ['admin', 'superadmin', 'writer']
  return admins.includes(profile.role)
}
