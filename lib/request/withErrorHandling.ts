//@ts-nocheck
import {sendEmailByType} from "@/lib/emailing/send-grid";
import {SEND_GENERAL_ERROR_ALERT} from "@/constants/emailing";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function getRequestDetails(req: Request): Promise<Record<string, any>> {
    try {
        // Extract headers as an object
        const headers: Record<string, string> = {};
        req.headers.forEach((value, key) => {
            headers[key] = value;
        });

        // Extract query parameters from the URL
        const url = new URL(req.url);
        const query: Record<string, string> = {};
        url.searchParams.forEach((value, key) => {
            query[key] = value;
        });

        // Safely handle the body
        let body: Record<string, any> | null = null;
        if (req.method !== "GET" && req.method !== "HEAD") {
            const contentType = headers["content-type"];
            if (contentType && contentType.includes("application/json")) {
                try {
                    body = await req.json(); // Parse JSON body
                } catch (error) {
                    console.warn("Failed to parse JSON body:", error);
                    body = null; // Fallback to null if parsing fails
                }
            }
        }

        // Construct the details object
        return {
            method: req.method,
            url: req.url,
            headers,
            query,
            body,
        };
    } catch (error) {
        console.error("Error extracting request details:", error);
        throw new Error("Failed to extract request details");
    }
}


export function withErrorHandling(
    handler: (req: Request, params: { [key: string]: any }) => Promise<Response>
) {
    return async (req: Request, params: { [key: string]: any }) => {
        try {
            return await handler(req, params);
        } catch (error: any) {
            console.error("Error caught in handler:", error);
            const requestDetails = await  getRequestDetails(req);

            sendEmailByType({
                emailType: SEND_GENERAL_ERROR_ALERT,
                text: JSON.stringify({errorStack: error.stack,errorMessage: error.message,requestDetails})
            });
            return NextResponse.json(
                {
                    status: "error",
                    message: error.message || "An unexpected error occurred.",
                },
                { status: 500 }
            );
        }
    };
}



// export function withErrorHandling(
//     handler: (req: Request, params: { [key: string]: any }) => Promise<Response>
// ) {
//     return async (req: Request,params): Promise<Response> => {
//         const p = await params;
//
//         try {
//             return await handler(req, params);
//         } catch (error) {
//             const errorDetails = {
//                 ...(await getRequestDetails(req)),
//                 error,
//                 errorStack: _.get(error,'stack'),
//                 errorMessage: _.get(error,'message'),
//                 params: p
//             };
//
//             console.error('Error caught in higher-order function:', error);
//             sendEmailByType({
//                 emailType: SEND_GENERAL_ERROR_ALERT,
//                 text: JSON.stringify(errorDetails,null,2)
//             });
//             return  NextResponse.json(
//                 { status: 500, error: JSON.stringify({ error}) }
//             );
//         }
//     };
// }
