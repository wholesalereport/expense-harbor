import {SENDGRID_API_KEY} from "@/constants";
import {DEFAULT_CC_EMAIL, DEFAULT_FROM_EMAIL, SEND_GENERAL_ERROR_ALERT} from "@/constants";

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(SENDGRID_API_KEY)

interface TSendEmailParams {
    to?: string;              // Optional recipient email
    cc?: string;              // Optional CC email
    from?: string;            // Optional sender email
    subject?: string;         // Optional subject line
    text?: string | undefined;            // Optional plain text content
    object?: unknown;         // Optional object (not used in the function)
    html?: string;            // Optional HTML content
}

export const sendEmail = async ({to,cc, from, subject, text,object, html}:TSendEmailParams): Promise<void> => {
    const msg = {
        personalizations: [
            {
                to: {
                    "email": to
                },
                cc: [
                    {
                        "email":  cc ? cc : "info@wholesalereport.com"
                    }
                ]
            }
        ],
        from,
        subject,
        text: text ? text : JSON.stringify(object),
        html
    };
    return await sgMail.send(msg);
}

interface TSendEmailByTypeParams {
    emailType: string; // This is required
    to?: string;
    name?: string;
    object?: unknown;
    text?: string;
    subject?: string;
    disabled?: boolean;
    forgotPasswordToken?: string;
    report?: unknown;
}

export const sendEmailByType = async ({emailType, to, name,object, text, subject,disabled, forgotPasswordToken,report}: TSendEmailByTypeParams): Promise<void> => {
    if (process.env.ENABLE_EMAILS !== 'YES' || disabled) {
        console.warn("EMAIL SENDING IS DISABLED");
        console.log("Parameters",{emailType, to, name,object, text, subject,disabled, forgotPasswordToken,report})
        return;
    }

    switch (emailType) {
        case SEND_GENERAL_ERROR_ALERT:
            return await sendEmail({
                to: DEFAULT_CC_EMAIL,
                from: DEFAULT_FROM_EMAIL,
                subject: subject ? subject : `E/H Alert - ${emailType} `,
                text
            })
                .catch(e => {
                    console.error(JSON.stringify(e, null, 2));
                })
        default:
            return;
    }
}

export const sendGeneralErrorAlert = async ({emailType = SEND_GENERAL_ERROR_ALERT, subject = 'General Alert Error',text}) => {
    return await sendEmailByType({
        emailType,
        text,
        subject
    })
}
