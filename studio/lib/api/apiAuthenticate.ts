import type { NextApiRequest, NextApiResponse } from 'next'
import { SupaResponse, User } from 'types'
import { getAuthUser } from 'lib/gotrue'

/**
 * Use this method on api routes to check if user is authenticated and having required permissions.
 * This method can only be used from the server side.
 * Member permission is mandatory whenever orgSlug/projectRef query param exists
 * @param {NextApiRequest}    req
 * @param {NextApiResponse}   res
 * @param {Object}            config      requireUserDetail: bool, requireOwner: bool
 *
 * @returns {Object<user, error, description>}
 *   user null, with error and description if not authenticated or not enough permissions
 */
export async function apiAuthenticate(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<SupaResponse<User>> {
  if (!req) {
    return { error: new Error('Request is not available') } as unknown as SupaResponse<User>
  }

  if (!res) {
    return { error: new Error('Response is not available') } as unknown as SupaResponse<User>
  }

  try {
    const user = await fetchUser(req, res)
    if (!user) {
      return { error: new Error('The user does not exist') } as unknown as SupaResponse<User>
    }

    return user
  } catch (error: any) {
    console.error('Error at apiAuthenticate', error)
    return { error: { message: error.message ?? 'unknown' } } as unknown as SupaResponse<User>
  }
}

/**
 * @returns
 *  user with only id prop or detail object. It depends on requireUserDetail config
 */
async function fetchUser(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  let gotrue_id = null
  let email = null

  const token = req.cookies['sb-access-token']

  if (!token) {
    return res.status(401).end('Unauthorized: missing access token')
  }

  let { user: gotrue_user, error: authError } = await getAuthUser(token)

  if (authError) {
    throw authError
  }

  if (gotrue_user !== null) {
    gotrue_id = gotrue_user?.id
    email = gotrue_user.email
  }

  return gotrue_user
}
