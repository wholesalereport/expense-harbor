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

export type TReport = {
    name?: string;
    reportName?: string;
    file?: File;
    availableFields?: string[];
    columnsMapping?: ColumnsMapping;
};

export type TReportState = {name: string,value: unknown} | Record<string,unknown>;