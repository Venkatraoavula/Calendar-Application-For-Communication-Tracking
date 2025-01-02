// ReportingModule.jsx
import React from 'react'; // React: always needed
import { Tabs, Tab, Box } from '@mui/material'; // Material UI for styling
import CommunicationFrequencyReport from './CommunicationFrequencyReport'; // Tab 1: Frequency Report
import EngagementEffectivenessReport from './EngagementEffectivenessReport'; // Tab 2: Engagement Effectiveness
import OverdueTrendsReport from './OverdueTrendsReport'; // Tab 3: Overdue Trends
import ActivityLog from './ActivityLog'; // Tab 4: Activity Log

const ReportingModule = () => {
  const [currentTab, setCurrentTab] = React.useState(0); // Tab state

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue); // Update tab state
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', padding: 2 }}> {/* Main container */}
      <Tabs value={currentTab} onChange={handleChange} aria-label="Reporting Tabs"> {/* Tabs */}
        <Tab label="Communication Frequency" /> {/* Tab 1 */}
        <Tab label="Engagement Effectiveness" /> {/* Tab 2 */}
        <Tab label="Overdue Trends" /> {/* Tab 3 */}
        <Tab label="Activity Log" /> {/* Tab 4 */}
      </Tabs>
      <Box sx={{ mt: 2 }}> {/* Tab content */}
        {currentTab === 0 && <CommunicationFrequencyReport />} {/* Content for Tab 1 */}
        {currentTab === 1 && <EngagementEffectivenessReport />} {/* Content for Tab 2 */}
        {currentTab === 2 && <OverdueTrendsReport />} {/* Content for Tab 3 */}
        {currentTab === 3 && <ActivityLog />} {/* Content for Tab 4 */}
      </Box>
    </Box>
  );
};

export default ReportingModule; // Default export
