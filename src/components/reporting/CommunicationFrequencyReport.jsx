// CommunicationFrequencyReport.jsx
import React, { useState, useEffect } from 'react'; // Because React is essential
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from '@mui/material'; // Importing Material UI for components
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Recharts for charts
import { saveAs } from 'file-saver'; // File-saving utility
import { exportToCSV, exportToPDF } from './utils/exportUtils'; // Export utilities
import jsPDF from 'jspdf'; // Another PDF library

const mockData = [
  { company: 'WIPRO', method: 'Email', count: 30 },
  { company: 'WIPRO', method: 'LinkedIn Post', count: 80 },
  { company: 'ENTNT', method: 'Email', count: 20 },
  { company: 'ENTNT', method: 'Phone Call', count: 15 },
];

const CommunicationFrequencyReport = () => {
  const [company, setCompany] = useState(''); // Company filter state
  const [method, setMethod] = useState(''); // Method filter state
  const [dateRange, setDateRange] = useState({ from: '', to: '' }); // Date range state
  const [filteredData, setFilteredData] = useState(mockData); // Filtered data state

  const companies = [...new Set(mockData.map((item) => item.company))]; // Unique companies
  const methods = [...new Set(mockData.map((item) => item.method))]; // Unique methods

  const handleFilter = () => {
    let data = [...mockData];
    if (company) data = data.filter((item) => item.company === company);
    if (method) data = data.filter((item) => item.method === method);
    setFilteredData(data); // Update filtered data
  };

  const handleExportCSV = () => {
    exportToCSV(filteredData, 'communication_frequency_report.csv'); // Export CSV
  };

  const handleExportPDF = () => {
    exportToPDF('Communication Frequency Report', filteredData); // Export PDF
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}> {/* Filter controls */}
        <FormControl sx={{ minWidth: 120 }}> {/* Company dropdown */}
          <InputLabel>Company</InputLabel>
          <Select value={company} label="Company" onChange={(e) => setCompany(e.target.value)}>
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {companies.map((comp) => (
              <MenuItem key={comp} value={comp}>
                {comp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}> {/* Method dropdown */}
          <InputLabel>Communication Method</InputLabel>
          <Select value={method} label="Communication Method" onChange={(e) => setMethod(e.target.value)}>
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {methods.map((meth) => (
              <MenuItem key={meth} value={meth}>
                {meth}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="From"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateRange.from}
          onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
        />
        <TextField
          label="To"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateRange.to}
          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
        />
        <Button variant="contained" onClick={handleFilter}>
          Filter
        </Button>
      </Box>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={filteredData}>
          <XAxis dataKey="method" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#1976d2" name="Communication Count" />
        </BarChart>
      </ResponsiveContainer>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}> {/* Export buttons */}
        <Button variant="outlined" onClick={handleExportCSV}>
          Export CSV
        </Button>
        <Button variant="outlined" onClick={handleExportPDF}>
          Export PDF
        </Button>
      </Box>
    </Box>
  );
};

export default CommunicationFrequencyReport; // Export the component
