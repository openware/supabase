import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import React, { FC, ReactNode, Fragment } from 'react'

export interface MobileModalProps {
    /**
     * Modal open state
     */
    open: boolean
    /**
     * Title of modal
     */
    title?: ReactNode
    /**
     * Body of modal
     */
    body?: ReactNode
    /**
     * Modal footer
     */
    footer?: ReactNode
    /**
     * Callback set modal open state
     */
    setOpen: (open: boolean) => void
    /**
     * Classes for modal
     */
    modalClassName?: string
    /**
     * Hide close icon
     */
    hideCloseIcon?: boolean
    /**
     * Divide header with content with border
     */
    divideHeader?: boolean
}

export const MobileModal: FC<MobileModalProps> = ({
    open,
    title,
    body,
    footer,
    setOpen,
    modalClassName,
    hideCloseIcon,
    divideHeader,
}: MobileModalProps) => {
    const bodyRef = React.useRef(null)

    const renderCloseIcon = () => {
        return (
            !hideCloseIcon && (
                <button
                    className="bg-body-background-color rounded-md inline-flex text-neutral-control-layer-color-40 hover:text-neutral-control-layer-color-50"
                    onClick={() => setOpen(false)}
                >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            )
        )
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-40 inset-0 overflow-y-auto"
                initialFocus={bodyRef}
                open={open}
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 text-center sm:block sm:p-0">
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
                        <div className={modalClassName}>
                            <div>
                                <div>
                                    <Dialog.Title
                                        as="div"
                                        className={
                                            divideHeader
                                                ? 'flex pb-6 border-b px-6'
                                                : 'flex'
                                        }
                                    >
                                        <h3 className="flex-1 text-lg leading-6 font-medium text-text-color-100">
                                            {title}
                                        </h3>
                                        {renderCloseIcon()}
                                    </Dialog.Title>
                                    <div ref={bodyRef}>{body}</div>
                                </div>
                            </div>
                            <div className="mt-3">{footer}</div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

MobileModal.defaultProps = {
    title: null,
    body: null,
    footer: null,
    open: true,
    setOpen: () => alert('setOpen'),
    modalClassName: 'w-full inline-block align-bottom bg-body-background-color rounded-t-lg sm:rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6',
    divideHeader: false,
}
