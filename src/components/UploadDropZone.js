import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import _ from 'lodash';
import Papa from "papaparse";
import * as XLSX from 'xlsx';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
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

export const UploadDropZone = ({handleOnDrop}) => {
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
        onDrop: acceptedFiles => {
            const file = _.first(acceptedFiles);
            const {type} = file;
            const reader = new FileReader();
            reader.onload = e => {
                const {target: {result}} = {} = e;
                let data = result;
                switch (true) {
                    case !_.isEmpty(type.match(/excel|sheet/)):
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
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p className={"text-sm"}>Drag 'n' drop XLS(s) or CSV or click to select file with prices to start report generation</p>
            </div>
        </>
    );
}

