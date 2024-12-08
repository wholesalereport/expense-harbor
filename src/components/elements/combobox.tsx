'use client'
import {isFunction} from 'lodash';

import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {useEffect, useMemo, useState} from 'react'


export default function ComboboxComponent({options = [], updateParent, label = "", initSelectedOption = null,isOptional = false}) {
    const [query, setQuery] = useState('')
    const [selectedOption, setSelectedOption] = useState(initSelectedOption)


    useEffect(() => {
        if (isFunction(updateParent)) updateParent(selectedOption);
    }, [selectedOption])

    const filteredOptions =
        query === ''
            ? options
            : options.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox
            as="div"
            value={selectedOption}
            onChange={(person) => {
                setQuery('')
                setSelectedOption(person)
            }}
        >
            <div className="flex justify-between">
                <label htmlFor="ownerName" className="block text-sm/6 font-medium text-gray-900">{label}</label>
                {isOptional && <span id="email-optional" className="text-sm/6 text-gray-500">Optional</span>}
            </div>
            <div className="relative mt-2">
                <ComboboxInput
                    className="block w-full rounded-md bg-white py-1.5 pl-3 pr-12 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) => setQuery(event.target.value)}
                    onBlur={() => setQuery('')}
                    displayValue={(person) => person?.name}
                />
                <ComboboxButton
                    className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="size-5 text-gray-400" aria-hidden="true"/>
                </ComboboxButton>

                {filteredOptions.length > 0 && (
                    <ComboboxOptions
                        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {filteredOptions.map((option) => (
                            <ComboboxOption
                                key={option?.id}
                                value={option}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                            >
                                <span
                                    className="block truncate group-data-[selected]:font-semibold">{option?.name}</span>

                                <span
                                    className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="size-5" aria-hidden="true"/>
                </span>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                )}
            </div>
        </Combobox>
    )
}
