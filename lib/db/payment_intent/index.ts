import prisma from '../../../lib/db/prisma_client'
import {TReport} from "@/lib/types/TReport";
import {Prisma} from "@prisma/client";
import {PaymentIntent} from '@prisma/client';
import {paymentIntentAdapter} from './adapters'
import {TPaymentIntent} from "@/lib/types/TPaymentIntent";


export async function createPaymentIntent(
    report: TReport,
    paymentIntentData: PaymentIntent, // Omit<PaymentIntent, 'createdAt' | 'updatedAt' | 'reportId' | 'userId'>,
    userId: string,
): Promise<PaymentIntent> {
    if (!report || !report.id) {
        throw new Error(`Report object is missing or invalid`);
    }

    try {
        // Create PaymentIntent and link it to the existing report
        return await prisma.paymentIntent.create({
            data: {
                ...paymentIntentAdapter(
                    paymentIntentData,
                    userId
                ),
                reportId: report.id,
            } as PaymentIntent
    })
        ;
    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}


type TUpdatePayment = (pi: TPaymentIntent, userId: string , reportId: string) => Promise<PaymentIntent>;

export const updatePaymentIntent: TUpdatePayment = async (pi, userId, reportId) => {
    let paymentIntent: PaymentIntent;
    try {
        const {id} = pi;
        // Perform the update
        paymentIntent = await prisma.paymentIntent.update({
            where: {id: id as string, userId}, // Ensure the record exists
            data: {
                ...paymentIntentAdapter(pi, userId),
                reportId,
                updatedAt: new Date(), // Update the timestamp
            },
            include: {
                report: true, // Include the associated Report in the response
            },
        });

        console.log('PaymentIntent updated successfully:', paymentIntent);
        return paymentIntent;

    } catch (error) {
        // Handle record not found error
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw `PaymentIntent with ID '${(pi as PaymentIntent).id}' does not exist.`;
            }
        }

        throw error;
    } finally {
        await prisma.$disconnect();
    }
}
