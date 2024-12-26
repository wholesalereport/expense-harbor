import {createLogMessage} from "@/lib/logger";
import {withErrorHandling} from "@/lib/request/withErrorHandling";
import {STP_SECRET_KEY} from "@/constants/stripe";
import {get, isNull, size} from 'lodash';
import {createReport} from "@/lib/db";
import {TReport} from "@/lib/types/TReport";
import {extractError} from "@/lib/request/helpers";
import {
    COMPLETING_PAYMENT_REPORT,
    CREATED_REPORT,
    payment_tears_settings,
    SEND_CREATE_PAYMENT_INTENT
} from "@/constants";
import {TTier} from "@/lib/types/TTier";
import {createPaymentIntent} from "@/lib/db/payment_intent";
import {TPaymentIntent} from "@/lib/types/TPaymentIntent";
import {auth, currentUser} from '@clerk/nextjs/server'
import {upsertUser} from "@/lib/db/user";
import {User} from "@clerk/clerk-sdk-node";
import {TUserInput} from "@/lib/types/TUser";
import {Report} from "@prisma/client";


const stripe = require('stripe')(STP_SECRET_KEY);

//const handler
const handler = async (request: Request) => {
    const {userId} = await auth()
    const user = await currentUser() as TUserInput;

    if (!userId) {
        return new Response('Unauthorized', {status: 401})
    }

    /*TODO: need to check for error on user create */
    if (!isNull(user)) upsertUser(user);

    const body = await request.json();
    const tier = get(body, 'tier', {});
    const selectedTier: TTier | undefined = payment_tears_settings.find(({id}) => tier.id === id);
    const totalLines = size(get(body, "file.data"))

    let report: Report;
    let paymentIntent;

    const amount = selectedTier?.amount;

    if (!amount || amount <= 0) {
        throw `Received a wrong tier and can not get correct amount: ${JSON.stringify(tier)}`
    }


    report = await createReport({
        ...body,
        userId,
        totalLines
    });

    const reportId = get(report,"id");

    createLogMessage({
        message: 'E/H - created report',
        messageType: CREATED_REPORT,
        data: {
            userId,
            report,
            totalLines
        },
        request
    })

    paymentIntent = await stripe.paymentIntents.create({
        //TODO: replace with items calculator
        amount,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            reportId// Attach your recordId here
        },
    });


    createLogMessage({
        message: 'E/H - created payment intent',
        messageType: CREATED_REPORT,
        data: {
            userId,
            reportId,
            totalLines
        },
        request
    })

    let dbPaymentIntent: TPaymentIntent;

    dbPaymentIntent = await createPaymentIntent(report, paymentIntent, userId);

    createLogMessage({
        message: 'E/H - created payment intent',
        messageType: SEND_CREATE_PAYMENT_INTENT,
        data: dbPaymentIntent,
        request
    })

    return Response.json({
        status: 'ok',
        clientSecret: paymentIntent.client_secret,
        pi: paymentIntent,
        report
    })
}

export const POST = withErrorHandling(handler);