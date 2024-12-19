// 'use server'
import {createLogMessage} from "@/lib/logger";
import getRawBody from 'raw-body';

import {withErrorHandling} from "@/lib/request/withErrorHandling";
import {STP_SECRET_KEY, STP_WEBHOOK_SECRET} from "@/constants";
import Stripe from "stripe";
// const stripe= require('stripe')(STP_SECRET_KEY);

export const config = {
    api: {
        bodyParser: false, // Disable the default parser
    },
};




const handler = async (request: Request) => {
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
        throw 'Webhook Error: Missing stripe-signature header.';
    }

    if (!STP_WEBHOOK_SECRET) {
        throw new Error('STP_WEBHOOK_SECRET is not set in the environment variables.');
    }

    if (!STP_SECRET_KEY) {
        throw new Error('STP_SECRET_KEY is not set in the environment variables.');
    }
    const stripe = new Stripe(STP_SECRET_KEY, {
        apiVersion: '2024-11-20.acacia',
    });

    const body = await request.text();

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, STP_WEBHOOK_SECRET);
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw `Webhook Error: ${err.message}`;
        }
        throw `Webhook Error: An unknown error occurred`;
    }

    // console.log({
    //     event: JSON.stringify(event,null,2),
    //     type: event.type
    // });

    return Response.json({'received': true});
};


export const POST = withErrorHandling(handler)