import _ from "lodash";
import React from "react";
import {REPORT_STATUSES} from "@/constants";
import {Report} from "@prisma/client";
import {getTitle} from "@/src/components/reports/helpers";
import {startCase} from 'lodash';
import {getCurrency} from "@/src/utils";

const classNameForReportByStatus = (status: string): string => {
    switch (status) {
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

function getStatusStyles(status: string) {
    switch (status) {
        case 'complete':
            return 'bg-green-50 text-green-700 ring-green-600/20';
        case 'in_progress':
            return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
        default:
            return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
}

export const ReportsComponent = ({reports, selectedReport, setSelectedReport}) => {

    const handleOnSelectReport = (report: Report) => setSelectedReport(report);

    return (
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
                                <li
                                    key={report.id}
                                    className={`relative flex flex-col px-2 py-4  ${
                                        selectedReport?.id === report.id
                                            ? "bg-indigo-100 ring-2 ring-indigo-500"
                                            : "hover:bg-gray-50"
                                    }`}
                                    onClick={() => setSelectedReport(report)}
                                >
                                    <div className="flex  w-full">
                                        <p className="text-sm font-semibold text-gray-900 break-words flex-grow">
                                            {getTitle(report)}
                                        </p>
                                    </div>
                                    <div
                                        className="mt-2 flex justify-between items-center text-xs text-gray-500 w-full">
                                        <span>
                                            <time className="text-sm">
                                              {new Date(report.createdAt).toLocaleDateString('en-US', {
                                                  weekday: 'short',
                                                  year: 'numeric',
                                                  month: 'short',
                                                  day: 'numeric'
                                              })}
                                            </time>
                                        </span>
                                        <span><b>Lines</b>:&nbsp; {report.totalLines}</span>
                                        <span><b>Total</b>:&nbsp; {getCurrency("USD")}{report.totalAmountSpent}</span>
                                        <span className="flex items-end">
                                            <span
                                                className={`inline-flex items-start rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyles(report.status)}`}>
                                                    {startCase(report.status)}
                                            </span>
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                    <a href="/reports/new" className="text-sm/6 font-semibold text-gray-900">
                        Create Report <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
        </div>

    )
}

/*
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
                                                {_.truncate(getTitle(report), {length: 25})}
                                            </p>
                                            <p className="mt-1 flex text-xs/5 text-gray-500">
                                                {report?.createdAt && new Date(report?.createdAt).toDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-x-4">
                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm/6 text-gray-900">Transactions: <span
                                                className={"font-semibold"}>{report.totalLines}</span></p>
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
 */