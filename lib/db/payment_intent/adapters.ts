import {PaymentIntentStatus} from "@prisma/client";
import {TPaymentIntent} from "@/lib/types/TPaymentIntent";
//PaymentIntent & Pick<TPaymentIntent,"paymentMethodId" | "userId" | "reportId"> {
//     return {

type TPaymentIntentInput = (paymentIntentData: TPaymentIntent, userId: string) => TPaymentIntent;

export const paymentIntentAdapter: TPaymentIntentInput = (paymentIntentData: TPaymentIntent, userId) => ({
    id: paymentIntentData.id,
    amount: paymentIntentData.amount,
    currency: paymentIntentData.currency,
    paymentMethodId: paymentIntentData.paymentMethodId,
    status: paymentIntentData.status as PaymentIntentStatus, // Ensure the correct type is used
    userId,
    createdAt: paymentIntentData.createdAt,
    updatedAt: paymentIntentData.updatedAt
})

