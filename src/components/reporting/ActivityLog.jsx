// ActivityLog.jsx
import React, { useState, useEffect } from 'react'; // Importing React and hooks
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'; // Why not use Material UI?

const mockActivityLogs = [ // Some initial activity logs for display
  { id: 1, timestamp: '2024-12-29 10:00', activity: 'Sent Email to ENTNT' },
  { id: 2, timestamp: '2024-12-29 10:05', activity: 'LinkedIn Message sent to GOOGLE' },
];

const ActivityLog = () => {
  const [logs, setLogs] = useState(mockActivityLogs); // State to hold activity logs

  useEffect(() => {
    // Simulate real-time activity by adding a new log every 10 seconds
    const interval = setInterval(() => {
      const newLog = {
        id: logs.length + 1, // Increment ID
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '), // Format timestamp
        activity: `New activity ${logs.length + 1}`, // Generic activity description
      };
      setLogs((prevLogs) => [newLog, ...prevLogs]); // Prepend new log
    }, 10000); // Trigger every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [logs]); // Dependency array

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Real-Time Activity Log {/* Big title for a simple feature */}
      </Typography>
      <List sx={{ maxHeight: 400, overflow: 'auto', bgcolor: 'background.paper' }}> {/* Styling */}
        {logs.map((log) => (
          <ListItem key={log.id} divider> {/* Divider for aesthetic */}
            <ListItemText primary={log.activity} secondary={log.timestamp} /> {/* Show activity and time */}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActivityLog; // End of file, what else do we need?
