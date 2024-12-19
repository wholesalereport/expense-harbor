import {
    TIER_ONE_ID,
    TIER_ONE_AMOUNT,
    TIER_ONE_UPPER_LIMIT,
    TIER_THREE_ID,
    TIER_TWO_ID,
    TIER_TWO_UPPER_LIMIT, TIER_TWO_AMOUNT, TIER_THREE_AMOUNT
} from "@/constants";
import {TTier} from "@/lib/types/TTier";


export const tierCalculator = (numOfRows: number = 0): TTier=> {
    switch (true){
        case numOfRows < +TIER_ONE_UPPER_LIMIT:
            return {id: TIER_ONE_ID, amount: +TIER_ONE_AMOUNT};
        case numOfRows > +TIER_ONE_UPPER_LIMIT && numOfRows < +TIER_TWO_UPPER_LIMIT:
            return {id: TIER_TWO_ID,amount: +TIER_TWO_AMOUNT};
        default:
           return {id: TIER_THREE_ID,amount: +TIER_THREE_AMOUNT};
    }
};