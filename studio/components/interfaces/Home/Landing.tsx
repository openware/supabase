import Image from 'next/image'
import Head from 'next/head'
import { observer } from 'mobx-react-lite'
import { AccountButtonWidget } from '../../opendax/AccountButton'

import { useStore } from 'hooks'

const Landing = () => {
  const { ui } = useStore()
  const { theme, profile } = ui

  return (
    <div className="z-10 relative h-screen flex flex-col">
      <Head>
        <title>Supabase</title>
      </Head>
      <div className="sticky top-0 w-full max-w-7xl mx-auto pt-6 px-8 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-betwe qqwqen sm:h-10">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="https://supabase.com">
                <Image
                  src={theme == 'dark' ? '/img/supabase-dark.svg' : '/img/supabase-light.svg'}
                  alt=""
                  height={24}
                  width={120}
                />
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex items-center justify-center mx-auto h-full max-w-screen-xl px-8">
        <div className="sm:text-center">
          <h1 className="text-3xl sm:max-w-2xl sm:mx-auto md:mt-5 mb-10">
            <span className="text-text-color-100">Opendax admin</span>
          </h1>
          {profile && profile?.role !== 'superadmin' &&
          <p className="text-red-900 text-base sm:mx-auto sm:max-w-2xl md:mb-5">
            Access Denied: User is not Admin 
          </p>}

          <div className="sm:justify-center flex items-center gap-2">
            <AccountButtonWidget buttonClassNames="w-[150px] inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-cta-layer-color-60 duration-200 bg-primary-cta-color-60 hover:bg-primary-cta-color-80 active:bg-primary-cta-color-90" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Landing)
