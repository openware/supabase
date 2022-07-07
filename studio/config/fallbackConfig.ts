import { AppConfig } from './utils'

const fallbackConfig: AppConfig = {
    // General configs
    appName: 'Supabase',
    appVersion: '4.0-alpha3',
    languages: ['en', 'ru'],
    // Custody configs
    blockchain: {
        supportedChainIds: [
            '1', // Ethereum Mainnet
            '3', // Ethereum Testnet Ropsten
            '4', // Ethereum Testnet Rinkeby
            '5', // Ethereum Testnet Goerli
            '42', // Ethereum Testnet Kovan
            '56', // Binance Smart Chain Mainnet
            '97', // Binance Smart Chain Testnet
            '137', // Matic(Polygon) Mainnet
            '80001', // Matic Testnet Mumbai
            '31337', // Hardhat Local,
        ],
    },
    platformChainId: process.env.NEXT_PUBLIC_CHAIN_ID ?? '4', // Rinkeby as default
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID as string,
}

export const supportedChains: Record<string, string> = {
    '1': 'Ethereum Mainnet',
    '3': 'Ethereum Testnet Ropsten',
    '4': 'Ethereum Testnet Rinkeby',
    '5': 'Ethereum Testnet Goerli',
    '42': 'Ethereum Testnet Kovan',
    '56': 'Binance Smart Chain Mainnet',
    '97': 'Binance Smart Chain Testnet',
    '137': 'Matic(Polygon) Mainnet',
    '80001': 'Matic Testnet Mumbai',
    '31337': 'Hardhat Local',
}

export default fallbackConfig
