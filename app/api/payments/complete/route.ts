import {STP_SECRET_KEY} from "@/constants";

const stripe = require('stripe')(STP_SECRET_KEY);

const handler = async (request: Request) => {
    const {paymentIntentId} = await request.json();

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);


}