//@ts-nocheck
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {forwardRef, useImperativeHandle, useState} from "react";


const CheckoutForm = forwardRef((props, ref) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useImperativeHandle(ref, () => ({
        async handlePayment(clientSecret) {
            if (!stripe || !elements) {
                setError("Stripe has not loaded yet.");
                return null;
            }

            const cardElement = elements.getElement(CardElement);

            const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                setError(error.message);
            }
            return {error,paymentIntent};
        },
        validateForm() {
            const cardElement = elements?.getElement(CardElement);
            if (!cardElement || !cardElement._complete) {
                setError("Please complete the payment form.");
                return false;
            }
            setError("");
            return true;
        },
    }));


    return (
        <>
            {error && <div className={"text-amber-900"}>{error}</div>}
            <CardElement
                options={{
                    style: {
                        backgroundColor: "#000",
                        base: {
                            "background":"red",
                            "background-color": "#1e1e1e",
                            fontSize: "16px",
                            color: "#424770",
                            border: "1px solid #333333",
                            "::placeholder": { color: "#aab7c4" },
                        },
                        invalid: { color: "#9e2146" },
                    },
                }}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
        </>
    );
});

export default CheckoutForm;
