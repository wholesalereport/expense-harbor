'use server';

import {uploadFileToS3} from "@/lib/s3Client";
import {withErrorHandling} from "@/lib/request/withErrorHandling";
import {createLogMessage} from "@/lib/logger";
import {FILE_UPLOAD_ERROR, S3_FILE_UPLOAD_COMPLETE, SEND_MESSAGE_TO_PUB_SUB} from "@/constants";
import {sendGeneralErrorAlert} from "@/lib/emailing/send-grid";
import {auth, currentUser} from "@clerk/nextjs/server";
import {buildMessage} from "@/lib/pub_sub/helpers";
import {sendPubSubMessage} from "@/lib/pub_sub/client";

const handler = async (request: Request): Promise<Response> => {
    const {userId} = await auth()
    const user = await currentUser();

    if(!user){
        return Response.json({
            status: 403,
            message: 'Authentication required'
        })
    }

    const {report,data} = await request.json();

    if (!report) {
        throw `Report can not be empty`
    }

    if(!data){
        await sendGeneralErrorAlert({
            subject: 'E/H Alert - Missing upload data',
            text: JSON.stringify({
                data,
                report,
                user
            })
        })
        return Response.json({
            status: 500,
            message: 'File data is required to continue'
        })
    }


    const fileMetaData = await uploadFileToS3(
        {fileName: `${report.id}.json`, body: data, user}
    ).catch(e => {
        console.error(e);
        createLogMessage({
            status: 'error',
            messageType: FILE_UPLOAD_ERROR,
            message: JSON.stringify(e, null, 2),
            user
        });
        sendGeneralErrorAlert({
            subject: 'E/H Alert - File Upload Error',
            text: JSON.stringify({
                e,
                user
            }, null, 2)
        })
        throw new Error(JSON.stringify(e,null,2))
    })

    createLogMessage({
        message: 'E/H - uploaded file to s3',
        messageType: S3_FILE_UPLOAD_COMPLETE,
        data: {userId, fileMetaData},
        request
    })

    const pubSubResponse = await sendPubSubMessage(buildMessage(report,user))

    createLogMessage({
        message: 'E/H - send message to pub/sub',
        messageType: SEND_MESSAGE_TO_PUB_SUB,
        data: {pubSubResponse},
        request
    })

    return Response.json({
        status: 200,
        report
    })

}

export const POST = withErrorHandling(handler)