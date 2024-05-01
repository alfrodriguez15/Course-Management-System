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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

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
  const [open, setOpen] = React.useState(false);
  const [newSemesterName, setNewSemesterName] = React.useState('');
  const navigate = useNavigate();

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

  const handleNewSchedule = () => {
    setOpen(true); // Open the dialog when New Schedule is clicked
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  const handleSave = () => {
    setOpen(false); // Close the dialog
    const email = localStorage.getItem('user_email');
    axios.post('http://localhost:5000/addschedule', { email, newSemesterName })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error); // Log any errors that occur during the request
      });
    navigate('/editSchedule');
  };

  return (

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {
          data.length > 0 ?
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {
                data && data.map((element, i) => {
                  return <Tab label={element['semester']} {...a11yProps(i)} />
                })
              }
            </Tabs> : <Button
              className='find-button'
              variant="primary"
              style={{ margin: '10px', backgroundColor: 'orange' }}
              onClick={handleNewSchedule}
            >
              Create New Schedule
            </Button>
        }
      </Box>
      {
        data && data.map((element, i) => {
          return (<CustomTabPanel value={value} index={i}>
            <CollapsibleTable data={element} />
          </CustomTabPanel>)
        })
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Semester</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the semester:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="semesterName"
            label="Semester Name"
            type="text"
            fullWidth
            value={newSemesterName}
            onChange={(e) => setNewSemesterName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}