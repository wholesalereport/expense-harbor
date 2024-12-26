'use client'
import React, {useEffect, useState} from 'react';

import _, {isEmpty, isNull} from "lodash";
import {NoReportsComponent} from "@/src/components/reports/NoReportsComponent";
import {LoadingIndicatorComponent} from "@/src/components/reports/LoadingIndicatorComponent";
import {Report} from '@prisma/client'

import {HeaderComponent} from "@/src/components/reports/HeaderComponent";
import {ReportsComponent} from "@/src/components/reports/ReportsComponent";
import PieChartComponent from '../../src/components/visualisations/PieChartComponent'
import {ChartData} from "@/lib/types/ChartDataType";
import TransactionsTable from "@/src/components/reports/TransactionsTableComponent";


type TAggregateResponse = {
    category_counts: Record<string, number>,
    category_totals: Record<string, number>
}

export default function Page() {
    const [reports, setReports] = useState<Report[] | null>(null);
    const [loading,setLoading] = useState<boolean>(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null)
    const [categoryTotals,setCategoryTotals] = useState<ChartData | null | {}>(null);
    const [transactions,setTransactions] = useState<unknown[]>();
    const [loadingCategoryTotals,setLoadingCategoryTotals] = useState<boolean>(false);
    const [loadingTransactions,setLoadingTransactions] = useState<boolean>(false)

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
            setSelectedReport(_.first(reports))
        }).catch(e => {
            console.error(e);
        }).finally(() => {
            setLoading(false)
        })
    }, [])

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

    if (!isNull(reports) && isEmpty(reports) && !loading) {
        return <NoReportsComponent/>

    }

    if(loading || isNull(reports)){
        return <LoadingIndicatorComponent />
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const statuses = {
        complete: 'text-green-700 bg-green-50 ring-green-600/20',
        in_progress: 'text-gray-600 bg-gray-50 ring-gray-500/10',
        open: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
    }



    return (
        <>
            <main>
                <HeaderComponent />
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {/* List of reports */}
                        <ReportsComponent reports={reports} selectedReport={selectedReport} setSelectedReport={setSelectedReport}  />
                        {/* Report */}
                        <div
                            className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                            <h2 className="text-base font-semibold text-gray-900">Report</h2>
                            <dl className="mt-6 grid grid-cols-1 text-sm/6 sm:grid-cols-2">
                                <div className="sm:pr-4">
                                    <dt className="inline text-gray-500">Created on:</dt>
                                    <dd className="inline text-gray-700">
                                        <time dateTime={new Date(selectedReport?.createdAt || new Date).toDateString()}>
                                            {new Date(selectedReport?.createdAt || new Date).toDateString()}
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
                                {categoryTotals && <PieChartComponent data={categoryTotals} />}
                            </div>
                            {!isEmpty(transactions) && <TransactionsTable data={transactions} />}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
