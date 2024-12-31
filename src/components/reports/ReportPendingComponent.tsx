'use client';
import React from 'react';


export const ReportPendingComponent = () => {

    return (
        <div
            className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
            <div className="text-center">
                <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                    Your report is being prepared!
                </h1>
                <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                    We are currently working on your report and will notify you once it is ready.
                    Feel free to refresh this page or check your email for updates.
                </p>
            </div>
        </div>
    )
}