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






function Hero3(){
    return (
        <div className="bg-white">
            <MainMenu />
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
                                Effortlessly Categorize Transactions and Unlock Insights
                            </h1>
                            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                                Quickly categorize transactions from popular marketplaces like Amazon, Walmart, etc. Gain actionable insights with visualizations and take control of your spending.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Get started
                                </a>
                                <a href="#" className="text-sm/6 font-semibold text-gray-900">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        <div className="mt-16 flow-root sm:mt-24">
                            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                <img
                                    alt="App screenshot"
                                    src="https://tailwindui.com/plus/img/component-images/project-app-screenshot.png"
                                    width={2432}
                                    height={1442}
                                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                                />
                            </div>
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
            <Hero3 />
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
