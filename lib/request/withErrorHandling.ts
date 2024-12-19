//@ts-nocheck
import {sendEmailByType} from "@/lib/emailing/send-grid";
import {SEND_GENERAL_ERROR_ALERT} from "@/constants/emailing";
import _ from "lodash";

export function withErrorHandling(
    handler: (req: Request) => Promise<Response>
) {
    return async (req: Request): Promise<Response> => {
        const {query,url,body,user,headers} = req;

        try {
            return await handler(req);
        } catch (error) {
            const errorDetails = {
                headers,
                error,
                errorStack: _.get(error,'stack'),
                errorMessage: _.get(error,'message'),
                url,
                query,
                body:_.omit(body,['fileData']),
                user: _.get(user,"email","unknown")
            };

            console.error('Error caught in higher-order function:', error);
            sendEmailByType({
                emailType: SEND_GENERAL_ERROR_ALERT,
                text: JSON.stringify(errorDetails,null,2)
            });
            return  Response.json(
                { status: 500, error: JSON.stringify({ error}) }
            );
        }
    };
}
