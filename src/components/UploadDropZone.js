import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import _ from 'lodash';
import Papa from "papaparse";
import * as XLSX from 'xlsx';
import {DocumentArrowUpIcon} from '@heroicons/react/24/solid'
import {MAX_UPLOAD_FILE_SIZE} from "@/constants/upload";
import {isEmpty,isFunction,first} from 'lodash';


const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    transition: 'border .24s ease-in-out',
    width: '100%'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export const UploadDropZone = ({handleOnDrop,onWarning}) => {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone({
        accept: {
            'text/csv': ['.csv'],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ['.xlsx', '.xls']
        },
        maxSize: MAX_UPLOAD_FILE_SIZE,
        maxFiles: 1,
        onDrop: acceptedFiles => {
            /*TODO: would be good to show some kind of error here */
            if(isEmpty(acceptedFiles)){
                return isFunction(onWarning) && onWarning(`Provided file can not be processed. Please make sure that uploaded files are in xls, xlsx or csv format and not more then ${MAX_UPLOAD_FILE_SIZE / 1000000 }MB`)
            }else{
                onWarning(undefined)
            }
            const file = first(acceptedFiles);
            const {type} = file;
            const reader = new FileReader();
            reader.onload = e => {
                const {target: {result}} = {} = e;
                let data = result;
                switch (true) {
                    case !isEmpty(type.match(/excel|sheet/)):
                        /* Parse data */
                        const wb = XLSX.read(result, {type: 'binary'});
                        /* Get first worksheet */
                        const wsname = wb.SheetNames[0];
                        const ws = wb.Sheets[wsname];
                        /* Convert array of arrays */
                        data = XLSX.utils.sheet_to_csv(ws, {header: 1});
                        break;
                    case type === 'text/csv':
                    default:
                        break;

                }

                Papa.parse(data, {
                    header: true,
                    worker: true,
                    complete: (result) => {
                        handleOnDrop({
                            ...result,
                            acceptedFiles
                        });
                        //console.log("--- result in excel ",result)
                    }
                });
            }

            reader.readAsBinaryString(file);
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);
    return (
        <>
            <div {...getRootProps({style})} className="mt-2 flex w-full rounded-lg border border-2 border-dashed border-gray-900/25 hover:bg-gray-100">
                <input {...getInputProps()} />
                <DocumentArrowUpIcon aria-hidden="true" className="mx-auto size-12 text-gray-300"/>
                <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md  font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                        <span>Drag 'n' drop XLS(s) or CSV or click to select file with prices to start report generation</span>
                    </label>
                </div>
                <p className="text-xs/5 text-gray-600">XLS,XLSX,CSV up to 3MB</p>

            </div>
        </>
    );
}

