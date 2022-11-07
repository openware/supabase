import { GoTrueClient } from '@supabase/gotrue-js'
import axios from 'axios'

export const GOTRUE_URL = `${process.env.GOTRUE_URL}`

export const auth = new GoTrueClient({
  url: GOTRUE_URL,
  autoRefreshToken: true,
})

const fetchUser = async (accessToken: string) => {
  let url = `${GOTRUE_URL}/user`

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: process.env.SUPABASE_ANON_KEY,
      },
    })
    .then((res: any) => {
      return res.data
    })
    .catch((err) => {
      const resp = err.request?.response

      return {
        code: resp?.code,
        msg: resp?.msg,
      }
    })
}

export const getAuthUser = async (token: String): Promise<any> => {
  try {
    console.log('>> REQUEST: getAuthUser')
    const user = await fetchUser(String(token))
    return { user, error: null }
  } catch (err) {
    return { user: null, error: err }
  }
}
