import React, {useState} from 'react';
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

function SideBox({ title, description }: { title: string; description: string }) {
    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="px-4 py-2.5 sm:px-6">
                <h3 className="text-sm font-bold">{title}</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
                <p className="text-sm text-gray-600">{description}</p>
                <div className="mt-4">
                    <a href="/reports/new" className="text-sm font-medium text-blue-600 hover:text-blue-500 inline-flex items-center">
                        Get Started <ArrowRightIcon className="ml-1 h-4 w-4" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default function AboutSiteComponent() {
    const reportImage = "/reports_page_screenshot.png"
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    return (
        <div className="container mx-auto p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-[1fr,2fr]">
                {/* Left column on desktop, top section on mobile */}
                <div className="flex flex-col gap-4">
                    <SideBox
                        title="Expense Tracking"
                        description="Easily track and categorize your expenses across multiple platforms."
                    />
                    <SideBox
                        title="Automated Reports"
                        description="Generate detailed reports with just a few clicks, saving you hours of manual work."
                    />
                    <SideBox
                        title="Tax Preparation"
                        description="Simplify your tax preparation with itemized deductions and categorized expenses."
                    />
                    <SideBox
                        title="Budget Insights"
                        description="Gain valuable insights into your spending habits to help you budget more effectively."
                    />
                </div>

                {/* Right column on desktop, bottom section on mobile */}
                <div
                    onClick={openModal}
                    className="relative flex items-center justify-center min-h-[300px] h-full border-4 border-gray-400 rounded-lg overflow-hidden cursor-pointer">
                    <Image
                        src={reportImage}
                        alt="Expense Harbor report details"
                        layout="fill"
                        objectFit="contain"
                        sizes="(min-width: 768px) 66vw, 100vw"
                        priority
                    />
                </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Expense Report
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <Image
                                            src={reportImage}
                                            alt="Expense report showing pie chart and transactions"
                                            width={1400}
                                            height={800}
                                            style={{ width: '100%', height: 'auto' }}
                                            priority
                                            quality={100}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

