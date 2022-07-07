import { NextPage } from 'next'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { NextRouter, useRouter } from 'next/router'
import { useStore, withAuth } from 'hooks'

import Connecting from 'components/ui/Loading'
import { AccountLayout } from 'components/layouts'
import Landing from 'components/interfaces/Home/Landing'

const Home: NextPage = () => {
  const { ui } = useStore()
  const { profile } = ui

  const router = useRouter()

  useEffect(() => {
    if (profile) {
      router.push('/project/default')
    }
  },[profile])

  if (!profile) {
    return <UnauthorizedLanding />
  } else {
    const isRedirect = isRedirectFromThirdPartyService(router)
    if (isRedirect) {
      const queryParams = (router.query as any) || {}
      const params = new URLSearchParams(queryParams)
      if (router.query?.next?.includes('https://vercel.com')) {
        router.push(`/vercel/integrate?${params.toString()}`)
      } else if (router.query?.next?.includes('new-project')) {
        router.push('/new/project')
      } else if (router.query['x-amzn-marketplace-token'] != undefined) {
        router.push(`/account/associate?${params.toString()}`)
      } else if (
        typeof router.query?.next === 'string' &&
        router.query?.next?.startsWith('project/_/')
      ) {
        router.push(router.query.next as string)
      } else {
        router.push('/project/default')
      }
      return <Connecting />
    }
  }

  return (
    <AccountLayout
      title="Supabase"
      // @ts-ignore
      breadcrumbs={[
        {
          key: `supabase-projects`,
          label: 'Projects',
        },
      ]}
    >
    </AccountLayout>
  )
}
export default withAuth(observer(Home))

// detect for redirect from 3rd party service like vercel, aws...
function isRedirectFromThirdPartyService(router: NextRouter) {
  return router.query.next !== undefined || router.query['x-amzn-marketplace-token'] !== undefined
}

const UnauthorizedLanding = () => {
  const router = useRouter()
  const autoLogin = isRedirectFromThirdPartyService(router)

  useEffect(() => {
    // TODO: autologin
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

  return autoLogin ? <Connecting /> : <Landing />
}
