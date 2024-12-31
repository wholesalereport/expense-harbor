import {isEmpty, isNull} from "lodash";
import {Report} from '@prisma/client'

export const getTitle = (report: Report | null): string => {
    if(report === null) return "";
    if(!isEmpty(report?.name) && !isNull(report.name)){
        return report.name;
    }else{
        return `Created on ${new Date(report?.createdAt)?.toDateString()}`
    }
}