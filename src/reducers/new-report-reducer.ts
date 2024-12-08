import {UPDATE} from "@/constants";
import {get} from 'lodash'

export  const newReportsReducer = (state,action = {}) => {
    const {type,payload} = action;
    switch (type){
        case UPDATE:
            return {
                ...state,
                ...payload
            }
    }
}

export const getFile = state => get(state,"file",{});
export const getFileSize = state => get(state,"file.data.length");
export const hasTransactions = state => getFileSize(state) > 0;