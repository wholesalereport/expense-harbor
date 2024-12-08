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
                return null;
            }

            return paymentIntent;
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
            <button type="submit" disabled={!stripe || loading}>
                {loading ? "Processing..." : "Pay"}
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
        </>
    );
});

export default CheckoutForm;

// const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//
//     const response = await fetch("/api/payments/payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: 5000 }), // Amount in cents
//     });
//
//     const { clientSecret } = await response.json();
//
//     const cardElement = elements.getElement(CardElement);
//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//             card: cardElement,
//         },
//     });
//
//     if (error) {
//         setError(error.message);
//     } else {
//         console.log("PaymentIntent:", paymentIntent);
//         alert("Payment successful!");
//     }
//
//     setLoading(false);
// };
