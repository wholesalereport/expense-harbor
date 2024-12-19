import prisma from '../../../lib/db/prisma_client'
import {TPaymentIntent} from "@/lib/types/TPaymentIntent";
import {TReport} from "@/lib/types/TReport";
import {Prisma} from "@prisma/client";


export async function createPaymentIntent(report: TReport, paymentIntentData: TPaymentIntent ): Promise<TPaymentIntent> {

    try {

        if (!report) {
            throw `Report object is missing not found`;
        }

        // Step 2: Create PaymentIntent and link it to the existing report
        const paymentIntent = await prisma.paymentIntent.create({
            data: {
                id: paymentIntentData.id, // PaymentIntent ID from Stripe
                amount: paymentIntentData.amount,
                currency: paymentIntentData.currency,
                paymentMethodId: paymentIntentData.paymentMethodId,
                status: paymentIntentData.status,
                report: {
                    connect: { id: report?.id }, // Link to the existing report
                },
            },
        });
        return paymentIntent;
    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}
type TUpdatePayment = (paymentIntent: TPaymentIntent | Record<string, unknown | string | number>) =>Promise<TPaymentIntent>;

export const updatePaymentIntent:TUpdatePayment = async (pi = {}) => {
    let paymentIntent: TPaymentIntent;
    try {
        const {id} = pi;
        // Perform the update
         paymentIntent = await prisma.paymentIntent.update({
            where: { id: id as string }, // Ensure the record exists
            data: {
                ...pi,
                updatedAt: new Date(), // Update the timestamp
            },
        });

        console.log('PaymentIntent updated successfully:', paymentIntent);
        return paymentIntent;

    } catch (error) {
        // Handle record not found error
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw `PaymentIntent with ID '${(pi as TPaymentIntent).id}' does not exist.`;
            }
        }

        throw error;
    } finally {
        await prisma.$disconnect();
    }
}
