import { UnsupportedChainIdError } from '@web3-react/core'
// import { useAppDispatch, useAppSelector } from 'src/providers/ReduxProvider/app/hooks'
// import { deleteAlertByIndex, dispatchAlert, DispatchAlertPayload } from 'src/providers/ReduxProvider/features/alerts/alertsSlice'
import useDApp from '../../../hooks/web3/useDApp'
import type { ProviderWhitelist } from '../../../hooks/web3/useDApp'
import React, { FC, useCallback } from 'react'
import { WalletModal } from './WalletModal'

type ConnectorWalletModalProps = {
    showModal: boolean
    handleModal: (open: boolean) => void
}

export const ConnectorWalletModal: FC<ConnectorWalletModalProps> = ({
    showModal,
    handleModal,
}: ConnectorWalletModalProps) => {
    const { connectWithProvider } = useDApp()
    // const alerts = useAppSelector(state => state.alerts.alerts)

    // const removeConnectWalletAlert = useCallback(() => {
    //     const index = alerts.findIndex((alert: DispatchAlertPayload) => alert.type === 'connectWallet')
    //     dispatch(
    //         deleteAlertByIndex(index)
    //     )
    // }, [alerts])

    const handleConnectWallet = useCallback(
        async (provider: ProviderWhitelist) => {
            // Metamask exposes experimental methods under 'ethereum._metamask' property.
            // 'ethereum._metamask.isUnlocked' may be removed or changed without warning.
            // There is no other stable solution to detect Metamask 'unlocked' status right now.
            // Details: https://docs.metamask.io/guide/ethereum-provider.html#ethereum-metamask-isunlocked
            // Future breaking changes can be found here https://medium.com/metamask
            // const isMetamaskUnlocked = await (window as any)?.ethereum._metamask?.isUnlocked()

            // if (!isMetamaskUnlocked && provider === 'Injected') {
            //     dispatch(
            //         dispatchAlert({
            //             type: 'warn',
            //             messageText: 'alerts.message.wallet.metamask.locked',
            //         }),
            //     )
            // }

            connectWithProvider(provider).then(() => {
                // removeConnectWalletAlert()
            }).catch(async (error) => {
                if (
                    error instanceof UnsupportedChainIdError &&
                    !error
                        .toString()
                        .includes('Supported chain ids are: undefined')
                ) {
                    // removeConnectWalletAlert()
                    // dispatch(
                    //     dispatchAlert({
                    //         type: 'connectWallet',
                    //         autoCloseDisabled: true,
                    //     }),
                    // )
                } else {
                    // dispatch(
                    //     dispatchAlert({
                    //         messageText: 'alerts.message.text.sign.error',
                    //         type: 'error'
                    //     }),
                    // )
                }
            })
            handleModal(false)
        },
        [connectWithProvider],
    )

    return (
        <WalletModal
            open={showModal}
            setOpen={handleModal}
            handleTriggerConnect={handleConnectWallet}
        />
    )
}
