'use client'

import React, {PropsWithChildren, useState} from 'react'
import {Radio, RadioGroup} from '@headlessui/react'
import {CheckCircleIcon} from '@heroicons/react/20/solid'
import {isEmpty, isFunction} from 'lodash';
import {TPackage} from "@/src/components/checkout-form/TPackage";
import {TReportState} from "@/lib/types/TReport";
import {payment_tears_settings} from '@/constants'
import {tierCalculator} from "@/lib/pricing";
import {Warning} from "@/src/components/state_notifications";
import {TTier} from "@/lib/types/TTier";
import {number} from "prop-types";

// = (props: TReportState) => props
type TProps = (props:{
    selectedPaymentTear: TTier;
    totalItems: number;
}) => React.JSX. Element | null | undefined

const PaymentTearWarning:TProps = ({selectedPaymentTear, totalItems}) => {
    if(isEmpty(selectedPaymentTear)) return;
    if(selectedPaymentTear.upperLimit  && selectedPaymentTear.upperLimit > 0 && totalItems > selectedPaymentTear?.upperLimit){
        return (
            <div className="mt-2">
                <Warning title={"Update your current tier"} >
                    You current tier can be used to process upto <span className="font-bold">{selectedPaymentTear?.upperLimit}</span> but you have <span className="font-bold">{totalItems}</span> transactions.
                    Please select different tier or remove some transactions.
                </Warning>
            </div>
        )
    }else {
        return null;
    }
}

export function PaymentTears({
                                 totalItems = 0,
                                 onPackageChange,
                             }) {
    const initTier = payment_tears_settings.find(p => p.id === tierCalculator(totalItems)) || payment_tears_settings[0];
    const [selectedPaymentTear, setSelectedPaymentTear] = useState<TTier>(initTier);
    const handleSelectionChange = (p: TTier) => {
        setSelectedPaymentTear(p);
        isFunction(onPackageChange) && onPackageChange({name: 'tier', value: p})
    }
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <fieldset>
            <legend className="text-sm/6 font-semibold text-gray-900">Select a Package</legend>
            <p>
                You are about to include <span className="font-bold">{totalItems}</span> transactions(s) in your report.
            </p>
            <RadioGroup
                name={"tier"}
                value={selectedPaymentTear}
                onChange={handleSelectionChange}
                className="mt-6 grid grid-cols-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4 w-full"
            >
                {payment_tears_settings.map((p: TTier) => (
                    <Radio
                        //@ts-ignore
                        disabled={p.disabled(totalItems) || !totalItems}
                        key={p.id}
                        value={p}
                        aria-label={p.title}
                        aria-description={`${p.description} to ${p.displayAmount}`}
                        //@ts-ignore
                        className={`${p?.disabled(totalItems) ? 'bg-gray-200 cursor-not-allowed' : 'cursor-pointer '}  group relative flex w-full rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[focus]:border-indigo-600 data-[focus]:ring-2 data-[focus]:ring-indigo-600`}
                    >
                        <span className="flex flex-1">
                          <span className="flex flex-col">
                            <span className="block text-sm font-medium text-gray-900">{p.title}</span>
                            <span className="mt-1 flex items-center text-sm text-gray-500">{p.description}</span>
                            <span className="mt-6 text-sm font-medium text-gray-900">{p.displayAmount}</span>
                          </span>
                        </span>
                        <CheckCircleIcon
                            aria-hidden="true"
                            className="size-5 text-indigo-600 group-[&:not([data-checked])]:invisible"
                        />
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-600"
                        />
                    </Radio>
                ))}
            </RadioGroup>
            <PaymentTearWarning selectedPaymentTear={selectedPaymentTear} totalItems={totalItems} />
        </fieldset>
    )
}
