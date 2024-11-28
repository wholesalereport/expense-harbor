'use client'

import {useRootLayout} from "@/src/contexts/reports-context";

export default function ReportsBody(){
    const {  navId } = useRootLayout();

    return(
        <div>{navId}</div>
    )
}