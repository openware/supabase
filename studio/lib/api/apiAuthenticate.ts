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

    if (user.role !== 'superadmin') {
      return { error: new Error('Access Denied: User is not Admin ') } as unknown as SupaResponse<User>
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
  const token = req.cookies['sb-access-token']

  if (!token) {
    throw new Error('missing access token')
  }
  let { user: gotrue_user, error: authError } = await getAuthUser(token)
  if (authError) {
    throw authError
  }


  // TODO: logic for identity can be ignored
  // if (gotrue_user !== null) {
  //   gotrue_id = gotrue_user?.id
  //   email = gotrue_user.email

  //   let { identity, error } = getIdentity(gotrue_user)
  //   if (error) throw error
  //   if (identity?.provider !== undefined) {
  //     user_id_auth0 = getAuth0Id(identity?.provider, identity?.id)
  //   }
  // }

  return gotrue_user
}
