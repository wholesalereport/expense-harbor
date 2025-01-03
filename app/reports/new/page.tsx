//@ts-nocheck
"use client";

import React, {useReducer, useRef, useState} from 'react'
import {UploadDropZone} from '@/src/components/UploadDropZone'
import {PageData} from "@/types";
import {Checkout} from "@/src/components/checkout-form";
import {
    getAvailableFields, getFileData, getFileSize, getSelectedTier,
    hasTransactions,
    isUploadedFileFromAmazon,
    newReportsReducer, TNewReportReducer
} from "@/src/reducers/new-report-reducer";
import {UPDATE} from "@/constants/reducers";
import ComboboxComponent from "@/src/components/elements/combobox";
import {get, isNull, map, size} from 'lodash'
import {
    AMAZON_ORDER_DATE_INDEX,
    AMAZON_ORDER_ID_INDEX,
    AMAZON_TITLE_INDEX,
    AMAZON_TOTAL_PAYED_INDEX,
} from "@/lib/utils/fileUtils";
import ErrorsAlert, {Warning} from "@/src/components/state_notifications";
import {TReport, TReportState} from "@/lib/types/TReport";
import {SUCCESS_STATUS} from "@/constants";
import {PaymentTears} from "@/src/components/checkout-form/PaymentTears";
import {tierCalculator} from "@/lib/pricing";
import {omit} from "next/dist/shared/lib/router/utils/omit";
import {useRouter} from 'next/navigation'


import SubmitButton from "@/src/components/loading-button";
import FormLoadingDialogComponent from "@/src/components/checkout-form/FormLoadingDialogComponent";
import ReportCompleteDialogComponent from "@/src/components/checkout-form/ReportCompleteDialogComponent";
import {HeaderComponent} from "@/src/components/reports/HeaderComponent";

export default function NewReport() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [initLoadingDialogOpen, setInitLoadingDialogOpen] = useState<boolean>(isLoading);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false)
    const checkoutFormRef = useRef();
    const [state, dispatch] = useReducer<TNewReportReducer, TReport>(newReportsReducer, {} as TReport, (initialState) => initialState);
    const [errors, setErrors] = useState<string[]>([])

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
    const navigateToDashboard = async () => {
        await router.push('/reports');
    };

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
        try {
            if (!totalSize) {
                setUploadWarning("Please upload list of expenses to begin.")
                setIsLoading(false)
                return;
            }

            if (!checkoutFormRef.current.validateForm()) {
                setIsLoading(false)
                return;
            }

            setOpenConfirmationDialog(true)

            const response = await fetch("/api/payments/intent", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(omit(state, ["availableFields"])) // Amount in centsF
            });
            const {clientSecret, report} = await response.json();
            const {error, paymentIntent} = await checkoutFormRef.current.handlePayment(clientSecret);
            if (!_.isEmpty(error) || !get(paymentIntent, "status") === SUCCESS_STATUS) {
                /*TODO: need to send this to the server */
                console.debug("Payment failed.", error, get(paymentIntent, "status"));
                setIsLoading(false);
                setOpenConfirmationDialog(false)
                return;
            }

            const {confirmError} = await fetch(`/api/payments/${paymentIntent.id}/confirm`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},// Amount in centsF
                body: JSON.stringify({final: true})
            });
            if (confirmError) {
                setIsLoading(false);
                setOpenConfirmationDialog(false)
            }

            await fetch(`/api/reports`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},// Amount in centsF
                body: JSON.stringify({
                    data: getFileData(state),
                    report: {
                        ...report,
                        file: {
                            meta: {
                                fields: get(state, "file.meta.fields"),
                                delimiter: get(state, "file.meta.delimiter")
                            }
                        },
                        columnsMapping: state?.columnsMapping,
                    }
                })
            })
            setOpenConfirmationDialog(false)
            setIsLoading(false)
            await navigateToDashboard();

        } catch (e) {
            console.error(e);
            setErrors([e?.message || "Oops, something went wrong. We are on it! If you don't hear back from us soon please contact us"])
            setOpenConfirmationDialog(false)
            setIsLoading(false)
        }

    }

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <HeaderComponent
                showCreateReport={false}
                pageDescription={"Fill out the form below to generate a detailed report of your transactions."}
                pageName={"Generate Your Transactions Report"}
            />
            <div className={"mx-auto max-w-7xl sm:px-6 lg:px-8 mt-10"}>
                <FormLoadingDialogComponent open={initLoadingDialogOpen} onClose={setInitLoadingDialogOpen}/>
                <ReportCompleteDialogComponent open={openConfirmationDialog}/>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                            <h2 className="text-base/7 font-semibold text-gray-900">Report Name</h2>
                            <p className="mt-1 text-sm/6 text-gray-600">
                                Name that you can use to remember where the transactions are from. For example: Amazon
                                2024
                            </p>
                        </div>
                        <div className="grid max-w-36xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                            <div className="sm:col-span-4">
                                <div className="flex justify-between">
                                    <label htmlFor="ownerName"
                                           className="block text-sm/6 font-medium text-gray-900">
                                        Report Name
                                    </label>
                                    <span id="email-optional" className="text-sm/6 text-gray-500">
                                    Optional
                                </span>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        maxLength={50}
                                        onChange={e => updateField({name: 'name', value: e.target.value})}
                                        aria-describedby="email-optional"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Begining of the your file section */}
                    <div
                        className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                            <h2 className="text-base/7 font-semibold text-gray-900">Your File</h2>
                            <p className="mt-1 text-sm/6 text-gray-600">
                                CSV or Excel file that contains list of items you've bought.
                            </p>
                        </div>
                        <div className="grid max-w-36xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                            <div className="sm:col-span-4">
                                <div className="flex justify-between">
                                    <label htmlFor="ownerName"
                                           className="block text-sm/6 font-medium text-gray-900">
                                        File with transactions
                                    </label>
                                </div>
                                <UploadDropZone handleOnDrop={handleUpload} onWarning={setUploadWarning}/>
                                {uploadWarning && <div className={"mt-2"}><Warning>{uploadWarning}</Warning></div>}
                                {collectExtraFileMeta &&
                                    <div className="mt-2 grid grid-cols-2 gap-6" id="list-of-fields">
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
                                            <p className="mt-2 text-sm text-gray-500">Select the column with the
                                                amount
                                                you
                                                paid.</p>
                                        </div>
                                        <div>
                                            <ComboboxComponent
                                                label={"Column for Order ID"}
                                                updateParent={(option = {}) => buildValuePicker('orderId', option)}
                                                options={options}
                                                isOptional={true}
                                            />
                                            <p className="mt-2 text-sm text-gray-500">Select the column with order
                                                id.</p>
                                        </div>
                                        <div>
                                            <ComboboxComponent
                                                label={"Column for Order Date"}
                                                updateParent={(option = {}) => buildValuePicker('orderDate', option)}
                                                options={options}
                                                isOptional={true}
                                            />
                                            <p className="mt-2 text-sm text-gray-500">Select the column with order
                                                date.</p>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                    <div
                        className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                            <h2 className="text-base/7 font-semibold text-gray-900">Totals</h2>
                            <p className="mt-1 text-sm/6 text-gray-600">
                                Please choose the package you'd like to pay for.
                            </p>
                        </div>
                        <div className="grid max-w-3xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                            <div className="sm:col-span-4">
                                <div className="mt-2 flex flex-col justify-center h-full">
                                    {/* Payment Opitons */}
                                    {totalSize &&
                                        <PaymentTears totalItems={totalSize} onPackageChange={updateField}/>}
                                    {!totalSize && <div>
                                        <h2 className="text-base/7 font-semibold text-gray-900">Why is this section
                                            empty?</h2>
                                        <p className="mt-1 text-sm/6 text-gray-600">
                                            You need to upload list with your expenses first in order to begin
                                        </p>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* End of the your file section */}
                    <div
                        className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
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

                    <div className="mt-6 flex gap-2 flex-col">
                        <div>
                            {size(errors) > 0 && <ErrorsAlert errors={errors}/>}
                        </div>
                        <div className={"items-center justify-end flex gap-x-6"}>
                            <button type="button" className="text-sm/6 font-semibold text-gray-900">
                                Cancel
                            </button>
                            <SubmitButton type={"submit"} isLoading={isLoading}/>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}


