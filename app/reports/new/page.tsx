"use client";

import React, {useEffect, useMemo, useReducer, useRef, useState} from 'react'
import {UploadDropZone} from '@/src/components/UploadDropZone'
import {PageData} from "@/types";
import {Checkout} from "@/src/components/checkout-form";
import {hasTransactions, newReportsReducer} from "@/src/reducers/new-report-reducer";
import {UPDATE} from "@/constants/reducers";
import ComboboxComponent from "@/src/components/elements/combobox";
import {get, isNull} from 'lodash'
import {
    AMAZON_ORDER_DATE_INDEX,
    AMAZON_ORDER_ID_INDEX,
    AMAZON_TITLE_INDEX,
    AMAZON_TOTAL_PAYED_INDEX,
    defaultFieldNames
} from "@/lib/utils/fileUtils";
import {Warning} from "@/src/components/state_notifications";
//import { useUser } from "@clerk/nextjs";


export default function NewReport() {
    const checkoutFormRef = useRef();

    const [state, dispatch] = useReducer(newReportsReducer, {columnsMapping: {}});
    const updateField = ({name, value}) => dispatch({type: UPDATE, payload: {[name]: value}})
    const buildValuePicker = ((field, option) => {
        console.log("!!! option ", field, option)
        if (option && !isNull(option)) {
            updateField({name: "columnsMapping", value: {[field]: option?.name}})
        }
    })
    const [uploadWarning, setUploadWarning] = useState(false);
    const isHasTransactions = useMemo(() => hasTransactions(state), [state])
    console.log("!!! state ", state);

    const provideExtraFileInfo = useMemo(() => {
    }, [uploadWarning])
    //const { isLoaded, isSignedIn, user } = useUser();
    // if (!isLoaded) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (!isSignedIn) {
    //     return <div>Please sign in</div>;
    // }
    const [clientSecret, setClientSecret] = React.useState();

    const handleInputChange = ({target = {}} = {}) => {
        updateField(target);
    }
    const handleUpload = (data: PageData) => {
        updateField({name: 'file', value: data})
        updateField({name: 'availableFields', value: get(data, "meta.fields", defaultFieldNames)})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/payments/payment-intent", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({amount: 5000}), // Amount in cents
        });
        const {clientSecret} = await response.json();
        console.log("!!! got client secret ", clientSecret);

        const paymentResult = await checkoutFormRef.current.handlePayment(clientSecret);
        if (!paymentResult) {
            console.error("Payment failed.");
            return;
        }
        console.log("Payment successful:", paymentResult);

    }
    return (
        <div className={"space-y-12 mt-10"}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                        <h2 className="text-base/7 font-semibold text-gray-900">General</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            This information will be use to identify who the report belongs to and provide general
                            details.
                        </p>
                    </div>
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-4">
                            <div className="flex justify-between">
                                <label htmlFor="ownerName" className="block text-sm/6 font-medium text-gray-900">
                                    Your Name
                                </label>
                            </div>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        onChange={handleInputChange}
                                        id={"ownerName"}
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        {/* end of owner name */}
                        <div className="sm:col-span-4">
                            <div className="flex justify-between">
                                <label htmlFor="reportName" className="block text-sm/6 font-medium text-gray-900">
                                    Report Name
                                </label>
                                <span id="email-optional" className="text-sm/5 text-gray-500">
                                    Optional
                                </span>
                            </div>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        onChange={handleInputChange}
                                        id={"reportName"}
                                        name="reportName"
                                        type="text"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                        required
                                    />
                                </div>
                                <p className="mt-3 text-sm/6 text-gray-500">Don't have one? No problem, we will create
                                    it for you!</p>

                            </div>
                        </div>
                        {/* end of report name */}
                        <div className="sm:col-span-4">
                            <label htmlFor="marketPlace" className="block text-sm/6 font-medium text-gray-900">
                                Market Place
                            </label>

                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        onChange={handleInputChange}
                                        id={"marketPlace"}
                                        name="marketPlace"
                                        type="text"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                        required
                                    />
                                </div>
                                <p className="mt-3 text-sm/6 text-gray-500">
                                    Where were the charges you are uploading made? For example, Amazon, Walmart, or
                                    custom sources?
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
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
                            {isHasTransactions && <div className="mt-2 grid grid-cols-2 gap-6" id="list-of-fields">
                                <div>
                                    <ComboboxComponent
                                        label={"Column for Product Name"}
                                        initSelectedOption={defaultFieldNames[AMAZON_TITLE_INDEX]}
                                        updateParent={(option = {}) => buildValuePicker('title', option)}
                                        options={defaultFieldNames}/>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Select the column with the product names you purchased.
                                    </p>
                                </div>
                                <div>
                                    <ComboboxComponent
                                        label={"Column for Total Payed"}
                                        initSelectedOption={defaultFieldNames[AMAZON_TOTAL_PAYED_INDEX]}
                                        updateParent={(option = {}) => buildValuePicker('title', option)}
                                        options={defaultFieldNames}/>
                                    <p className="mt-2 text-sm text-gray-500">Select the column with the amount you
                                        paid.</p>
                                </div>
                                <div>
                                    <ComboboxComponent
                                        label={"Column for Order ID"}
                                        initSelectedOption={defaultFieldNames[AMAZON_ORDER_ID_INDEX]}
                                        updateParent={(option = {}) => buildValuePicker('title', option)}
                                        options={defaultFieldNames}
                                        isOptional={true}
                                    />
                                    <p className="mt-2 text-sm text-gray-500">Select the column with order id.</p>
                                </div>
                                <div>
                                    <ComboboxComponent
                                        label={"Column for Order Date"}
                                        initSelectedOption={defaultFieldNames[AMAZON_ORDER_DATE_INDEX]}
                                        updateParent={(option = {}) => buildValuePicker('title', option)}
                                        options={defaultFieldNames}
                                        isOptional={true}
                                    />
                                    <p className="mt-2 text-sm text-gray-500">Select the column with date when you made an order.</p>

                                </div>

                            </div>}
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
            </form>
        </div>


    )
}

