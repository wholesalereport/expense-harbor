//@ts-nocheck
"use client";

import React, { useReducer, useRef, useState} from 'react'
import {UploadDropZone} from '@/src/components/UploadDropZone'
import {PageData} from "@/types";
import {Checkout} from "@/src/components/checkout-form";
import {
    getAvailableFields, getFileSize, getSelectedTier,
    hasTransactions,
    isUploadedFileFromAmazon,
    newReportsReducer, TNewReportReducer
} from "@/src/reducers/new-report-reducer";
import {UPDATE} from "@/constants/reducers";
import ComboboxComponent from "@/src/components/elements/combobox";
import {get, isNull, map} from 'lodash'
import {
    AMAZON_ORDER_DATE_INDEX,
    AMAZON_ORDER_ID_INDEX,
    AMAZON_TITLE_INDEX,
    AMAZON_TOTAL_PAYED_INDEX,
} from "@/lib/utils/fileUtils";
import {Warning} from "@/src/components/state_notifications";
import {TReport, TReportState} from "@/lib/types/TReport";
import {useUser} from "@clerk/nextjs";
import {SUCCESS_STATUS} from "@/constants";
import {PaymentTears} from "@/src/components/checkout-form/PaymentTears";
import {tierCalculator} from "@/lib/pricing";
import {TPackage} from "@/src/components/checkout-form/TPackage";
import {omit} from "next/dist/shared/lib/router/utils/omit";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";


export default function NewReport() {
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const {isLoaded, isSignedIn, user} = useUser();
    const {  userId } = useAuth();

    const checkoutFormRef = useRef();

    const [state, dispatch] = useReducer<TNewReportReducer, TReport>(newReportsReducer, {} as TReport, (initialState) => initialState);

    //@ts-ignore
    const updateField = ({name, value}: TReportState) => dispatch({type: UPDATE, payload: {[name]: value}});

    const updateFields = (data = []) => {
        dispatch({
            type: UPDATE, payload: data.reduce((acc, obj) => {
                return {
                    ...acc,
                    ...obj
                }

            }, {})
        })
    }


    const buildValuePicker = ((field, option) => {
        if (option && !isNull(option)) {
            updateField({
                name: "columnsMapping",
                value: {
                    ...state?.columnsMapping,
                    [field]: option?.name
                }
            })
        }
    })
    const [uploadWarning, setUploadWarning] = useState(false);
    const isHasTransactions = hasTransactions(state);
    const isAmazonFile = isUploadedFileFromAmazon(state);
    const options = map(getAvailableFields(state), (v) => ({id: v, name: v}));
    const collectExtraFileMeta = isHasTransactions && !isAmazonFile;
    const totalSize = getFileSize(state);
    const selectedTier = getSelectedTier(state);



    const handleInputChange = ({target = {}} = {}) => {
        updateField(target);
    }
    const handleUpload = (data: PageData) => {

        const fields = get(data, "meta.fields", []);
        updateField({name: 'file', value: data})
        updateField({name: 'availableFields', value: fields})
        if (isUploadedFileFromAmazon({"availableFields": get(data, "meta.fields")})) {
            const defaultMapping = {
                productTitle: fields[AMAZON_TITLE_INDEX],
                totalPayed: fields[AMAZON_TOTAL_PAYED_INDEX],
                orderId: fields[AMAZON_ORDER_ID_INDEX],
                orderDate: fields[AMAZON_ORDER_DATE_INDEX]
            };
            updateField({name: "columnsMapping", value: defaultMapping})
        } else {
            updateField({name: "columnsMapping", value: {}})
        }
        const totalTransactions = get(data, "data", []).length;

        if (totalTransactions > 0) {
            const tier = tierCalculator(totalTransactions);
            updateField({name: 'tier', value: tier})
            //updateFields(Object.keys(tier).map((k) => ({[k]:tier[k]})))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        if (!checkoutFormRef.current.validateForm()) {
            setIsLoading(false)
            return;
        }
        const response = await fetch("/api/payments/intent", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(omit(state, ["availableFields"])) // Amount in centsF
        });
        const {clientSecret} = await response.json();
        const {error, paymentIntent} = await checkoutFormRef.current.handlePayment(clientSecret);

        if (!get(paymentIntent, "status") === SUCCESS_STATUS) {
            /*TODO: need to send this to the server */
            console.error("Payment failed.", error, get(paymentIntent, "status"));
            return;
        }

        await fetch(`/api/payments/${paymentIntent.id}/confirm`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},// Amount in centsF
            body: JSON.stringify({final: true})
        });
        setIsLoading(false)
    }

    return (
        <div className={"space-y-12 mt-10"}>
            <form onSubmit={handleSubmit}>

                {/* Begining of the your file section */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                        <h2 className="text-base/7 font-semibold text-gray-900">Your File</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            CSV or Excel file that contains list of items you've bought.
                        </p>
                    </div>
                    <div className="grid max-w-36xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-4">
                            <div className="flex justify-between">
                                <label htmlFor="ownerName" className="block text-sm/6 font-medium text-gray-900">
                                    File with transactions
                                </label>
                            </div>
                            <UploadDropZone handleOnDrop={handleUpload} onWarning={setUploadWarning}/>
                            {uploadWarning && <div className={"mt-2"}><Warning message={uploadWarning}/></div>}
                            {collectExtraFileMeta && <div className="mt-2 grid grid-cols-2 gap-6" id="list-of-fields">
                                <div>
                                    <ComboboxComponent
                                        label={"Column for Product Name"}
                                        updateParent={(option = {}) => buildValuePicker('productTitle', option)}
                                        options={options}/>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Select the column with the product name.
                                    </p>
                                </div>
                                <div>
                                    <ComboboxComponent
                                        label={"Column for Total Payed"}
                                        updateParent={(option = {}) => buildValuePicker('totalPayed', option)}
                                        options={options}/>
                                    <p className="mt-2 text-sm text-gray-500">Select the column with the amount you
                                        paid.</p>
                                </div>
                                <div>
                                    <ComboboxComponent
                                        label={"Column for Order ID"}
                                        updateParent={(option = {}) => buildValuePicker('orderId', option)}
                                        options={options}
                                        isOptional={true}
                                    />
                                    <p className="mt-2 text-sm text-gray-500">Select the column with order id.</p>
                                </div>
                                <div>
                                    <ComboboxComponent
                                        label={"Column for Order Date"}
                                        updateParent={(option = {}) => buildValuePicker('orderDate', option)}
                                        options={options}
                                        isOptional={true}
                                    />
                                    <p className="mt-2 text-sm text-gray-500">Select the column with order date.</p>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                        <h2 className="text-base/7 font-semibold text-gray-900">Totals</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            Please choose the package you'd like to pay for.
                        </p>
                    </div>
                    <div className="grid max-w-3xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                {/* Payment Opitons */}
                                {totalSize && <PaymentTears totalItems={totalSize} onPackageChange={updateField}/>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* End of the your file section */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                        <h2 className="text-base/7 font-semibold text-gray-900">Payment</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            Payment for the report processing.
                        </p>
                    </div>
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <Checkout ref={checkoutFormRef}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900">
                        Cancel
                    </button>
                    <SubmitButton type={"submit"} isLoading={isLoading}/>
                </div>
            </form>
        </div>


    )
}

import {getEmail, getFullName} from "@/src/adapters";
import {clerkClient} from "@clerk/nextjs";
import {format} from "logform";
import cli = format.cli;
import SubmitButton from "@/src/components/loading-button";

// const provideExtraFileInfo = useMemo(() => {
// }, [uploadWarning])
//const { isLoaded, isSignedIn, user } = useUser();
// if (!isLoaded) {
//     return <div>Loading...</div>;
// }
//
// if (!isSignedIn) {
//     return <div>Please sign in</div>;
// }


