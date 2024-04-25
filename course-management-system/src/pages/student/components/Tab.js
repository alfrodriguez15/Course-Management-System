import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CollapsibleTable from './CollapsibleTable'; // Import your CollapsibleTable component here
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/esm/Col';

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
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/editSchedule">
          <Button
            className='find-button'
            variant="primary"
            style={{ margin: '10px', backgroundColor: 'orange' }}
          >
            Edit Schedule
          </Button>
        </Link>
      </div>
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
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('user_email');
      axios.post('http://localhost:5000/schedule', { email })
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error(error); // Log any errors that occur during the request
        });
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {
            data && data.map((element, i) => {
              return <Tab label={element['semester']} {...a11yProps(i)} />
            })
          }
        </Tabs>
      </Box>
      {
        data && data.map((element, i) => {
          return (<CustomTabPanel value={value} index={i}>
            <CollapsibleTable data={element} />
          </CustomTabPanel>)
        })
      }
    </Box>
  );
}