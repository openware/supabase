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
    // if (isAccessDenied && window.location.pathname.startsWith('/admin')) {
    //   window.location.pathname = '/trading'
    // }
  }, [])

  return (
    <div>loading...</div>
  )
}

export default observer(Landing)
