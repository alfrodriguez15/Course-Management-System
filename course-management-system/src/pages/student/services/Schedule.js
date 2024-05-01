import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import BasicTabs from '../components/Tab.js';
import { Box, IconButton } from '@mui/material';

function SchedulePage() {
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

      </div>
      
    </div>
  );
}

export default SchedulePage;