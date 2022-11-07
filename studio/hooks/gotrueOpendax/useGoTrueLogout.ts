import axios from 'axios'

// TODO: unused request (move to BE)
export const useGoTrueLogout = async () => {
  const currentSession = typeof window !== 'undefined' && localStorage.getItem('session')
  const session = currentSession && JSON.parse(currentSession)
  const accessToken = session && session.access_token

  axios
    .post(
      `${process.env.NEXT_PUBLIC_GOTRUE_URL}/logout`,
      {},
      {
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response: any) => {
      localStorage && localStorage.removeItem('session')
      if (process.env.NEXT_PUBLIC_IS_DEV_MODE) {
        document.cookie = 'sb-access-token=; Max-Age=0'
      }
    })
    .catch((err) => {
      console.log('Refresh token error:', err)
    })
}
