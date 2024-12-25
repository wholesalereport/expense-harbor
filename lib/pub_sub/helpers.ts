import {get} from 'lodash';
import {TReport} from "@/lib/types/TReport";
import {User} from "@clerk/clerk-sdk-node";

export const buildMessage = (report: TReport, user: User) => {
    return {
        file: {
            meta: {
                fields: get(report, 'file.meta.fields', []),
                delimiter: get(report, 'file.meta.delimiter', ','),
            },
        },
        columnsMapping: get(report, 'columnsMapping', {}),
        report: {
            id: get(report, 'id', ''),
            userId: get(user, 'id', ''),
            email: get(user,"primaryEmailAddress.emailAddress"),
            fullName: get(user,"fullName"),
            tierId: get(report, 'tierId', ''),
            totalLines: get(report, 'totalLines', 0),
        },
    };
}