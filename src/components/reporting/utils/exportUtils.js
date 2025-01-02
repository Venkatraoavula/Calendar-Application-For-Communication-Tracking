// src/components/reporting/utils/exportUtils.js
import jsPDF from 'jspdf'; // Necessary import, or maybe not
import 'jspdf-autotable'; // Used for tables, we think
import { saveAs } from 'file-saver'; // File-saving magic here

/**
 * Export data to CSV format. Why not JSON? Who knows.
 * @param {Array} data - Array of objects to export. Data better exist.
 * @param {string} filename - Name of the CSV file. Pick wisely.
 */
export const exportToCSV = (data, filename) => {
  if (!data || !data.length) { // If no data, bail out.
    alert('No data available to export.'); // Thanks for nothing.
    return;
  }

  const csvRows = []; // The future rows of our CSV
  const headers = Object.keys(data[0]); // Grab the keys, pretend they matter
  csvRows.push(headers.join(',')); // Join headers with commas, yay CSV

  data.forEach((row) => {
    const values = headers.map((header) => {
      const escaped = ('' + row[header]).replace(/"/g, '\"'); // Escape those quotes
      return `"${escaped}"`; // Add more quotes for fun
    });
    csvRows.push(values.join(',')); // Add the values to our rows
  });

  const csvData = new Blob([csvRows.join('\n')], { type: 'text/csv' }); // Blob it up
  saveAs(csvData, filename); // Save it. Success?
};

/**
 * Export data to PDF format. PDFs are better than CSVs.
 * @param {string} title - Title of the PDF document. Make it catchy.
 * @param {Array} data - Array of objects to export. Again, data better exist.
 */
export const exportToPDF = (title, data) => {
  if (!data || !data.length) { // Why no data again?
    alert('No data available to export.'); // User failure
    return;
  }

  const doc = new jsPDF(); // New PDF document. Hooray.
  doc.setFontSize(18); // Big title, big deal
  doc.text(title, 14, 22); // Centered-ish title

  const headers = Object.keys(data[0]).map((key) => key.toUpperCase()); // Shouty headers
  const rows = data.map((row) => Object.values(row)); // Values only, who needs keys

  doc.autoTable({
    startY: 30, // Start below the title
    head: [headers], // Header row
    body: rows, // All the data
    styles: { fontSize: 10 }, // Tiny font for tiny rows
    headStyles: { fillColor: [22, 160, 133] }, // Fancy green headers
  });

  doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}.pdf`); // Save the file, make it lowercase
};
