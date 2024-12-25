import {  S3Client } from "@aws-sdk/client-s3";

const clientConfig = ({
    credentials: {
      accessKeyId:  process.env.S3_ACCEASS_KEY,
      secretAccessKey:   process.env.S3_SECRET_ACCESS_KEY
    },
    region: "us-east-1"
})

const s3Client = new S3Client(clientConfig)

export default s3Client;