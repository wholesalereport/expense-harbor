import {withErrorHandling} from "@/lib/request/withErrorHandling";
import {withManualAuth} from "@/lib/request/withManualAuth";
import {updateReport} from "@/lib/db";



const handler = async (request: Request,params?: { [key: string]: any }) => {
    const {report} = await request.json();
    const {userId} = params || {};
    const updatedReport = await updateReport({
        ...report,
        userId
    })
    return Response.json({status: 'ok', updatedReport})
}

export const POST = withErrorHandling(withManualAuth(handler));