import s3Client from './s3Client'
import {GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3";
import {createLogMessage} from "@/lib/logger";
import {FILE_UPLOAD_SUCCESS, S3_DEFAULT_BUCKET} from "@/constants";

export const uploadFileToS3 = async ({
                                         bucket = S3_DEFAULT_BUCKET,
                                         fileName,
                                         body,
                                         user = {}
                                     }) => {
    const uploadCommand = new PutObjectCommand({
        Bucket: bucket,
        Key: fileName,
        Body: JSON.stringify(body)
    })
    const result = await s3Client.send(uploadCommand);

    createLogMessage({
        status: 'info',
        messageType: FILE_UPLOAD_SUCCESS,
        message: JSON.stringify(result),
        user
    });

    return result;
}

export const getUploadedFileFromS3 = async ({
                                                bucket = S3_DEFAULT_BUCKET,
                                                fileName
                                            }) => {

    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: fileName
    })
    return s3Client.send(command);
}
