import { BigNumber } from 'bignumber.js'
BigNumber.set({ DECIMAL_PLACES: 30 }) 
BigNumber.config({ EXPONENTIAL_AT: 1e+9 })

export function shortenHex(hex: string | undefined | null, length = 4, tail?: number | null) {
  if (!tail) {
    return `${hex?.substring(0, length + 2)}…${hex?.substring(
      hex?.length - length,
    )}`
  } else {
    return `${hex?.substring(0, length)}…${hex?.substring(
      hex?.length - tail,
    )}`
  }
}

export function decimalMax (amount: string | number, decimal: number = 18) : string {
  return new BigNumber(new BigNumber(amount || 0).toFixed(decimal)).toString()
}
