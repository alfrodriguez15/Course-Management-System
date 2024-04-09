import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import BasicTabs from './components/Tab.js';
import TextField from '@mui/material/TextField';

function SchedulePage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };


  //store value inputted
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="schedule-page">
      <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />
      <div className={showSidebar ? "content-with-sidebar" : "content"}>
        <BasicTabs />
        <div className="search-bar">
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            size="small"
            fullWidth
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;