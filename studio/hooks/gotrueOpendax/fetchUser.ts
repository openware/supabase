import axios from 'axios'

export const fetchUser = async (accessToken: string) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_GOTRUE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: process.env.NEXT_PUBLIC_GOTRUE_ANON_KEY,
      },
    })
    .then((res: any) => {
      return res.data
    })
    .catch((err) => {
      const resp = err.request?.response

      localStorage && localStorage.removeItem('APP_CONNECT_CACHED_PROVIDER')

      return {
        code: resp?.code,
        msg: resp?.msg,
      }
    })
}
