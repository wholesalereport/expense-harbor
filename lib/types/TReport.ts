import {TTier} from "@/lib/types/TTier";
import {REPORT_STATUSES} from "@/constants";
import {User} from "@clerk/clerk-sdk-node";
import {TUserInput} from "@/lib/types/TUser";

type MetaData = {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
    fields: string[];
};

type AcceptedFile = {
    path: string;
    relativePath: string;
};

type File = {
    data: string[]; // Updated to be an array of strings
    errors: any[]; // Replace `any` with a specific type if error details are known
    meta: MetaData;
    acceptedFiles: AcceptedFile[];
};

type ColumnsMapping = {
    productTitle: string;
    totalPayed: string;
    orderId: string;
    orderDate: string;
};

export type ReportStatus = (typeof REPORT_STATUSES)[keyof typeof REPORT_STATUSES];


export type TReport = {
    id?: string; // Auto-incrementing primary key
    user?: TUserInput; // Foreign key referencing User
    status: ReportStatus; // ReportStatus enum
    tier?:TTier;
    tierId: string;
    totalLines: number;
    createdAt: Date; // Creation timestamp
    updatedAt: Date; // Last update timestamp
    deletedAt: Date | null; // Optional soft-delete timestamp
};

export type TReportState = {name: string,value: unknown} | Record<string,unknown>;