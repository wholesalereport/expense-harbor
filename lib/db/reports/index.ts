import prisma from '../../../lib/db/prisma_client'
import {REPORT_STATUSES} from "@/constants";
import {isEmpty} from "lodash";
import {Report} from '@prisma/client'
type TCreateReport = (report: Report) => Promise<Report>;

export const createReport: TCreateReport = async (report: Report) => {
    if (isEmpty(report) || isEmpty(report?.userId)) throw `User or Report can not be empty on report object`;

    return prisma.report.create({
        data: {
            ...report,
            tierId: report.tierId || "",
            status: REPORT_STATUSES.PENDING
        }
    });

}

export async function updateReport(report: Report) {
    if (!report.id) {
        throw new Error("Report ID is required.");
    }
    if (!report.userId) {
        throw new Error("User ID is required in the report object.");
    }

    // Update the report directly with the provided report object
    return prisma.report.update({
        where: {
            id_userId: {
                id: report.id,
                userId: report.userId,
            },
        },
        data: {
            ...report,
        },
    });

}

export async function getReportsByUserId(userId: string): Promise<Report[]> {
       return prisma.report.findMany({
            where: {
                userId: userId,
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc', // Order by creation date, newest first
            },
        });
}