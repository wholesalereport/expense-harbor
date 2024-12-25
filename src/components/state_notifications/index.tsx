import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import {XCircleIcon} from "@heroicons/react/16/solid";
import {size} from 'lodash'
export  function Warning({title = "Attention needed",children}) {
    return (
        <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
                <div className="shrink-0">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        <p>
                            {children}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function ErrorsAlert({errors = []}) {
    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="shrink-0">
                    <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                        There were {size(errors)} error(s) with your submission
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                        <ul role="list" className="list-disc space-y-1 pl-5">
                            {errors.map(e => <li key={e}>{e}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}