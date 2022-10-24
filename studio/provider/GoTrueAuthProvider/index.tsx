import { ReactElement, useEffect, useState } from 'react'
import { useHandleDisconnect } from '../../hooks/web3/useHandleDisconnect'
import { useRefreshToken, fetchUser } from '../../hooks/gotrueOpendax'
import { isBrowser } from '../../helpers/isBrowser'
import { useStore } from 'hooks'
import { User } from 'types/base'

interface Props {
  children: ReactElement
}

export const EMPTY_USER = {
  created_at: '',
  email: '',
  email_change_confirm_status: 0,
  id: '',
  last_sign_in_at: '',
  phone: '',
  role: '',
  updated_at: '',
}

export const GoTrueAuthProvider: React.FC<Props> = ({ children }: Props) => {
  const rootStore = useStore()
  const { ui } = rootStore

  const currentSession = isBrowser() && localStorage.getItem('session')
  const session = currentSession && JSON.parse(currentSession)

  const loginStorage = isBrowser() && localStorage.getItem('login_time')

  const [user, setUser] = useState<User>(EMPTY_USER)
  const [loginTime, setLoginTime] = useState<string | undefined>(
    loginStorage ? loginStorage : undefined
  )
  const [expiresIn, setExpiresIn] = useState<string | undefined>(session && session.expires_in)

  const accessToken = session && session.access_token

  const setSessionData = (sessionData: any) => {
    if (sessionData) {
      const updatedSession = {
        access_token: sessionData.access_token,
        refresh_token: sessionData.refresh_token,
        expires_in: sessionData.expires_in,
      }

      setExpiresIn(sessionData.expires_in)

      const loginDateTimestamp = String(new Date().getTime())
      localStorage.setItem('login_time', loginDateTimestamp)
      setLoginTime(loginDateTimestamp)

      localStorage.setItem('session', JSON.stringify(updatedSession))

      setUser(sessionData.user)
      ui.setProfile(sessionData.user)
    }
  }

  useEffect(() => {
    if (!accessToken) {
      if (window.location.pathname.startsWith('/admin')) {
        window.location.pathname = '/trading'
      }
    }

    const setUserToStore = async (accessToken: string) => {
      const user = await fetchUser(accessToken)
      ui.setProfile(user)
    }

    setUserToStore(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (loginTime && expiresIn) {
      const timeBeforeRefresh = +loginTime + +expiresIn * 1000 - new Date().getTime()
      if (timeBeforeRefresh >= 0) {
        const interval = setInterval(() => {
          const currentSession = isBrowser() && localStorage.getItem('session')
          const session = currentSession && JSON.parse(currentSession)
          const refreshToken = session && session.refresh_token

          if (refreshToken && refreshToken !== 'undefined') {
            useRefreshToken(refreshToken, setSessionData)
          }
        }, timeBeforeRefresh)

        return () => clearInterval(interval)
      }
    }
  }, [loginTime, expiresIn])

  useHandleDisconnect(Boolean(user.id))

  return children
}
