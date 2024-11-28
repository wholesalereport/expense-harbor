"use client";
import { useUser } from "@clerk/nextjs";

export default function NewReport() {
    //const { isLoaded, isSignedIn, user } = useUser();
    // if (!isLoaded) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (!isSignedIn) {
    //     return <div>Please sign in</div>;
    // }

    return (
        <form>
            <div className={"space-y-12"}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                        <h2 className="text-base/7 font-semibold text-gray-900">General</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-4">
                            <label htmlFor="website" className="block text-sm/6 font-medium text-gray-900">
                                Website
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span>
                                    <input
                                        id="website"
                                        name="website"
                                        type="text"
                                        placeholder="www.example.com"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}