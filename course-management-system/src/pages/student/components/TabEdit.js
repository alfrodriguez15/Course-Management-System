import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CollapsibleTableEdit from './CollapsibleTableEdit'; // Import your CollapsibleTable component here
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
    const { children, value, index, handleNewSchedule, handleDeleteSchedule, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    className='find-button'
                    variant="primary"
                    style={{ margin: '10px', backgroundColor: 'orange' }}
                    onClick={props.handleNewSchedule} // Add handleNewSchedule function
                >
                    New Schedule
                </Button>
                <Button
                    className='find-button'
                    variant="primary"
                    style={{ margin: '10px', backgroundColor: 'orange' }}
                    onClick={props.handleDeleteSchedule} // Add handleDeleteSchedule function
                >
                    Delete Schedule
                </Button>
                <Link to="/schedule">
                    <Button
                        className='find-button'
                        variant="primary"
                        style={{ margin: '10px', backgroundColor: 'orange' }}
                    >
                        Done
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

export default function BasicTabsEdit() {
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
        navigate('/schedule');
    };

    const handleDeleteSchedule = () => {
        const email = localStorage.getItem('user_email');
        const semester = data[value]['semester'];
        axios.post('http://localhost:5000/deleteschedule', { email, semester })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error); // Log any errors that occur during the request
            });
        navigate('/schedule');
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log("from tabs", value);
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
                    return (<CustomTabPanel value={value} index={i} handleNewSchedule={handleNewSchedule} handleDeleteSchedule={handleDeleteSchedule}>
                        <CollapsibleTableEdit data={element} alldata={data} value={value} />
                    </CustomTabPanel>)
                })
            }
            {/* Dialog for naming the semester */}
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