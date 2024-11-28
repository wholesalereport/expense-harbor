'use client';

import {ChartPieIcon, FolderPlusIcon} from "@heroicons/react/24/solid";
import {ADD_REPORT, REPORT_ID} from "@/constants/reports";
import {useRootLayout} from "@/src/contexts/reports-context";

const navigation = [
    {name: 'Reports', href: '#', icon: ChartPieIcon, current: true,id:REPORT_ID},
    {name: 'Add Report', href: '#', icon: FolderPlusIcon, current: false,id:ADD_REPORT},

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ReportsNavigation () {
    const {  setNavId } = useRootLayout();

    return (<nav aria-label="Sidebar" className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-2">
            {navigation.map((item) => (
                <li key={item.name}>
                    <a
                        onClick={() => setNavId(item.id)}
                        href={item.href}
                        className={classNames(
                            item.current
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                        )}
                    >
                        <item.icon
                            aria-hidden="true"
                            className={classNames(
                                item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                'size-6 shrink-0',
                            )}
                        />
                        {item.name}

                    </a>
                </li>
            ))}
        </ul>
    </nav>)
}
