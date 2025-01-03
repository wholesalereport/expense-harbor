import jwt from "jsonwebtoken";
import {AUTHENTICATOR_ID} from "@/constants/auth";
import {createLogMessage} from "@/lib/logger";

export async function validateUserId(request: Request): Promise<{userId: string}> {
    const authHeader = request.headers.get('authorization') || "";
    const token = authHeader.split(' ')[1];
    const {id} = await  jwt.verify(token, process.env.CLERK_SECRET_JWT_TOKEN) || {};
    if(id !== AUTHENTICATOR_ID){
        console.error({id,my: AUTHENTICATOR_ID})
        createLogMessage({
            message: 'E/H - report/status was accessed by an unauthorized user',
            messageType: 'UNAUTHORISED_UER_REPORT_STATUS',
            data: {id,AUTHENTICATOR_ID},
            request
        })
        throw new Error("User with this token is not authorised for this route")
    }
    return {userId: id};
}

/**
 * @deprecated don't use, do it direclty like  in reports/status
 * @param handler
 */
export  function withManualAuth(
    handler: (req: Request, params?: { [key: string]: any } | undefined) => Promise<Response>
) {
    return async (req: Request, params?: { [key: string]: any }) => {
        const {userId} = await validateUserId(req);
        return await handler(req, { ...params, userId });
    }
}