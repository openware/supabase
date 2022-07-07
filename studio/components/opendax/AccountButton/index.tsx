import classnames from 'classnames';
import React, { FC } from 'react';
// import { FormattedMessage, useIntl } from 'react-intl'
import { Metamask } from '../../../public/img/opendax/Metamask';
import { WalletIcon } from '../../../public/img/opendax/WalletIcon';
import useDApp from '../../../hooks/web3/useDApp';
import { useEagerConnect } from '../../../hooks/web3/useEagerConnect';
import { useENSName } from '../../../hooks/web3/useENSName';
import useWallet from '../../../hooks/web3/useWallet';
// import { useAppDispatch, useAppSelector } from 'src/providers/ReduxProvider/app/hooks';
// import { toggleWalletConnectModalOpen } from 'src/providers/ReduxProvider/app/store';
import { shortenHex } from '../../../helpers/utils';
import { AccountModal } from './AccountModal';
import { ConnectorWalletModal } from './ConnectorWalletModal';

export interface AccountButtonWidgetProps {
    /**
     * Determines whether the button is minimized
     */
    minimized?: boolean
    /**
     * Connect wallet button label in not logged in state
     */
    connectWalletButtonLabel?: string | React.ReactNode;
    /**
     * Connect wallet button icon
     */
    connectWalletButtonIcon?: JSX.Element
    /**
     * Connect wallet button classes on non-minimized mode
     */
    buttonClassNames?: string
    /**
     * Classes for network div in logged in state
     */
    chainNetworkClassNames?: string
    /**
    * Classes for content in chain div in logged in state 
    */
    chainClassNames?: string
    /**
    * Classes for items alignment in button
    */
    itemsAlignmentClassNames?: string
    /**
    * Classes for icon in logged in state
    */
    iconClassNames?: string
    /**
    * Classes for chain name in logged in state
    */
    chainTextClassNames?: string
     /**
     * Connect wallet active button classes on non-minimized mode
     */
    buttonActiveClassNames?: string
    /**
     * Classes for Account modal
     */
    contentClassNames?: string
    /**
     * On click callback
    */
    onClickCb?: () => void
};

export const AccountButtonWidget: FC<AccountButtonWidgetProps> = ({
    minimized,
    connectWalletButtonLabel,
    connectWalletButtonIcon,
    buttonClassNames,
    contentClassNames,
    buttonActiveClassNames,
    chainNetworkClassNames,
    itemsAlignmentClassNames,
    chainClassNames,
    chainTextClassNames,
    iconClassNames,
    onClickCb,
}: AccountButtonWidgetProps) => {
    const [showModal, setModal] = React.useState(false)
    const triedToEagerConnect = useEagerConnect()
    const { active, account, chain } = useWallet()
    const { disconnect } = useDApp()
    const ENSName = useENSName(account)
    // const user = useAppSelector(state => state.user.user)
    // const intl = useIntl();
    // const translate = (id: string) => intl.formatMessage({ id });
    // const dispatch = useAppDispatch()

    // const isWalletConnectModalOpen = useAppSelector(
    //     (state) => state.globalSettings.isWalletConnectModalOpen,
    // )

    React.useEffect(() => {
        !account && setModal(false)
    }, [account])

    const handleDisconnect = () => {
        setModal(false)
        disconnect()
    }

    const handleConnectWalletModal = React.useCallback(() => {
        setModal(true)
        // dispatch(toggleWalletConnectModalOpen())
        onClickCb && onClickCb()
    }, [onClickCb])

    if (!triedToEagerConnect) {
        return null
    }

    if (!active) {
        console.log('test', showModal)
        return (
            <>
                <button
                    aria-label={'Connect Wallet'}
                    type="button"
                    className={buttonClassNames}
                    onClick={handleConnectWalletModal}
                >
                    {minimized ? connectWalletButtonIcon : (connectWalletButtonLabel || 'Connect Wallet')}
                </button>
                <ConnectorWalletModal
                    showModal={showModal}
                    handleModal={setModal}
                />
            </>
        )
    }

    return (
        <>
            <a
                aria-label={ENSName || `${shortenHex(account, 4)}`}
                role="button"
                className={buttonActiveClassNames}
                onClick={() => setModal(true)}
            >
                <div className={itemsAlignmentClassNames}>
                    <div className={iconClassNames}>
                        <div className="flex w-5">
                            <Metamask />
                        </div>
                    </div>
                    {!minimized && (
                        <div
                            className={classnames(
                                'ml-2 truncate',
                                contentClassNames,
                            )}
                        >
                            <div className={chainClassNames}>
                                <p className={chainTextClassNames}>
                                    {ENSName || `${shortenHex(account, 4)}`}
                                </p>
                                {chain && (
                                    <div className={chainNetworkClassNames}>{chain.network}</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </a>
            {account && chain && (
                <AccountModal
                    open={showModal}
                    setOpen={setModal}
                    address={account}
                    chain={chain}
                    handleLogout={() => handleDisconnect()}
                />
            )}
        </>
    );
};

AccountButtonWidget.defaultProps = {
    buttonClassNames: 'inline-flex w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-cta-layer-color-60 duration-200 bg-primary-cta-color-60 hover:bg-primary-cta-color-80 active:bg-primary-cta-color-90',
    buttonActiveClassNames: 'flex justify-center lg:justify-start p-2 group rounded-md hover:bg-navbar-control-bg-color-10',
    chainNetworkClassNames: 'ml-1 px-2 py-1 text-xs font-medium uppercase rounded-full bg-secondary-cta-color-10 text-secondary-cta-color-90',
    chainClassNames: 'flex items-center text-base font-bold text-gray-700 group-hover:text-gray-900',
    chainTextClassNames: 'text-xs font-medium truncate text-neutral-control-layer-color-100 font-variant-none',
    itemsAlignmentClassNames: 'flex items-center',
    iconClassNames: 'flex h-8 w-8 items-center justify-center bg-navbar-control-bg-color-10 rounded-full',
    connectWalletButtonIcon: (
        <span>
            <WalletIcon
                classNames="h-5 w-5"
                stroke='var(--primary-cta-layer-color-60)'
            />
        </span>
    ),
};
