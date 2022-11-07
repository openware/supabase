import axios from 'axios'

// TODO: unused request (move to BE)
export const useRefreshToken = async (refreshToken: string, setSessionData: any) => {
  axios
    .post(
      `${process.env.NEXT_PUBLIC_GOTRUE_URL}/token?grant_type=refresh_token`,
      {
        refresh_token: refreshToken,
      },
      {
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY,
          'x-use-cookie': 'expire',
        },
      }
    )
    .then((response: any) => {
      if (process.env.NEXT_PUBLIC_IS_DEV_MODE) {
        document.cookie = `sb-access-token=${response.data.access_token}; max-age=${response.data.expires_in}; path=/;secure;`
      }
      setSessionData(response.data)
    })
    .catch((err) => {
      const resp = JSON.parse(err.request?.response)
      if (process.env.NEXT_PUBLIC_IS_DEV_MODE) {
        document.cookie = 'sb-access-token=; Max-Age=0'
      }
      localStorage && localStorage.removeItem('APP_CONNECT_CACHED_PROVIDER')
      window && window.dispatchEvent(new Event('metamaskInjectionUpdated'))

      localStorage && localStorage.removeItem('session')
    })
}
