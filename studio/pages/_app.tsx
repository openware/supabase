import 'styles/main.scss'
import 'styles/editor.scss'
import 'styles/ui.scss'
import 'styles/storage.scss'
import 'styles/stripe.scss'
import 'styles/toast.scss'
import 'styles/code.scss'
import 'styles/monaco.scss'
import 'styles/contextMenu.scss'
import 'styles/react-data-grid-logs.scss'
import 'styles/date-picker.scss'
import 'styles/grid.scss'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import Head from 'next/head'
import { AppPropsWithLayout } from 'types'

import { useState } from 'react'
import { RootStore } from 'stores'
import { StoreProvider } from 'hooks'

import { PortalToast, AppBannerWrapper } from 'components/interfaces/App'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [rootStore] = useState(() => new RootStore())

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <StoreProvider rootStore={rootStore}>
      <Head>
        <title>Opendax</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" type="text/css" href="/admin/css/fonts.css" />
      </Head>
        <AppBannerWrapper>{getLayout(<Component {...pageProps} />)}</AppBannerWrapper>
      <PortalToast />
    </StoreProvider>
  )
}
export default MyApp
