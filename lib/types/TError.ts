interface TError {
    type:
        | 'StripeCardError'
        | 'StripeInvalidRequestError'
        | 'StripeAPIError'
        | 'StripeConnectionError'
        | 'StripeAuthenticationError'
        | 'StripeRateLimitError';
    message: string;
    [key: string]: any; // Optional: To accommodate any additional properties
}