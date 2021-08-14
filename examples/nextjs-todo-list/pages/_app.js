import { Auth } from '@supabase/ui'
import { superbase } from '../lib/initSupabase'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <Auth.UserContextProvider supabaseClient={superbase}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  )
}
