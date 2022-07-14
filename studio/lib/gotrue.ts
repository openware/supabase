import { GoTrueClient } from '@supabase/gotrue-js'
import axios from 'axios'

export const GOTRUE_URL = process.env.NEXT_PUBLIC_GOTRUE_URL || `${process.env.SUPABASE_URL}/auth/v1`

export const auth = new GoTrueClient({
  url: GOTRUE_URL,
  autoRefreshToken: true,
})

const fetchUser = async (accessToken: string) => {
  let url = `${process.env.NEXT_PUBLIC_GOTRUE_URL}/user`

  return await axios.get(
      url,
      {
          headers: {
            "Authorization": `Bearer ${accessToken}`, apikey: process.env.NEXT_PUBLIC_GOTRUE_ANON_KEY
          },
      }).then((res: any) => {
          return res.data
      }).catch(err => {
          const resp = err.request?.response

          return {
              code: resp?.code,
              msg: resp?.msg,
          };
      });
}


export const getAuthUser = async (token: String): Promise<any> => {
  try {
    const user = await fetchUser(String(token));

    return { user, error: null }
  } catch (err) {
    return { user: null, error: err }
  }
}
