'use client'
import React, {useEffect, useMemo, useState} from 'react';
import {FaFileCsv, FaFileExcel} from 'react-icons/fa'; // Install react-icons if not already installed

import _, {isEmpty, isNull} from "lodash";
import {NoReportsComponent} from "@/src/components/reports/NoReportsComponent";
import {LoadingIndicatorComponent} from "@/src/components/reports/LoadingIndicatorComponent";
import {Report} from '@prisma/client'

import {HeaderComponent} from "@/src/components/reports/HeaderComponent";
import {ReportsComponent} from "@/src/components/reports/ReportsComponent";
import {ReportComponent} from "@/src/components/reports/ReportComponent";
import {REPORT_STATUSES} from "@/constants";
import {ReportPendingComponent} from "@/src/components/reports/ReportPendingComponent";


export default function Page() {
    const [reports, setReports] = useState<Report[] | null>(null);
    const [loading,setLoading] = useState<boolean>(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null)
    const isReportPending = useMemo(() => selectedReport?.status === REPORT_STATUSES.PENDING,[selectedReport?.status]);

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


    if (!isNull(reports) && isEmpty(reports) && !loading) {
        return <NoReportsComponent/>

    }

    if(loading || isNull(reports)){
        return <LoadingIndicatorComponent />
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
                        {isReportPending && <ReportPendingComponent />}
                        {!isReportPending && <ReportComponent selectedReport={selectedReport} />}

                    </div>
                </div>
            </main>
        </>
    )
}
