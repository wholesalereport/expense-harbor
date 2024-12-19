type TError = {
    type: string;
    message: string;
    [key: string]: any; // Optional: To allow additional properties
};

export function extractError(error: TError | unknown): string | unknown {
    if (isTError(error)) {
        switch (error.type) {
            case 'StripeCardError':
            case 'StripeInvalidRequestError':
            case 'StripeAPIError':
            case 'StripeConnectionError':
            case 'StripeAuthenticationError':
            case 'StripeRateLimitError':
                return error.message;
            default:
                return error;
        }
    }
    return error; // Return the raw error if it doesn't match TError
}

// Type guard to check if the error matches the TError shape
function isTError(error: unknown): error is TError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'type' in error &&
        'message' in error
    );
}
