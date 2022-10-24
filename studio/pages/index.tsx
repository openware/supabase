import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { toJS } from 'mobx'

import { NextPageWithLayout } from 'types'
import { useStore, withAuth } from 'hooks'

import Connecting from 'components/ui/Loading'
import { AccountLayoutWithoutAuth } from 'components/layouts'
import Landing from 'components/interfaces/Home/Landing'
import { isAdmin } from 'helpers/isAdmin'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Connecting />
    </>
  )
}

Home.getLayout = (page) => <IndexLayout>{page}</IndexLayout>

export default observer(Home)

// detect for redirect from 3rd party service like vercel, aws...
// const isRedirectFromThirdPartyService = (router: NextRouter) => router.query.next !== undefined

const UnauthorizedLanding = () => {
  useEffect(() => {
    // TODO: autoLogin
    // if (autoLogin) {
    //   const queryParams = (router.query as any) || {}
    //   const params = new URLSearchParams(queryParams)
    //   // trigger github signIn
    //   auth.signIn(
    //     { provider: 'github' },
    //     {
    //       redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}?${params.toString()}`,
    //     }
    //   )
    // }
  }, [])

  return <Landing />
}

const IndexLayout = withAuth(
  observer(({ children }) => {
    const { ui } = useStore()
    const router = useRouter()
    const profile = toJS(ui.profile)

    useEffect(() => {
      if (profile && isAdmin(profile)) {
        router.push('/project/default')
      }
    }, [profile])

    if (!profile || !isAdmin(profile)) {
      return <UnauthorizedLanding />
    }

    return (
      <AccountLayoutWithoutAuth
        title="Opendax"
        breadcrumbs={[
          {
            key: `opendax-projects`,
            label: 'Projects',
          },
        ]}
      >
        {children}
      </AccountLayoutWithoutAuth>
    )
  })
)
