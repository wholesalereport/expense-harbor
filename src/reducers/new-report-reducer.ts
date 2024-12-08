import {UPDATE} from "@/constants";

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