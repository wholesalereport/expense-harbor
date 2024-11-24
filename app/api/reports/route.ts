import {createLogMessage} from "@/lib/logger";
import {withErrorHandling} from "@/lib/request/withErrorHandling";

const handler = async (request: Request) => {
    createLogMessage({
        messageType: 'testing',
        message: 'testing logger',
        request
    })
    return Response.json({status: 'ok'})
}

export const GET = withErrorHandling(handler)