import {createLogMessage} from "@/lib/logger";
import {withErrorHandling} from "@/lib/request/withErrorHandling";
import {STP_SECRET_KEY} from "@/constants/stripe";
import {get, isNull, size} from 'lodash';
import {createReport} from "@/lib/db";
import {TReport} from "@/lib/types/TReport";
import {extractError} from "@/lib/request/helpers";
import {payment_tears_settings, SEND_CREATE_PAYMENT_INTENT} from "@/constants";
import {TTier} from "@/lib/types/TTier";
import {createPaymentIntent} from "@/lib/db/payment_intent";
import {TPaymentIntent} from "@/lib/types/TPaymentIntent";
import { auth, currentUser } from '@clerk/nextjs/server'
import {upsertUser} from "@/lib/db/user";
import { User } from "@clerk/clerk-sdk-node";
import {TUserInput} from "@/lib/types/TUser";


const stripe = require('stripe')(STP_SECRET_KEY);

const handler = async (request: Request) => {
    const { userId } = await auth()
    const user = await currentUser() as TUserInput;

    if (!userId) {
        return new Response('Unauthorized', { status: 401 })
    }

    /*TODO: need to check for error on user create */
    if(!isNull(user))  upsertUser(user);

    const body = await request.json();
    const tier = get(body,'tier',{});
    const selectedTier:TTier | undefined  = payment_tears_settings.find(({id}) => tier.id === id );

    let report: TReport;

    const amount = selectedTier?.amount;

    if(!amount || amount <= 0){
        throw `Received a wrong tier and can not get correct amount: ${JSON.stringify(tier)}`
    }

    try {
        report = await createReport({
            ...body,
            user,
            totalLines: size(get(body, "file.data")),
        });

    } catch (error: TError | unknown) {
        throw extractError(error);
    }

    const paymentIntent = await stripe.paymentIntents.create({
        //TODO: replace with items calculator
        amount,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            recordId: get(report, "id") // Attach your recordId here
        }
    });
    let dbPaymentIntent: TPaymentIntent;

    try{
       dbPaymentIntent =  await createPaymentIntent(report,paymentIntent);
    }catch(e){
        throw `Payment was not created because of this error: ${JSON.stringify(e)}`
    }

    createLogMessage({
        message: 'E/H - created payment intent',
        messageType: SEND_CREATE_PAYMENT_INTENT,
        data:dbPaymentIntent,
        request
    })
    return Response.json({
        status: 'ok',
        clientSecret: paymentIntent.client_secret,
        pi: paymentIntent
    })
}

export const POST = withErrorHandling(handler)