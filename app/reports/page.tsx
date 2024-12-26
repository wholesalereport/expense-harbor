'use client'
import React, {useEffect, useState} from 'react';

import {useUser} from "@clerk/nextjs";
import {omit} from "next/dist/shared/lib/router/utils/omit";
import _, {isEmpty, isNull} from "lodash";
import {NoReportsComponent} from "@/src/components/reports/NoReportsComponent";
import {LoadingIndicatorComponent} from "@/src/components/reports/LoadingIndicatorComponent";
import {Report} from '@prisma/client'

import {REPORT_STATUSES} from "@/constants";


const invoice = {
    subTotal: '$8,800.00',
    tax: '$1,760.00',
    total: '$10,560.00',
    items: [
        {
            id: 1,
            title: 'Logo redesign',
            description: 'New logo and digital asset playbook.',
            hours: '20.0',
            rate: '$100.00',
            price: '$2,000.00',
        },
        {
            id: 2,
            title: 'Website redesign',
            description: 'Design and program new company website.',
            hours: '52.0',
            rate: '$100.00',
            price: '$5,200.00',
        },
        {
            id: 3,
            title: 'Business cards',
            description: 'Design and production of 3.5" x 2.0" business cards.',
            hours: '12.0',
            rate: '$100.00',
            price: '$1,200.00',
        },
        {
            id: 4,
            title: 'T-shirt design',
            description: 'Three t-shirt design concepts.',
            hours: '4.0',
            rate: '$100.00',
            price: '$400.00',
        },
    ],
}

const EHIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="none"
            className="w-12 h-12"
        >
            {/* Background */}
            <rect width="50" height="50" rx="12" fill="#E0E7FF" />

            {/* Mirrored E */}
            <text
                x="35%" /* Adjusted for 5px movement to the right */
                y="40%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#4F46E5"
                fontSize="24"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
                //transform="scale(-1, 1) translate(-50, 0)" /* Flip horizontally */
            >
                E
            </text>

            {/* H */}
            <text
                x="70%"
                y="65%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#6D28D9"
                fontSize="24"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                H
            </text>
        </svg>
    );
};


// const statuses = {
//     Complete: 'text-green-700 bg-green-50 ring-green-600/20',
//     'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
//     Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
// }

export default function Page() {
    const [reports, setReports] = useState<Report[] | null>(null);
    const [loading,setLoading] = useState<boolean>(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null)

    useEffect(() => {
        setLoading(true)
        setReports([])
        fetch("/api/reports", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }).then(response => {
            return response.json()
        }).then(({reports = []} = {}) => {
            setReports(reports)
        }).catch(e => {
            console.error(e);
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    if (!isNull(reports) && isEmpty(reports) && !loading) {
        return <NoReportsComponent/>

    }

    if(loading || isNull(reports)){
        return <LoadingIndicatorComponent />
    }



    const handleOnSelectReport = (report: Report) => setSelectedReport(report);


    const classNameForReportByStatus = (status: string):string => {
        switch (status){
            case REPORT_STATUSES.OPEN:
                return "bg-gray-500";
            case REPORT_STATUSES.IN_PROGRESS:
                return "bg-amber-500";
            case REPORT_STATUSES.COMPLETE:
                return "bg-emerald-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <>


            <main>
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
                                <EHIcon />
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

                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {/* Invoice summary */}
                        <div className="lg:col-start-3 lg:row-end-1">
                            <h2 className="sr-only">Summary</h2>
                            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 p-2">
                                <dl className="flex flex-wrap">
                                    <div className="flex-auto pl-6 pt-6 border-b border-gray-900/5 pb-3">
                                        <dt className="text-sm/6 font-semibold text-gray-900">Reports</dt>
                                        {/*<dd className="mt-1 text-base font-semibold text-gray-900">Helper text</dd>*/}
                                    </div>
                                </dl>
                                <div className={"h-96"}>
                                    <nav aria-label="Directory" className="h-full overflow-y-auto">
                                        <ul
                                            role="list"
                                            className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-2"
                                        >
                                            {reports.map((report) => (
                                                <li key={report.id}
                                                    className={`relative flex justify-between gap-x-6 px-1 py-1 sm:px-6 ${
                                                        selectedReport?.id === report.id
                                                            ? "bg-indigo-100 ring-2 ring-indigo-500"
                                                            : "hover:shadow-md hover:shadow-gray-200"
                                                    }`}
                                                    onClick={() => handleOnSelectReport(report)}
                                                >
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer">
                                                                <span
                                                                    className="absolute inset-x-0 -top-px bottom-0"/>
                                                                {_.truncate(report.id, {length: 20})}
                                                            </p>
                                                            <p className="mt-1 flex text-xs/5 text-gray-500">
                                                                {report?.createdAt && new Date(report?.createdAt).toDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 items-center gap-x-4">
                                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                            <p className="text-sm/6 text-gray-900">Transactions: <span className={"font-semibold"}>{report.totalLines}</span></p>
                                                            <div className="mt-1 flex items-center gap-x-1.5">
                                                                <div
                                                                    className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                                    <div
                                                                        className={`size-1.5 rounded-full ${classNameForReportByStatus(report.status)}`}/>
                                                                </div>
                                                                <p className="text-xs/5 text-gray-500">{report.status}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>

                                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                                    <a href="#" className="text-sm/6 font-semibold text-gray-900">
                                        Download receipt <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Invoice */}
                        <div
                            className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                            <h2 className="text-base font-semibold text-gray-900">Invoice</h2>
                            <dl className="mt-6 grid grid-cols-1 text-sm/6 sm:grid-cols-2">
                                <div className="sm:pr-4">
                                    <dt className="inline text-gray-500">Issued on</dt>
                                    {' '}
                                    <dd className="inline text-gray-700">
                                        <time dateTime="2023-23-01">January 23, 2023</time>
                                    </dd>
                                </div>
                                <div className="mt-2 sm:mt-0 sm:pl-4">
                                    <dt className="inline text-gray-500">Due on</dt>
                                    {' '}
                                    <dd className="inline text-gray-700">
                                        <time dateTime="2023-31-01">January 31, 2023</time>
                                    </dd>
                                </div>
                                <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                                    <dt className="font-semibold text-gray-900">From</dt>
                                    <dd className="mt-2 text-gray-500">
                                        <span className="font-medium text-gray-900">Acme, Inc.</span>
                                        <br/>
                                        7363 Cynthia Pass
                                        <br/>
                                        Toronto, ON N3Y 4H8
                                    </dd>
                                </div>
                                <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                                    <dt className="font-semibold text-gray-900">To</dt>
                                    <dd className="mt-2 text-gray-500">
                                        <span className="font-medium text-gray-900">Tuple, Inc</span>
                                        <br/>
                                        886 Walter Street
                                        <br/>
                                        New York, NY 12345
                                    </dd>
                                </div>
                            </dl>
                            <table className="mt-16 w-full whitespace-nowrap text-left text-sm/6">
                                <colgroup>
                                    <col className="w-full"/>
                                    <col/>
                                    <col/>
                                    <col/>
                                </colgroup>
                                <thead className="border-b border-gray-200 text-gray-900">
                                <tr>
                                    <th scope="col" className="px-0 py-3 font-semibold">
                                        Projects
                                    </th>
                                    <th scope="col"
                                        className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                                        Hours
                                    </th>
                                    <th scope="col"
                                        className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                                        Rate
                                    </th>
                                    <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                                        Price
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoice.items.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100">
                                        <td className="max-w-0 px-0 py-5 align-top">
                                            <div className="truncate font-medium text-gray-900">{item.title}</div>
                                            <div className="truncate text-gray-500">{item.description}</div>
                                        </td>
                                        <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                                            {item.hours}
                                        </td>
                                        <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                                            {item.rate}
                                        </td>
                                        <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">{item.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th scope="row" className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">
                                        Subtotal
                                    </th>
                                    <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                                    >
                                        Subtotal
                                    </th>
                                    <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">{invoice.subTotal}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
                                        Tax
                                    </th>
                                    <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                                    >
                                        Tax
                                    </th>
                                    <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">{invoice.tax}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
                                        Total
                                    </th>
                                    <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                                    >
                                        Total
                                    </th>
                                    <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
                                        {invoice.total}
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
