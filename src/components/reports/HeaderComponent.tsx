import React from 'react';
import {IconComponent} from "@/src/components/reports/IconComponent";

export const HeaderComponent = () =>{
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
                        <IconComponent />
                        <h1>
                            <div className="text-sm/6 text-gray-500">
                                Each report includes a breakdown of totals and related transactions by category.
                            </div>
                            <div className="mt-1 text-base font-semibold text-gray-900">Reports</div>
                        </h1>
                    </div>
                    <div className="flex items-center gap-x-4 sm:gap-x-6">

                        <a
                            href="/reports/new"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create Report
                        </a>

                    </div>
                </div>
            </div>
        </header>

    )
}