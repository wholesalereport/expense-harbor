import * as XLSX from "xlsx";

export function exportToCSV(data, filename = 'export.csv') {
    if (!data || !data.length) {
        console.error('No data to export');
        return;
    }

    // Extract headers from the first object
    const headers = Object.keys(data[0]);

    // Map rows to CSV format
    const rows = data.map(row =>
        headers.map(header => JSON.stringify(row[header] || '')).join(',')
    );

    // Combine headers and rows
    const csvContent = [headers.join(','), ...rows].join('\n');

    // Create a blob and trigger a download
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const exportToExcel = (data, filename = 'export.xlsx') => {
    if (!data || !data.length) {
        console.error('No data to export');
        return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, filename);
};