'use client'

import {useState} from 'react'
import {Radio, RadioGroup} from '@headlessui/react'
import {CheckCircleIcon} from '@heroicons/react/20/solid'
import { isFunction} from 'lodash';
import {TPackage} from "@/src/components/checkout-form/TPackage";
import {TReportState} from "@/lib/types/TReport";
import {payment_tears_settings} from '@/constants'


export function PaymentTears({totalItems = 0,onPackageChange = (props: TReportState) => props}) {
    const [selectedPaymentTear, setSelectedPaymentTear] = useState<TPackage>(payment_tears_settings[0])

    const handleSelectionChange = (p: TPackage) => {
        setSelectedPaymentTear(p);
        isFunction(onPackageChange) && onPackageChange({name:'tier',value: p})
    }
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
                {payment_tears_settings.map((p: TPackage) => (
                    <Radio
                        disabled={p?.disabled(totalItems)}
                        key={p.id}
                        value={p}
                        aria-label={p.title}
                        aria-description={`${p.description} to ${p.displayAmount}`}
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
        </fieldset>
    )
}
