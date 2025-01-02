// OverdueTrendsReport.jsx

import React, { useState } from 'react'; // React is a must-have, right?
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Recharts for the win!
import PropTypes from 'prop-types';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Grid, Typography } from '@mui/material'; // Fancy UI library

// Mock data that never gets old
const MOCK_DATA = [
  { date: '2024-01-01', ENTNT: 5,  MICROSOFT: 7 },
  { date: '2024-01-02', ENTNT: 2,  MICROSOFT: 6 },
  { date: '2024-01-03', ENTNT: 3,  MICROSOFT: 5 },
  { date: '2024-01-04', ENTNT: 4,  MICROSOFT: 3 },
  { date: '2024-01-05', ENTNT: 1,  MICROSOFT: 4 },
];

// Random colors for our lines
const COLORS = ['#9e695e', '#c634bb'];

const OverdueTrendsReport = () => {
  const availableCompanies = MOCK_DATA.length > 0 ? Object.keys(MOCK_DATA[0]).filter((key) => key !== 'date') : []; // Companies in the data
  const [companyFilter, setCompanyFilter] = useState('All'); // Which company are we looking at?
  const [startDate, setStartDate] = useState('2024-01-01'); // Start of the universe
  const [endDate, setEndDate] = useState('2024-01-07'); // End of the world

  // Filter the data based on user input. Why not?
  const filteredData = MOCK_DATA.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
  }).map((entry) => {
    if (companyFilter === 'All') return entry;
    return { date: entry.date, [companyFilter]: entry[companyFilter] };
  });

  return (
    <Box sx={{ padding: 4 }}> {/* The whole enchilada */}
      <Typography variant="h5" align="center" gutterBottom>Overdue Communication Trends</Typography>
      <Box sx={{ mb: 3 }}> {/* Filters */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4} md={3}> {/* Company dropdown */}
            <FormControl fullWidth>
              <InputLabel>Company</InputLabel>
              <Select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
                <MenuItem value="All">All</MenuItem>
                {availableCompanies.map((company) => (
                  <MenuItem key={company} value={company}>{company}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={3}> {/* Start date */}
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}> {/* End date */}
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
      {filteredData.length > 0 ? ( // Chart or bust!
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}> {/* A work of art */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {availableCompanies.map((company, index) => (
              <Line key={company} type="monotone" dataKey={company} stroke={COLORS[index % COLORS.length]} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
  );
};

export default OverdueTrendsReport; // Because it wouldn’t work otherwise
