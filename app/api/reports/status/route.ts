import {withErrorHandling} from "@/lib/request/withErrorHandling";
import {validateUserId, withManualAuth} from "@/lib/request/withManualAuth";
import {findReportByIdAndUserId, updateReport} from "@/lib/db";
import {createLogMessage} from "@/lib/logger";


const handler = async (request: Request, params?: { [key: string]: any }) => {
    const {report = {}} = await request.json();
    const {userId} = await validateUserId(request);

    createLogMessage({
        message: 'E/H - updating status of the report',
        messageType: 'UPDATING_REPORT_STATUS',
        data: JSON.stringify({
            userId,
            report
        }),
        request
    })

    const existingReport = await findReportByIdAndUserId(report?.id, userId)
    /*TODO; send error email */
    if (!existingReport) {
        throw `Missing Report: ${report?.id} user: ${userId}`
    }


    const updatedReport = await updateReport({
        ...existingReport,
        ...report,
        userId
    })

    return Response.json({status: 'ok', updatedReport})
}

export const POST = handler; //withErrorHandling(handler);

//withErrorHandling(withManualAuth(handler));