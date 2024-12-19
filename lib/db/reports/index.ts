import prisma from '../../../lib/db/prisma_client'
import {TReport} from "@/lib/types/TReport";
import {REPORT_STATUSES} from "@/constants";
import {isEmpty} from "lodash";

type TCreateReport = (report:TReport) => Promise<TReport>;
export const createReport:TCreateReport = async (report: TReport) => {
    if(isEmpty(report?.user)) throw `User can not be empty on report object`;

    return  prisma.report.create({
        data: {
            userId: report.user.id,
            tierId: report.tier?.id || "",
            status: REPORT_STATUSES.PENDING,
            totalLines: report.totalLines,
        }
    });

}