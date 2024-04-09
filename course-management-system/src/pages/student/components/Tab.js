import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CollapsibleTable from './CollapsibleTable'; // Import your CollapsibleTable component here

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Spring 2024" {...a11yProps(0)} />
          <Tab label="Summer 2024" {...a11yProps(1)} />
          <Tab label="Fall 2024" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CollapsibleTable /> {/* Render the CollapsibleTable component inside Tab 1 */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <CollapsibleTable />
        {/* Render additional components or content inside Tab 2 if needed */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <CollapsibleTable />
        {/* Render additional components or content inside Tab 3 if needed */}
      </CustomTabPanel>
    </Box>
  );
}