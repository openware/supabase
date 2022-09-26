import { ethers } from 'ethers'
import { isBrowser } from '../../helpers/isBrowser'
import useDApp from './useDApp'

let logoutInitiated = false

export const useHandleDisconnect = async (isActiveSession: boolean) => {
  if (isBrowser()) {
    const { disconnect } = useDApp()
    const { ethereum } = window as any
    if (ethereum) {
      var provider = new ethers.providers.Web3Provider(ethereum)
    }

    const isMetaMaskConnected = async () => {
      const accounts = await provider.listAccounts()
      return accounts.length > 0
    }

    await isMetaMaskConnected()
      .then((connected) => {
        if (connected) {
          logoutInitiated = false
          return true
        } else {
          if (isActiveSession && !logoutInitiated) {
            logoutInitiated = true
            disconnect()
          }

          return false
        }
      })
      .catch((err) => {
        return err
      })
  }
}
