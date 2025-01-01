import React from 'react';
import {IconComponent} from "@/src/components/reports/IconComponent";

const PAGE_NAME = 'Reports'
const PAGE_DESCRIPTION = 'Each report includes a breakdown of totals and related transactions by category.\n'
import { PlusIcon } from '@heroicons/react/24/solid'
import {useRouter} from "next/navigation";

export const HeaderComponent = ({
                                    showCreateReport = true,
                                    pageName=PAGE_NAME,
                                    pageDescription=PAGE_DESCRIPTION
                                }) =>{
    const router = useRouter();

    return (
        <header className="relative isolate pt-1">
            <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
                    <div
                        style={{
                            clipPath:
                                'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                        }}
                        className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                    />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5"/>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div
                    className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                    <div className="flex items-center gap-x-6">
                        {/*<IconComponent />*/}
                        <h1>
                            <div className="text-sm/6 text-gray-500">
                                {pageDescription}
                            </div>
                            <div className="mt-1 text-base font-semibold text-gray-900">{pageName}</div>
                        </h1>
                    </div>
                    <div className="flex items-center gap-x-4 sm:gap-x-6">

                        {showCreateReport && <button
                            role={"link"}
                            onClick={() => router.push("/reports/new") }
                            type="button"
                            className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <PlusIcon aria-hidden="true" className="-ml-0.5 size-5 font-bold"/>
                             Create Report
                        </button>}

                    </div>
                </div>
            </div>
        </header>

    )
}