import {COMPLETING_PAYMENT_REPORT, SEND_CREATE_PAYMENT_INTENT, STP_SECRET_KEY, SUCCESS_STATUS} from "@/constants";
import {auth, currentUser} from "@clerk/nextjs/server";
import {updatePaymentIntent} from "@/lib/db/payment_intent";
import {createLogMessage} from "@/lib/logger";
import {withErrorHandling} from "@/lib/request/withErrorHandling";
import {NextResponse} from "next/server";
import {get, isNull} from "lodash";
import {TPaymentIntent} from "@/lib/types/TPaymentIntent";

const stripe = require('stripe')(STP_SECRET_KEY);

const handler = async (request: Request, {params}) => {
    const {paymentIntentId} = await params || {};
    const {userId} = await auth()
    const user = await currentUser();

    if (!user || isNull(userId)) {
        throw 'User is not authenticated';
    }

    createLogMessage({
        message: 'E/H - completing payment',
        messageType: COMPLETING_PAYMENT_REPORT,
        data: {userId, paymentIntentId},
        request
    })
    const paymentIntent: TPaymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const reportId = get(paymentIntent,"metadata.reportId")

    if(!reportId || isNull(reportId)){
        throw `Can not update payment id: ${paymentIntentId} Missing report`
    }

    const updatedPi = await updatePaymentIntent(paymentIntent, userId,reportId);

    createLogMessage({
        message: 'E/H - completing payment',
        messageType: COMPLETING_PAYMENT_REPORT,
        data: {userId, updatedPi, status: updatedPi?.status},
        request
    })


    return NextResponse.json({
        paymentIntent,
        status: updatedPi.status
    })

}

// @ts-ignore
export const POST = withErrorHandling(handler)
