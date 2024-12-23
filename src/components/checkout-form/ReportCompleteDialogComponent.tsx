'use client'

import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import {CheckIcon} from '@heroicons/react/24/outline'

export default function ReportCompleteDialogComponent({open}) {
    const handleDialogClose = () => {
        // Do nothing to disable closing
    };
    return (
        <Dialog open={open} onClose={handleDialogClose} className="relative z-10">
            <DialogBackdrop
                onClick={() => null}
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div>
                            <div
                                className="mx-auto flex size-12 items-center justify-center rounded-full bg-indigo-100">
                                {/*<CheckIcon aria-hidden="true" className="size-6 text-green-600" />*/}
                                <svg
                                    className="animate-spin h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="#4f46e5"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="#4f46e5"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>

                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                    Payment successful
                                </DialogTitle>
                                <div className="mt-2 mb-5">
                                    <h4 className="text-base font-semibold text-gray-900">
                                        Here’s what happens next:
                                    </h4>
                                    <ul role={"list"} className={"space-y-6 mt-4"}>
                                        <li className="relative flex gap-x-4">
                                            <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                                <div className="w-px bg-gray-200"></div>
                                            </div>
                                            <div
                                                className="relative flex size-6 flex-none items-center justify-center bg-white">
                                                <div
                                                    className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                                            </div>
                                            <p className="py-0.5 text-sm/5 text-gray-500">
                                                <span className="font-medium text-gray-900">We’ll categorize all your expenses.</span>
                                            </p>
                                        </li>
                                        <li className="relative flex gap-x-4">
                                            <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                                <div className="w-px bg-gray-200"></div>
                                            </div>
                                            <div
                                                className="relative flex size-6 flex-none items-center justify-center bg-white">
                                                <div
                                                    className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                                            </div>
                                            <p className="py-0.5 text-sm/5 text-gray-500">
                                                <span className="font-medium text-gray-900">A custom report will be created for you.</span>
                                            </p>
                                        </li>
                                        <li className="relative flex gap-x-4">
                                            <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                                <div className="w-px bg-gray-200"></div>
                                            </div>
                                            <div
                                                className="relative flex size-6 flex-none items-center justify-center bg-white">
                                                <div
                                                    className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                                            </div>
                                            <p className="py-0.5 text-sm/5 text-gray-500">
                                                <span className="font-medium text-gray-900">The report will be attached to your dashboard.</span>
                                            </p>

                                        </li>
                                        <li className="relative flex gap-x-4">
                                            <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                                {/*<div className="w-px bg-gray-200"></div>*/}
                                            </div>
                                            <div
                                                className="relative flex size-6 flex-none items-center justify-center bg-white">
                                                <div
                                                    className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                                            </div>
                                            <p className="py-0.5 text-sm/5 text-gray-500">
                                                <span className="font-medium text-gray-900">You will be able to access your report.</span>
                                            </p>

                                        </li>

                                    </ul>


                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
