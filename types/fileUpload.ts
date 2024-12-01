import {TOrder} from "@/types/order";

export interface Meta {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
    fields: string[];
}

export interface AcceptedFile {
    path: string;
    relativePath: string;
}

export interface PageData {
    data: TOrder[];
    errors: string[];
    meta: Meta;
    acceptedFiles: AcceptedFile[];
}