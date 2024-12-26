import {auth} from "@clerk/nextjs/server";
import {withErrorHandling} from "@/lib/request/withErrorHandling";
import {NextResponse} from "next/server";
import {getFileFromS3} from "@/lib/s3Client";
import {createLogMessage} from "@/lib/logger";
import {COMPLETING_PAYMENT_REPORT} from "@/constants";

const handler = async (request: Request, {params}) => {
    const {userId} = await auth()
    const {report_id} = await params;

    if(!userId){
        return Response.json({status: 'User is not authorised'},{status: 403})
    }

    if(!report_id){
        return NextResponse.json({status: 'Report is empty can not download aggregates'},{status: 500})
    }
    createLogMessage({
        message: 'E/H - Downloading transactions files',
        messageType: 'DOWNLOADING_AGGREGATES_FILE',
        data: JSON.stringify({fileName: `${report_id}_aggregates.json`}),
        request
    })
    const data = await getFileFromS3({fileName: `${report_id}_aggregates.json`}) || {}


    return NextResponse.json({
        status: 'ok',
        //@ts-ignore
        data: JSON.parse(data)
    })

}

// @ts-ignore
export const GET = withErrorHandling(handler);