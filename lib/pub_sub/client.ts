import {PubSub} from "@google-cloud/pubsub";
import {
    PUB_SUB_PROJECT_ID,
    PUB_SUB_TOPIC_NAME_OR_ID
} from "@/constants";


const pubSubCredentials = {
    "type": "service_account",
    "project_id": "expense-harbor-queue",
    "private_key_id": process.env.PUB_SUB_PK_ID,
    "private_key": process.env.PUB_SUB_PRIVATE_KEY,
    "client_email": process.env.PUB_SUB_CLIENT_EMAIL ,
    "client_id": process.env.PUB_SUB_CLIENT_ID ,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/expense-harbor-service-account%40expense-harbor-queue.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}


const pubsub = new PubSub({
    projectId: PUB_SUB_PROJECT_ID,
    credentials: pubSubCredentials
});
export const sendPubSubMessage = async (
    message = {}
) => {
    if (!message || !PUB_SUB_TOPIC_NAME_OR_ID) {
        throw `Topic Name or Message are missing:  ${message} ${PUB_SUB_TOPIC_NAME_OR_ID}`;
    }

    const topic = pubsub.topic(PUB_SUB_TOPIC_NAME_OR_ID);

    // Prepare the message as a string or buffer
    const messageBuffer = Buffer.from(
        JSON.stringify(message)
    );
    // Publish the message
    return topic.publishMessage({data: messageBuffer});
}