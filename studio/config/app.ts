import fallbackConfig from './fallbackConfig'
import { AppConfig } from './utils'
import { isBrowser } from '../helpers/isBrowser'

const domains = ['storybook-odax-master.v4.uat.opendax.app', 'web-sdk.openware.com']

export const getConfigs = (): AppConfig => {
  if (!isBrowser()) {
    return fallbackConfig
  }
  const appConfigs = localStorage.getItem('app_config')

  const savedConfig =
    (appConfigs &&
      appConfigs !== undefined &&
      appConfigs !== 'undefined' &&
      JSON.parse(appConfigs)) ||
    {}

  if (savedConfig) {
    if (isBrowser() && window.location.host.includes(domains[0])) {
      savedConfig.goTrueUrl = 'https://storybook-odax-master.v4.uat.opendax.app/api/v1/auth'
      savedConfig.finexUrl = 'wss://storybook-odax-master.v4.uat.opendax.app/api/v1/finex/ws'
    }

    if (isBrowser() && window.location.host.includes(domains[1])) {
      savedConfig.goTrueUrl = 'https://waeb-sdk.openware.com/api/v1/auth'
      savedConfig.finexUrl = 'wss://web-sdk.openware.com/api/v1/finex/ws'
    }

    return { ...fallbackConfig, ...(savedConfig as AppConfig) }
  }

  return fallbackConfig
}

export default getConfigs
