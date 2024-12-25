//@ts-nocheck
import {UPDATE} from "@/constants";
import {get,includes} from 'lodash'
import {TReport} from "@/lib/types/TReport";

type Action = {
    type?: typeof UPDATE;
    payload?: Partial<TReport>;
};

export type TNewReportReducer = (state?: TReport, action?: Action) => TReport;

export  const newReportsReducer:TNewReportReducer  = (state, action) => {
    switch (action.type){
        case UPDATE:
            return {
                ...state,
                ...action?.payload
            }
        default:
            return state;
    }
}

export const getFile = state => get(state,"file",{});
export const getFileData = state => get(state,"file.data",{});
export const getFileSize = state => get(state,"file.data.length");
export const hasTransactions = state => getFileSize(state) > 0;
export const isUploadedFileFromAmazon = state => {
    return includes(get(state,"availableFields",[]),...["ASIN","Order ID","Order Date","Total Owed","Product Name"])
}
export const getAvailableFields = state => get(state,"availableFields",[]);
export const getSelectedTier = state => get(state,"tier");