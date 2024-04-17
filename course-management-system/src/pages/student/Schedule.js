import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import BasicTabs from './components/Tab.js';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import CoursesPage from './Courses.js';

function SchedulePage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  function handleClickEdit() {
  }

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