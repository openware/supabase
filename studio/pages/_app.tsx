import 'styles/main.scss'
import 'styles/editor.scss'
import 'styles/ui.scss'
import 'styles/storage.scss'
import 'styles/stripe.scss'
import 'styles/toast.scss'
import 'styles/code.scss'
import 'styles/monaco.scss'
import 'styles/contextMenu.scss'

import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RootStore } from 'stores'
import { StoreProvider } from 'hooks'
import { getParameterByName } from 'lib/common/fetch'
import { GOTRUE_ERRORS } from 'lib/constants'
import { GoTrueAuthProvider } from '../provider/GoTrueAuthProvider';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

import { PortalToast, GoTrueWrapper, RouteValidationWrapper } from 'components/interfaces/App'
import PageTelemetry from 'components/ui/PageTelemetry'
import FlagProvider from 'components/ui/Flag/FlagProvider'

function MyApp({ Component, pageProps }: AppProps) {
  const [rootStore] = useState(() => new RootStore())
  const router = useRouter()

  useEffect(() => {
    const errorDescription = getParameterByName('error_description', router.asPath)
    if (errorDescription === GOTRUE_ERRORS.UNVERIFIED_GITHUB_USER) {
      rootStore.ui.setNotification({
        category: 'error',
        message:
          'Please verify your email on GitHub first, then reach out to us at support@supabase.io to log into the dashboard',
      })
    }
  }, [])

  function getLibrary(provider: any): ethers.providers.Web3Provider {
    const library = new ethers.providers.Web3Provider(provider, 'any');
    library.pollingInterval = 12000;
    return library;
}

  return (
    <StoreProvider rootStore={rootStore}>
      <FlagProvider>
        <Head>
          <title>Supabase</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" type="text/css" href="/admin/css/fonts.css" />
        </Head>
        <GoTrueWrapper>
          <PageTelemetry>
            <RouteValidationWrapper>
              <Web3ReactProvider getLibrary={getLibrary}>
                <GoTrueAuthProvider>
                    <Component {...pageProps} />
                </GoTrueAuthProvider>
              </Web3ReactProvider>
            </RouteValidationWrapper>
          </PageTelemetry>
        </GoTrueWrapper>
        <PortalToast />
      </FlagProvider>
    </StoreProvider>
  )
}
export default MyApp
