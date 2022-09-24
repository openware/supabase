import { User } from 'types'

export function isAdmin(profile: User): boolean {
  const admins = ['admin', 'superadmin']
  return admins.includes(profile.role)
}
