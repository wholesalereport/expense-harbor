"use client";
import {UploadDropZone} from '../../../src/components/UploadDropZone'
import {  } from '../../../types'
import {PageData} from "@/types";
//import { useUser } from "@clerk/nextjs";

export default function NewReport() {
    //const { isLoaded, isSignedIn, user } = useUser();
    // if (!isLoaded) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (!isSignedIn) {
    //     return <div>Please sign in</div>;
    // }

    const handleUpload = (data: PageData) => console.log(JSON.stringify(data));
    return (
        <form>
            <div className={"space-y-12 mt-10"}>
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
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id={"ownerName"}
                                        name="ownerName"
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
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id={"reportName"}
                                        name="reportName"
                                        type="text"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                        required
                                    />
                                </div>
                                <p className="mt-3 text-sm/6 text-gray-500">Don't have one? No problem, we will create it for you!</p>

                            </div>
                        </div>
                        {/* end of report name */}
                        <div className="sm:col-span-4">
                                <label htmlFor="marketPlace" className="block text-sm/6 font-medium text-gray-900">
                                    Market Place
                                </label>

                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id={"marketPlace"}
                                        name="reportName"
                                        type="text"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                        required
                                    />
                                </div>
                                <p className="mt-3 text-sm/6 text-gray-500">
                                    Where were the charges you are uploading made? For example, Amazon, Walmart, or custom sources?
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                        <h2 className="text-base/7 font-semibold text-gray-900">Your File</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            CSV or Excel file that contains list of items you've bought.
                        </p>
                    </div>
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-4">
                            <div className="flex justify-between">
                                <label htmlFor="ownerName" className="block text-sm/6 font-medium text-gray-900">
                                    File with transactions
                                </label>
                            </div>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <UploadDropZone handleOnDrop={handleUpload} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}