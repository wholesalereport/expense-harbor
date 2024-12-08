//@ts-nocheck
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './CheckoutFormComponent'
import {forwardRef} from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const Checkout = forwardRef((props, ref) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm ref={ref} />
        </Elements>
    );
});