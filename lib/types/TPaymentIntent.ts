export type TPaymentIntent = {
    id: string; // PaymentIntent ID
    amount: number; // Amount in the smallest currency unit (e.g., cents)
    currency: string; // Currency code (e.g., "usd")
    status:
        | "requires_payment_method"
        | "requires_confirmation"
        | "requires_action"
        | "processing"
        | "requires_capture"
        | "canceled"
        | "succeeded"; // PaymentIntentStatus enum
    reportId?: string | null; // Foreign key referencing Report
    userId: string;
    createdAt: Date; // Creation timestamp
    updatedAt: Date; // Last update timestamp,
    paymentMethodId?:string  | null;
    client_secret?:string
};
