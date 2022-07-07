import { Dialog, Transition } from '@headlessui/react'
import { XIcon, InformationCircleIcon } from '@heroicons/react/solid'
import MetaMaskOnboarding from '@metamask/onboarding'
import classNames from 'classnames'
import type { ProviderWhitelist } from '../../../hooks/web3/useDApp'
import Link from 'next/link'
import React, { FC, Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Metamask } from '../../../public/img/opendax/Metamask'
// import { WalletConnectIcon } from '../../../public/img/opendax/WalletConnect'
// import { FormattedMessage } from 'react-intl'
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { supportedChains } from '../../../config/fallbackConfig'
import getConfigs from '../../../config/app'
import { useSetMobileDevice } from '../../../hooks/ui/useMobileDevice'
import { MobileModal } from '../MobileModal'

type ConnectorItem = {
    id: ProviderWhitelist
    name: string
    icon: JSX.Element
}
type WalletModalProps = {
    open: boolean
    setOpen: (open: boolean) => void
    handleTriggerConnect: (name: ProviderWhitelist) => void
}

export const WalletModal: FC<WalletModalProps> = ({
    open,
    setOpen,
    handleTriggerConnect,
}: WalletModalProps) => {
    const connectors: ConnectorItem[] = [
        { id: 'Injected', name: 'Metamask', icon: <Metamask /> },
        //{ id: 'WalletConnect', name: 'WalletConnect', icon: <WalletConnectIcon /> },
    ]
    // initialize metamask onboarding
    const [isMetaMaskInstalled, setMetaMaskInstalled] = useState<boolean>(false)
    const onboarding = useRef<MetaMaskOnboarding>()
    const ctaButtonRef = useRef(null)

    const isMobile =  useSetMobileDevice();

    useEffect(() => {
        onboarding.current = new MetaMaskOnboarding()
        setMetaMaskInstalled(MetaMaskOnboarding.isMetaMaskInstalled())
    }, [])

    const supportedChainsList = useMemo(
        () =>
            getConfigs().blockchain.supportedChainIds.map((chainId, i) => {
                const chainName = supportedChains[chainId] || 'Untitled network'
                return (
                    <li key={i} className="flex items-center text-sm mb-2.5">
                        <span className="inline-flex justify-center items-center bg-text-color px-1 rounded mr-2">
                            {chainId}
                        </span>
                        {chainName}
                    </li>
                )
            }),
        [getConfigs().blockchain.supportedChainIds, supportedChains],
    )

    const renderWalletConnectors = useMemo(() => {
        return (
            <div className="mt-5 flex flex-col">
                {connectors.map(
                    ({ id, name, icon }, i) => (
                        <div
                            key={id}
                            className={classNames('flex', {
                                'mb-3': i < connectors.length - 1,
                            })}
                        >
                            {isMetaMaskInstalled ||
                                id !== 'Injected' ? (
                                <button
                                    type="button"
                                    className="flex flex-1 items-center justify-between px-6 py-4 border border-neutral-control-color-70  text-base font-medium rounded-md text-neutral-control-layer-color-70 bg-neutral-control-color-40 hover:bg-neutral-control-color-50"
                                    onClick={() =>
                                        handleTriggerConnect(
                                            id,
                                        )
                                    }
                                >
                                    <span className="flex pr-4 text-neutral-control-layer-color-100">
                                        {name}
                                    </span>
                                    {
                                        id === 'Injected' &&
                                        (
                                            <div className="mr-auto">
                                                <TooltipPrimitive.Root delayDuration={0}>
                                                    <TooltipPrimitive.Trigger asChild>
                                                        <span className="flex items-center text-text-color-60 text-sm font-medium mr-auto">
                                                            Networks{" "}
                                                            <InformationCircleIcon className="text-text-color-60 h-3.5 w-3.5"/>
                                                        </span>
                                                    </TooltipPrimitive.Trigger>
                                                    <TooltipPrimitive.Content>
                                                        <div className="bg-connector-networks-info text-white rounded p-3 w-64 text-left">
                                                            <span className="block text-base font-bold mb-3.5">
                                                                Supported Networks
                                                            </span>
                                                            <ol className="list-none p-0 m-0">
                                                                {supportedChainsList}
                                                            </ol>
                                                        </div>
                                                    </TooltipPrimitive.Content>
                                                </TooltipPrimitive.Root>
                                            </div>
                                        )
                                    }
                                    {icon}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="flex flex-1 items-center px-6 py-3 border border-neutral-control-color-70 text-base font-medium rounded-md text-neutral-control-layer-color-70 bg-neutral-control-color-40 hover:bg-neutral-control-color-50"
                                    onClick={() =>
                                        onboarding.current?.startOnboarding()
                                    }
                                >
                                    <span className="flex flex-1 pr-4 text-neutral-control-layer-color-100">
                                        Install Metamask
                                    </span>
                                    <Metamask />
                                </button>
                            )}
                        </div>
                    ),
                )}
            </div>
        )
    }, [isMetaMaskInstalled, onboarding, supportedChainsList, connectors]);

    const renderTermsOfService = useMemo(() => {
        return isMobile ? (
                <div className="p-2 sm:p-3">
                    <div className="text-base text-neutral-control-layer-color-50">
                        <p>
                            By connecting a wallet, you agree to Opendax
                            <Link href="#">
                                <a
                                    ref={ctaButtonRef}
                                    className="text-base text-secondary-cta-color-60 truncate"
                                >
                                    Terms of Service
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>
            )
            : (
                <div className="text-sm text-neutral-control-layer-color-60">
                    <p>
                        By connecting a wallet, you agree to Opendax
                        &nbsp;
                        <Link href="#">
                            <a
                                ref={ctaButtonRef}
                                className="text-sm font-medium text-secondary-cta-color-60 truncate"
                            >
                                Terms of Service
                            </a>
                        </Link>
                        .
                    </p>
                </div>
            )
    }, [isMobile]);

    if (isMobile) {
        return (
            <MobileModal
                open={open}
                setOpen={setOpen}
                title="Connect to wallet"
                body={renderWalletConnectors}
                footer={renderTermsOfService}
            />
        )
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-40 inset-0 overflow-y-auto"
                initialFocus={ctaButtonRef}
                open={open}
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-body-background-color rounded-b-lg rounded-t-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>
                                <Dialog.Title as="div" className="flex">
                                    <h3 className="flex-1 text-lg leading-6 font-medium text-text-color-100">
                                        Connect to wallet
                                    </h3>
                                    <button
                                        className="bg-body-background-color rounded-md inline-flex text-neutral-control-layer-color-40 hover:text-neutral-control-layer-color-50"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">
                                            Close
                                        </span>
                                        <XIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </Dialog.Title>
                                {renderWalletConnectors}
                            </div>
                            <div className="mt-3">
                                {renderTermsOfService}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
