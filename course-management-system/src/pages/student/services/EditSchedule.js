import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import BasicTabs from '../components/Tab.js';
import { Box, IconButton } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import CoursesAdd from '../components/CoursesAdd.js';

function EditSchedule() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="schedule-page">
      <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />
      <div className={showSidebar ? "content-with-sidebar" : "content"}>
        <Box>
          <BasicTabs />
        </Box>
        <Box>
          <CoursesAdd />
        </Box>
      </div>
      {/* "Need help" icon button */}
      <IconButton
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: '#fff',
        }}
        onClick={() => {
          // Implement your "need help" functionality here
        }}
      >
        <HelpIcon />
      </IconButton>
    </div>
  );
}

export default EditSchedule;