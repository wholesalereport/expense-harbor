'use client'

import React, {useState} from 'react';
import {NAVIGATION_ITEM} from "@/constants";
import {ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {Logo} from "@/src/components/logo";

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export const MainMenu = ({navigation = NAVIGATION_ITEM}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Logo/>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6"/>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="-mx-3 mt-3 block rounded-lg px-3  text-base/7 font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <ClerkLoading>
                        <div>Clerk is loading...</div>
                    </ClerkLoading>
                    <SignedOut>
                        <SignInButton/>
                    </SignedOut>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50"/>
                <DialogPanel
                    className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Logo/>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <ClerkLoading>
                                    <div>Clerk is loading...</div>
                                </ClerkLoading>
                                <SignedOut>
                                    <SignInButton/>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton/>
                                </SignedIn>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>

        </header>
    )
}
export const _MainMenu = ({navigation = NAVIGATION_ITEM}) => {
    return (
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between  lg:px-8">
                    <div className="flex lg:flex-1">
                        {/*<a href="#" className="flex">*/}
                        {/*    Expense Harbor*/}
                        {/*</a>*/}
                        <Logo/>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/*<Bars3Icon aria-hidden="true" className="size-6"/>*/}
                        </button>
                    </div>
                    <div className="lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="-mx-3 mt-3 block rounded-lg px-3  text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="lg:flex lg:flex-1 lg:justify-end mt-3">
                        <span className="text-sm/6 font-semibold text-gray-900">
                            <SignedOut>
                                <SignInButton/>
                            </SignedOut>
                            <SignedIn>
                                <UserButton/>
                            </SignedIn>
                        </span>
                    </div>
                </nav>
                {/*<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">*/}
                {/*    <div className="fixed inset-0 z-50"/>*/}
                {/*    <DialogPanel*/}
                {/*        className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">*/}
                {/*        <div className="flex items-center justify-between">*/}
                {/*            <a href="#" className="-m-1.5 p-1.5">*/}
                {/*                <span className="sr-only">Your Company</span>*/}
                {/*                <img*/}
                {/*                    alt=""*/}
                {/*                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"*/}
                {/*                    className="h-8 w-auto"*/}
                {/*                />*/}
                {/*            </a>*/}
                {/*            <button*/}
                {/*                type="button"*/}
                {/*                onClick={() => setMobileMenuOpen(false)}*/}
                {/*                className="-m-2.5 rounded-md p-2.5 text-gray-700"*/}
                {/*            >*/}
                {/*                <span className="sr-only">Close menu</span>*/}
                {/*                <XMarkIcon aria-hidden="true" className="size-6"/>*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div className="mt-6 flow-root">*/}
                {/*            <div className="-my-6 divide-y divide-gray-500/10">*/}
                {/*                <div className="space-y-2 py-6">*/}
                {/*                    {navigation.map((item) => (*/}
                {/*                        <a*/}
                {/*                            key={item.name}*/}
                {/*                            href={item.href}*/}
                {/*                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"*/}
                {/*                        >*/}
                {/*                            {item.name}*/}
                {/*                        </a>*/}
                {/*                    ))}*/}
                {/*                </div>*/}
                {/*                <div className="py-6">*/}
                {/*                    <a*/}
                {/*                        href="#"*/}
                {/*                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"*/}
                {/*                    >*/}
                {/*                        Log in*/}
                {/*                    </a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </DialogPanel>*/}
                {/*</Dialog>*/}
            </header>
        </div>
    )
}