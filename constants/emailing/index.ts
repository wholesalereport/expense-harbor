export const ENABLE_EMAILS = process.env.ENABLE_EMAILS as string;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
export const DEFAULT_FROM_EMAIL = process.env.DEFAULT_FROM_EMAIL as string;
export const DEFAULT_CC_EMAIL = process.env.DEFAULT_CC_EMAIL as string;

export const SEND_GENERAL_ERROR_ALERT = 'SEND_GENERAL_ERROR_ALERT';

/* About Payments */

export const SEND_CREATE_PAYMENT_INTENT = 'SEND_CREATE_PAYMENT_INTENT';
export const COMPLETING_PAYMENT_REPORT = 'COMPLETING_PAYMENT_REPORT'

/* About Report */

export const CREATED_REPORT = 'CREATED_REPORT';

/* S3 related */
export const S3_FILE_UPLOAD_COMPLETE = 'S3_FILE_UPLOAD_COMPLETE';

/* Pub Sub */
export const SEND_MESSAGE_TO_PUB_SUB = 'SEND_MESSAGE_TO_PUB_SUB';