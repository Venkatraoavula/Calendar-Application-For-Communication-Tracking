// src/components/reporting/utils/exportUtils.js
import jsPDF from 'jspdf'; // jsPDF library for generating PDFs
import 'jspdf-autotable'; // Plugin for table generation
import { saveAs } from 'file-saver'; // FileSaver library for downloading files

/**
 * Export data to CSV format.
 * Why do we even need this? Isn't JSON enough?
 * @param {Array} data - Array of objects to export.
 * @param {string} filename - Name of the CSV file.
 */
export const exportToCSV = (data, filename) => {
    if (!data || !data.length) { // No data, no export
        alert('No data available to export.');
        return;
    }
    // Initialize CSV rows
    const csvRows = []; // Why an array?
    const headers = Object.keys(data[0]); // Fetch headers from the first object
    csvRows.push(headers.join(',')); // Add headers row

    data.forEach((row) => { // Iterate through data
        const values = headers.map((header) => { // Map each header to its value
            const escaped = ('' + row[header]).replace(/"/g, '\"'); // Escape double quotes
            return `"${escaped}"`; // Wrap value in double quotes
        });
        csvRows.push(values.join(',')); // Join values with commas
    });

    // Blob creation for CSV
    const csvData = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    saveAs(csvData, filename); // Use FileSaver to save the file
};

/**
 * Export data to PDF format.
 * Tables in PDFs? Revolutionary!
 * @param {string} title - Title of the PDF document.
 * @param {Array} data - Array of objects to export.
 */
export const exportToPDF = (title, data) => {
    if (!data || !data.length) { // Empty data check
        alert('No data available to export.');
        return;
    }

    const doc = new jsPDF(); // Create new jsPDF instance
    doc.setFontSize(18); // Set font size for title
    doc.text(title, 14, 22); // Add title text
    
    const headers = Object.keys(data[0]).map((key) => key.toUpperCase()); // Capitalize headers
    const rows = data.map((row) => Object.values(row)); // Extract values for each row

    // Generate the table in PDF
    doc.autoTable({
        startY: 30, // Table starts at 30 units from the top
        head: [headers], // Table headers
        body: rows, // Table rows
        styles: { fontSize: 10 }, // Table font size
        headStyles: { fillColor: [22, 160, 133] }, // Header background color
    });

    // Save the PDF with a formatted filename
    doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}.pdf`); // Replace spaces with underscores
};
