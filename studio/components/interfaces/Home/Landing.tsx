import { useEffect } from 'react'
import Head from 'next/head'
import { observer } from 'mobx-react-lite'

import { useStore } from 'hooks'
import { isAdmin } from 'helpers/isAdmin'

const Landing = () => {
  const { ui } = useStore()
  const { profile } = ui
  const isAccessDenied = profile && !isAdmin(profile)

  useEffect(() => {
    if (isAccessDenied && window.location.pathname.startsWith('/admin')) {
      window.location.pathname = '/trading'
    }
  }, [])

  return (
    <div className="z-10 relative h-screen flex flex-col">
      <Head>
        <title>Supabase</title>
      </Head>
      <div className="flex items-center justify-center mx-auto h-full max-w-screen-xl px-8">
        <div className="sm:text-center">
          <h1 className="text-3xl sm:max-w-2xl sm:mx-auto md:mt-5 mb-10">
            <span className="text-3xl">Opendax admin</span>
          </h1>
          {isAccessDenied && (
            <p className="text-red-900 text-base sm:mx-auto sm:max-w-2xl md:mb-5">
              Access Denied: User is not Admin
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default observer(Landing)
