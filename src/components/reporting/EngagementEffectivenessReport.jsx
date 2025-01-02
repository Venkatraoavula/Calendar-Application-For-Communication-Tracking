// EngagementEffectivenessReport.jsx
import React, { useState } from 'react'; // Core React imports
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'; // Material UI components
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Recharts for visualization
import jsPDF from 'jspdf'; // For PDF export
import 'jspdf-autotable'; // Add tables to PDF, just in case

// Export utility to CSV - why not JSON? Who knows.
const exportToCSV = (data, filename) => {
  const csvRows = []; // Rows for the CSV
  const headers = Object.keys(data[0]); // Get headers from data keys
  csvRows.push(headers.join(',')); // Add headers to CSV

  data.forEach((row) => { // Loop through data
    const values = headers.map((header) => row[header]); // Map data values
    csvRows.push(values.join(',')); // Join values with comma
  });

  const csvContent = csvRows.join('\n'); // Combine rows into a single string
  const blob = new Blob([csvContent], { type: 'text/csv' }); // Create a blob for the CSV
  const url = window.URL.createObjectURL(blob); // Generate a downloadable URL

  const a = document.createElement('a'); // Create a hidden anchor element
  a.setAttribute('hidden', ''); // Set it hidden
  a.setAttribute('href', url); // Attach the URL
  a.setAttribute('download', filename); // Set filename
  document.body.appendChild(a); // Append to body
  a.click(); // Trigger click
  document.body.removeChild(a); // Remove after click
};

// Export utility to PDF - because PDFs are everywhere.
const exportToPDF = (title, data) => {
  const doc = new jsPDF(); // Initialize jsPDF
  doc.setFontSize(18); // Set title font size
  doc.text(title, 14, 22); // Add title text
  const tableColumn = Object.keys(data[0]); // Get table headers
  const tableRows = data.map((row) => Object.values(row)); // Map data rows
  doc.autoTable({ head: [tableColumn], body: tableRows, startY: 30 }); // Add table
  doc.save(`${title}.pdf`); // Save the file
};

// Mock data - for testing purposes.
const companyEffectivenessData = {
  ENTNT: [
    { method: 'Email', successRate: 20 },
    { method: 'Phone Call', successRate: 30 },
    { method: 'LinkedIn Message', successRate: 10 },
   
  ],
  GOOGLE: [
    { method: 'Email', successRate: 16 },
    { method: 'Phone Call', successRate: 10 },
    { method: 'LinkedIn Message', successRate: 30 },
    
  ],
  MICROSOFT: [
    { method: 'Email', successRate: 10 },
    { method: 'Phone Call', successRate: 16 },
    { method: 'LinkedIn Message', successRate: 20 },
    
  ],
};

// Colors for pie chart - why not rainbow?
const COLORS = ['#c634bb', '#34a9c6', '#34c665', '#FF8042', 'c65734', '#3342022'];

const EngagementEffectivenessReport = () => {
  const [company, setCompany] = useState(''); // State for selected company
  const [filteredData, setFilteredData] = useState([]); // Filtered data state
  const companies = ['ENTNT', 'GOOGLE', 'MICROSOFT']; // List of companies

  // Effect to handle filtering
  React.useEffect(() => {
    if (!company) { // Aggregate if no company selected
      const aggregated = companies.reduce((acc, comp) => {
        companyEffectivenessData[comp].forEach((item, index) => {
          if (!acc[index]) acc[index] = { method: item.method, successRate: 0 };
          acc[index].successRate += item.successRate; // Aggregate success rate
        });
        return acc;
      }, []);
      setFilteredData(aggregated.map((item) => ({ method: item.method, successRate: Math.round(item.successRate / companies.length) })));
    } else {
      setFilteredData(companyEffectivenessData[company]);
    }
  }, [company]);

  const handleExportCSV = () => {
    if (filteredData.length === 0) alert('No data to export');
    exportToCSV(filteredData, 'engagement_effectiveness_report.csv');
  };

  const handleExportPDF = () => {
    if (filteredData.length === 0) alert('No data to export');
    exportToPDF(company ? `${company} Engagement Report` : 'All Companies Report', filteredData);
  };

  return (
    <Box sx={{ padding: 4 }}> {/* Root container */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}> {/* Controls */}
        <FormControl sx={{ minWidth: 200 }}> {/* Dropdown */}
          <InputLabel>Company</InputLabel>
          <Select value={company} onChange={(e) => setCompany(e.target.value)}>
            <MenuItem value=""><em>All</em></MenuItem>
            {companies.map((comp) => (<MenuItem key={comp} value={comp}>{comp}</MenuItem>))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => {}}>Filter</Button>
        <Button variant="outlined" onClick={handleExportCSV}>Export CSV</Button>
        <Button variant="outlined" onClick={handleExportPDF}>Export PDF</Button>
      </Box>
      {filteredData.length > 0 ? ( // Conditionally render chart
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie data={filteredData} dataKey="successRate" nameKey="method" cx="50%" cy="50%" outerRadius={200} label>
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 10 }}> {/* Fallback */}
          <p>No data available for the selected company.</p>
        </Box>
      )}
    </Box>
  );
};

export default EngagementEffectivenessReport;
