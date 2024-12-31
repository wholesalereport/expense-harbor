import React, {useEffect, useMemo, useState} from 'react';
import {getTitle} from "@/src/components/reports/helpers";
import {Report} from '@prisma/client'
import {REPORT_STATUSES} from "@/constants";
import {ChartData} from "chart.js";
import {isEmpty} from "lodash";
import {FaFileCsv, FaFileExcel} from "react-icons/fa";
import {exportToCSV, exportToExcel} from "@/src/components/helpers/export";
import {TableSkeletonComponent} from "@/src/components/reports/TableSkeletonCompnent";
import TransactionsTable from "@/src/components/reports/TransactionsTableComponent";
import PieChartComponent from "@/src/components/visualisations/PieChartComponent";


type TAggregateResponse = {
    category_counts: Record<string, number>,
    category_totals: Record<string, number>
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export const ReportComponent = ({selectedReport}:{selectedReport: Report | null}) => {

    const statuses = {
        complete: 'text-green-700 bg-green-50 ring-green-600/20',
        in_progress: 'text-gray-600 bg-gray-50 ring-gray-500/10',
        open: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
    }

    const [categoryTotals,setCategoryTotals] = useState<ChartData | null | {}>(null);
    const [transactions,setTransactions] = useState<unknown[]>();
    const [loadingCategoryTotals,setLoadingCategoryTotals] = useState<boolean>(false);
    const [loadingTransactions,setLoadingTransactions] = useState<boolean>(false)

    useEffect(() => {
        if(!isEmpty(selectedReport)){
            setLoadingCategoryTotals(true)
            setLoadingTransactions(true)
            fetch(`/api/reports/aggregates/${selectedReport.id}`)
                .then(response => response.json())
                .then(({data}:{data: TAggregateResponse}) => {
                    if(isEmpty(data)) {
                        setCategoryTotals({})
                        return;
                    }

                    const {category_totals} = data || {}
                    setCategoryTotals(category_totals)
                })
                .catch(console.error)
                .catch(console.error)
                .finally(() => {
                    setLoadingCategoryTotals(false)
                })

            fetch(`/api/reports/transactions/${selectedReport.id}`)
                .then(response => response.json())
                .then(({data}:{data: unknown[]}) => {
                    if(isEmpty(data)) {
                        setTransactions([])
                        return;
                    }
                    setTransactions(data)
                })
                .catch(console.error)
                .finally(() => {
                    setLoadingTransactions(false)
                })

        }
    }, [selectedReport]);

    return (
        <div
            className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
            <h2 className="text-base font-semibold text-gray-900">{getTitle(selectedReport)}</h2>
            <dl className="mt-6 grid grid-cols-1 text-sm/6 sm:grid-cols-2">
                <div className="sm:pr-4">
                    <dt className="inline text-gray-500">Created on:</dt>
                    <dd className="inline text-gray-700">
                        <time dateTime={new Date(selectedReport?.createdAt || new Date).toDateString()}>
                            {new Date(selectedReport?.createdAt || new Date).toLocaleString()}
                        </time>
                    </dd>
                </div>
                <div className="mt-2 sm:mt-0 sm:pl-4 flex">
                    <dt className="inline text-gray-500">Status: &nbsp;</dt>
                    <dd className="inline text-gray-700">
                        <p
                            className={classNames(
                                statuses[selectedReport?.status || "open"],
                                'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                            )}
                        >
                            {selectedReport?.status}
                        </p>
                    </dd>
                </div>
            </dl>
            <div className="mt-6 pt-6 sm:pr-4 w-full h-96">
                {
                    loadingCategoryTotals &&
                    <div className="relative w-64 h-64 flex items-center justify-center">
                        <div id="skeleton"
                             className="absolute inset-0 bg-gray-200 rounded-full animate-pulse flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth="1.5" stroke="currentColor"
                                 className="w-12 h-12 text-gray-500">
                            </svg>
                        </div>
                    </div>
                }
                {!loadingCategoryTotals && categoryTotals && <PieChartComponent data={categoryTotals}/>}
            </div>
            <div className="sm:flex sm:items-center mb-5">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">Transactions</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the transactions that we've used to calculate totals.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    {transactions && <div className="flex space-x-4">
                        {/* Export to Excel */}
                        <button
                            onClick={() => exportToExcel(transactions, 'Report.xlsx')}
                            className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                        >
                            <FaFileExcel size={16}/>
                        </button>

                        {/* Export to CSV */}
                        <button
                            onClick={() => exportToCSV(transactions, 'Report.csv')}
                            className="flex items-center justify-center w-8 h-8 bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-100 focus:outline-none"
                        >
                            <FaFileCsv size={16}/>
                        </button>
                    </div>}
                </div>
            </div>
            {loadingTransactions && <TableSkeletonComponent/>}
            {!isEmpty(transactions) && <TransactionsTable data={transactions}/>}
        </div>

    )
}
