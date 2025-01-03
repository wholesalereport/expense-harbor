import React from 'react';
import {isEmpty} from "lodash";

const TransactionsTable = ({data}) => {

    if (isEmpty(data)) return null;

    const allKeys = Array.from(new Set(Object.keys(data[0] || {})));

    const buildKey = row => allKeys.map(k => row[k]).join("-");
    const RowComponent = (row) => {
        // @ts-ignore
        return (
            <tr key={buildKey(row)}>
                {
                    allKeys.map(k => <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        key={k}>{row[k]}</td>)
                }
            </tr>
        )
    }

    return (
        <div className={"w-full"}>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 h-96">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                {allKeys.map((key) => (
                                    <th
                                        key={key}
                                        className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                                    >
                                        {key}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {data.map(RowComponent)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsTable;
