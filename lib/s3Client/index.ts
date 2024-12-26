import s3Client from './s3Client'
import {GetObjectCommand, PutObjectCommand,ListObjectsV2Command} from "@aws-sdk/client-s3";
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

export const listFilesInS3 = async ({
                                        bucket = S3_DEFAULT_BUCKET,
                                        prefix = "", // Optional: Specify a prefix to filter files by folder or pattern
                                    }) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: bucket,
            Prefix: prefix, // Filter files (optional)
        });

        const response = await s3Client.send(command);

        // Check if the bucket contains any objects
        if (!response.Contents) {
            return [];
        }

        // Map the object keys (file names) to an array
        return response.Contents.map((object) => object.Key);
    } catch (error) {
        console.error("Error listing files in S3:", error);
        throw error;
    }
};