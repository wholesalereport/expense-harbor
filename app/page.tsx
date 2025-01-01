'use client'

import {Gradient} from "@/src/components/gradient";
import {Container} from "@/src/components/container";
import {MainMenu} from "@/src/components/navbarv2";
import {ChevronRightIcon} from '@heroicons/react/16/solid'
import {Button} from '@/src/components/button'
import {useState} from 'react'
import {Dialog, DialogPanel} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {Logo} from "@/src/components/logo";
import AboutSiteComponent from "@/src/components/home/AboutSiteComponent";

import {ClipboardDocumentCheckIcon, CreditCardIcon, TableCellsIcon} from '@heroicons/react/24/outline'


function Hero3() {
    return (
        <div className="bg-white">
            <MainMenu/>
            <div className="relative isolate pt-14">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className="py-24 sm:py-32 lg:pb-40">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3.5xl text-center">
                            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                                Tired of mystery charges?
                            </h1>
                            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                                Imagine this: You're reviewing your credit card statement, and all you see are generic
                                charges under "Shopping." You have no idea what those charges actually represent. </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                        <div className="flex flex-col text-left">
                                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                                <div
                                                    className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                    <CreditCardIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                                </div>
                                                Unclear Charges
                                            </dt>
                                            <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                                <p className="flex-auto">Generic "Shopping" charges on your statement
                                                    leave you clueless about what you actually bought.</p>
                                            </dd>
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                                <div
                                                    className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                    <TableCellsIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                                </div>
                                                Manual Tracking
                                            </dt>
                                            <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                                <p className="flex-auto">You're forced to log into multiple
                                                    marketplaces, match orders, and manually record items into
                                                    spreadsheets.</p>
                                            </dd>
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                                <div
                                                    className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                    <ClipboardDocumentCheckIcon className="h-6 w-6 text-white"
                                                                                aria-hidden="true"/>
                                                </div>
                                                Time-Consuming Process
                                            </dt>
                                            <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                                <p className="flex-auto">Categorizing expenses for budgeting or
                                                    preparing itemized deductions can take weeks or even months.</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 sm:mt-20 lg:mt-24">
                            <div
                                className="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
                                <div className="absolute inset-0 bg-gray-500/75 mix-blend-multiply"/>
                                <div className="absolute -left-80 -top-56 transform-gpu blur-3xl" aria-hidden="true">
                                    <div
                                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
                                        style={{
                                            clipPath:
                                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                        }}
                                    />
                                </div>
                                <div
                                    className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl"
                                    aria-hidden="true">
                                    <div
                                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
                                        style={{
                                            clipPath:
                                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                        }}
                                    />
                                </div>
                                <div className="relative mx-auto max-w-2xl lg:mx-0">
                                    <figure>
                                        <blockquote
                                            className="mt-6 text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                                            <p>
                                                Sound familiar? Expense Harbor takes the guesswork out of tracking your expenses. No more mystery charges—just seamless categorization and clear financial insights at your fingertips.
                                            </p>
                                        </blockquote>
                                        <figcaption className="mt-6 text-base text-white">
                                            {/*<div className="font-semibold">Sarah Johnson</div>*/}
                                            <div className="mt-1">CEO of FinTrack Solutions</div>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 flow-root sm:mt-24">
                            <AboutSiteComponent/>
                        </div>
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>
        </div>
    )
}


export default function Home() {
    return (
        <div className="overflow-hidden">
            <Hero3/>
        </div>
    )
}


// function Hero2() {
//
//     return (
//         <div className="bg-white">
//             <MainMenu />
//             <div className="relative isolate px-6 pt-14 lg:px-8">
//                 <div
//                     aria-hidden="true"
//                     className="inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//                 >
//                     <div
//                         style={{
//                             clipPath:
//                                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//                         }}
//                         className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
//                     />
//                 </div>
//                 <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
//                     <div className="text-center">
//                         <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
//                             Itemized Totals by Category
//
//                         </h1>
//                         <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
//                             Categorize your order items, generate detailed reports, and maximize your tax return.
//                         </p>
//                         <div className="mt-10 flex items-center justify-center gap-x-6">
//                             {/*<a*/}
//                             {/*    href="#"*/}
//                             {/*    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
//                             {/*>*/}
//                             {/*    Get started*/}
//                             {/*</a>*/}
//                             <Button href="/reports/new">Get started</Button>
//                             <a href="#" className="text-sm/6 font-semibold text-gray-900">
//                                 Learn more <span aria-hidden="true">→</span>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//                 <div
//                     aria-hidden="true"
//                     className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
//                 >
//                     <div
//                         style={{
//                             clipPath:
//                                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//                         }}
//                         className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }
