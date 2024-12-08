import {createLogMessage} from "@/lib/logger";
import {withErrorHandling} from "@/lib/request/withErrorHandling";
import {STP_SECRET_KEY, STP_PRICE_ID} from "@/constants/stripe";

const stripe= require('stripe')(STP_SECRET_KEY);
const handler = async (request: Request) => {
    createLogMessage({
        messageType: 'testing',
        message: 'testing logger',
        request
    })

    const paymentIntent = await stripe.paymentIntents.create({
        //TODO: replace with items calculator
        amount: 2000,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true,
        }
    });
    return Response.json({status: 'ok',
        clientSecret: paymentIntent.client_secret,
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    })
}

export const POST = withErrorHandling(handler)