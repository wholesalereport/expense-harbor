type PaymentIntent = {
    id: string;
    object: string;
    amount: number;
    amount_details: {
        tip: Record<string, unknown>;
    };
    automatic_payment_methods: {
        allow_redirects: string;
        enabled: boolean;
    };
    canceled_at: number | null;
    cancellation_reason: string | null;
    capture_method: string;
    client_secret: string;
    confirmation_method: string;
    created: number;
    currency: string;
    description: string | null;
    last_payment_error: string | null;
    livemode: boolean;
    next_action: unknown | null;
    payment_method: string;
    payment_method_configuration_details: {
        id: string;
        parent: string | null;
    };
    payment_method_types: string[];
    processing: unknown | null;
    receipt_email: string | null;
    setup_future_usage: string | null;
    shipping: unknown | null;
    source: unknown | null;
    status: string;
};

/*
sample
{
    "id": "pi_3Q...",
    "object": "payment_intent",
    "amount": 2000,
    "amount_details": {
        "tip": {}
    },
    "automatic_payment_methods": {
        "allow_redirects": "always",
        "enabled": true
    },
    "canceled_at": null,
    "cancellation_reason": null,
    "capture_method": "automatic_async",
    "client_secret": "pi_....",
    "confirmation_method": "automatic",
    "created": 1733683581,
    "currency": "usd",
    "description": null,
    "last_payment_error": null,
    "livemode": false,
    "next_action": null,
    "payment_method": "pm_1Q...,
    "payment_method_configuration_details": {
        "id": "pmc_1L9i...",
        "parent": null
    },
    "payment_method_types": [
        "card",
        "link"
    ],
    "processing": null,
    "receipt_email": null,
    "setup_future_usage": null,
    "shipping": null,
    "source": null,
    "status": "succeeded"
}
 */
