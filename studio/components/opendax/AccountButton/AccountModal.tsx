import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import type { Chain } from '../../../config/chains'
import React, { FC, Fragment, useRef } from 'react'
import { ExplorerLink } from '../ExplorerLink'

type AccountModalProps = {
    open: boolean
    setOpen: (open: boolean) => void
    address: string
    chain: Chain
    handleLogout: () => void
}

export const AccountModal: FC<AccountModalProps> = ({
    open,
    setOpen,
    address,
    chain,
    handleLogout,
}: AccountModalProps) => {
    const ctaButtonRef = useRef(null);

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
                <div className="flex md:items-center items-end justify-center min-h-screen pt-4 px-0 md:px-4 pb-0 md:pb-20 text-center">
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
                        <div className="z-[99999] inline-block align-bottom bg-body-background-color rounded-t-lg rounded-b-lg md:rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div>
                                    <Dialog.Title as="div" className="flex">
                                        <h3 className="flex-1 text-lg leading-6 font-medium text-text-color-100">
                                            Disconnect Wallet
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
                                    <div className="mt-5 flex flex-col">
                                        <div className="bg-neutral-control-color-40 text-neutral-control-layer-color-90 sm:rounded-lg p-2 sm:p-3 truncate font-variant-none">
                                            {address}
                                        </div>
                                        <div className="mt-2">
                                            <ExplorerLink
                                                chain={chain}
                                                type={'address'}
                                                value={address}
                                                linkClassName="text-sm font-medium text-secondary-cta-color-60 hover:text-secondary-cta-color-80 truncate"
                                                Label={({ name }) => (
                                                    <>
                                                        View on
                                                        &nbsp;
                                                        <span className="capitalize">
                                                            {name}
                                                        </span>
                                                    </>
                                                )}
                                            />
                                        </div>
                                        <div className="flex justify-between md:justify-center mt-4">
                                            <button
                                                type="button"
                                                className="flex md:hidden items-center justify-center text-sm py-2 px-4 rounded border border-neutral-control-color-70 shadow-sm cursor-pointer text-neutral-control-layer-color-80 bg-neutral-control-color-0 hover:bg-neutral-control-color-20"
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                ref={ctaButtonRef}
                                                type="button"
                                                className="flex items-center justify-center text-sm py-2 px-6 md:px-4 rounded cursor-pointer text-primary-cta-layer-color-60 duration-200 bg-primary-cta-color-60 hover:bg-primary-cta-color-80 active:bg-primary-cta-color-90"
                                                onClick={() => handleLogout()}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
