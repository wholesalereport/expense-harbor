import {TTier} from "@/lib/types/TTier";

export const REPORT_ID = 'reportId'
export const ADD_REPORT = 'add-report'

export const TIER_ONE_ID = process.env.NEXT_PUBLIC_TIER_ONE_ID;
export const TIER_ONE_AMOUNT = process.env.NEXT_PUBLIC_TIER_ONE_AMOUNT || 1499;
export const TIER_ONE_LOWER_LIMIT = process.env.NEXT_PUBLIC_TIER_ONE_LOWER_LIMIT || 0;
export const TIER_ONE_UPPER_LIMIT = process.env.NEXT_PUBLIC_TIER_ONE_UPPER_LIMIT || 2000;

export const TIER_TWO_ID = process.env.NEXT_PUBLIC_TIER_TWO_ID;
export const TIER_TWO_AMOUNT = process.env.NEXT_PUBLIC_TIER_TWO_AMOUNT || 2599;
export const TIER_TWO_LOWER_LIMIT = process.env.NEXT_PUBLIC_TIER_TWO_LOWER_LIMIT || 2001;
export const TIER_TWO_UPPER_LIMIT = process.env.NEXT_PUBLIC_TIER_TWO_UPPER_LIMIT || 4000;

export const TIER_THREE_ID = process.env.NEXT_PUBLIC_TIER_THREE_ID;
export const TIER_THREE_AMOUNT = process.env.NEXT_PUBLIC_TIER_THREE_AMOUNT || 3999;
export const TIER_THREE_LOWER_LIMIT = process.env.NEXT_PUBLIC_TIER_THREE_LOWER_LIMIT || 4001;
export const TIER_THREE_UPPER_LIMIT = process.env.NEXT_PUBLIC_TIER_THREE_UPPER_LIMIT || 10000;

export const NAVIGATION_IDS = {
    [REPORT_ID]: REPORT_ID,
    [ADD_REPORT]: ADD_REPORT
}

const calcEnabledFlag = (totalItems: number, from: number) => totalItems >= from;

export const payment_tears_settings:TTier[] = [
    {
        id: TIER_ONE_ID,
        title: `0 - ${TIER_ONE_UPPER_LIMIT} Transactions`,
        description: `Process form 0 to ${TIER_ONE_UPPER_LIMIT} transactions`,
        displayAmount: `$${+TIER_ONE_AMOUNT / 100}`,
        amount: +TIER_ONE_AMOUNT,
        disabled: (totalItems = 0) => !calcEnabledFlag(totalItems, +TIER_ONE_LOWER_LIMIT),
        lowerLimit: +TIER_ONE_LOWER_LIMIT,
        upperLimit: +TIER_ONE_UPPER_LIMIT
    },
    {
        id: TIER_TWO_ID,
        title: `0 - ${TIER_TWO_UPPER_LIMIT} Transactions`,
        description: `Process from 0 to ${TIER_TWO_UPPER_LIMIT} transactions`,
        displayAmount: `$${+TIER_TWO_AMOUNT / 100}`,
        amount: +TIER_TWO_AMOUNT,
        disabled: (totalItems = 0) => !calcEnabledFlag(totalItems, +TIER_TWO_LOWER_LIMIT),
        lowerLimit: +TIER_TWO_LOWER_LIMIT,
        upperLimit: +TIER_TWO_UPPER_LIMIT

    },
    {
        id: TIER_THREE_ID,
        title: `0 - ${TIER_THREE_UPPER_LIMIT} Transactions`,
        description: `Process from 0 to ${TIER_THREE_UPPER_LIMIT} transactions`,
        displayAmount: `$${+TIER_THREE_AMOUNT / 100}`,
        amount: +TIER_THREE_AMOUNT,
        disabled: (totalItems = 0) => !calcEnabledFlag(totalItems, +TIER_THREE_LOWER_LIMIT),
        lowerLimit: +TIER_THREE_LOWER_LIMIT,
        upperLimit: +TIER_THREE_UPPER_LIMIT

    },
]

/*
pending
  in_progress
  complete
  deleted
  open
 */

export const REPORT_STATUSES = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETE: 'complete',
    DELETED: 'deleted',
    OPEN: 'open'
} as const;
