import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import People from '@mui/icons-material/People';
import Sidebar from './components/Sidebar';
import Email from '@mui/icons-material/Email';
import School from '@mui/icons-material/School';
import Work from '@mui/icons-material/Work';
import CalendarToday from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './Profile.css';

const FireNav = styled(List)({
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 20,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
});

export default function ProfileList() {
    const [open, setOpen] = useState(true);
    const [userData, setUserData] = useState(null); // Initialize user data state as null
    const [editOpen, setEditOpen] = useState(false);
    const [editedUserData, setEditedUserData] = useState({});
    const user_email = localStorage.getItem('user_email');

    const data = [
        { icon: <People />, label: 'name' },
        { icon: <Email />, label: 'email' },
        { icon: <Work />, label: 'degree' },
        { icon: <School />, label: 'education' },
        { icon: <CalendarToday />, label: 'graduation_date' },
    ];

    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/getprofile', {
                user_email: user_email
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Fetch data only once on component mount

    // Function to prevent default behavior (clicking)
    const preventDefaultClick = (event) => {
        event.preventDefault();
    };

    const handleEditOpen = () => {
        setEditedUserData(userData); // Initialize editedUserData with current userData
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedUserData({ ...editedUserData, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            await axios.post('http://localhost:5000/editprofile', {
                user_email: user_email,
                editedUserData: editedUserData
            });
            localStorage.setItem('user_email', editedUserData.email); // Update user_name in localStorage (if changed
            setUserData(editedUserData); // Update userData with editedUserData
            setEditOpen(false);
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    return (
        <>
            <Sidebar />

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '30vh',
                width: '100%',
            }}>
                <ThemeProvider
                    theme={createTheme({
                        components: {
                            MuiListItemButton: {
                                defaultProps: {
                                    disableTouchRipple: true,
                                },
                            },
                        },
                        palette: {
                            mode: 'dark',
                            primary: { main: 'rgb(134, 31, 65)' },
                            background: { paper: 'rgb(134, 31, 65)' },
                        },
                    })}
                >
                    <Paper elevation={0} sx={{
                        height: '20%',
                        width: '50%'
                    }}>
                        <FireNav component="nav" disablePadding>
                            <ListItemButton component="a" onClick={handleEditOpen}>
                                <ListItemIcon sx={{ fontSize: 20 }}> {/* Set icon color to maroon */}
                                    🖋️
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ my: 0 }}
                                    primary="Edit Account"
                                    primaryTypographyProps={{
                                        fontSize: 20,
                                        fontWeight: 'medium',
                                        letterSpacing: 0,
                                    }}
                                />
                            </ListItemButton>
                            <ListItemButton component="a" href="#customized-list" >
                                <ListItemIcon sx={{ fontSize: 20, color: 'rgb(134, 31, 65)' }}>
                                    🗂️
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ my: 0, color: 'rgb(134, 31, 65)' }}
                                    primary="My Account"
                                    primaryTypographyProps={{
                                        fontSize: 20,
                                        fontWeight: 'medium',
                                        letterSpacing: 0,
                                    }}
                                />
                            </ListItemButton>
                            <Divider />
                            <Box
                                sx={{
                                    bgcolor: open ? 'rgb(134, 31, 65)' : null,
                                    pb: open ? 2 : 0,
                                }}
                            >
                                <ListItemButton
                                    alignItems="flex-start"

                                >
                                    <ListItemText
                                        primary="User Information"
                                        primaryTypographyProps={{
                                            fontSize: 15,
                                            fontWeight: 'medium',
                                            lineHeight: '20px',
                                            mb: '2px',
                                        }}

                                    />

                                </ListItemButton>
                                {
                                    userData && data.map((item) => (
                                        <ListItemButton
                                            key={item.label}
                                            sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                                            onClick={preventDefaultClick}
                                        >
                                            <ListItemIcon sx={{ color: 'inherit' }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={userData[item.label.toLowerCase()]}
                                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                            />
                                        </ListItemButton>
                                    ))}
                            </Box>
                        </FireNav>
                    </Paper>
                </ThemeProvider>
            </Box>

            {/* Edit Account Dialog */}
            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Edit Account</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={editedUserData.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={editedUserData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="text"
                        fullWidth
                        value={editedUserData.password}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="major"
                        name="major"
                        label="Major"
                        type="text"
                        fullWidth
                        value={editedUserData.major}
                        onChange={handleInputChange}
                    />
                    <div>
                        <span>Degree: </span>
                        <select
                            margin="dense"
                            id="degree"
                            name="degree"
                            label="degree"
                            type="text"
                            fullWidth
                            value={editedUserData.degree}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Degree *</option>
                            <option value="Associate's Degree">Associate's Degree</option>
                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                            <option value="Master's Degree">Master's Degree</option>
                            <option value="phDoctoral Degree (Ph.D.)">Doctoral Degree (Ph.D.)</option>
                        </select>
                    </div>
                    <div>
                        <span>Education: </span>
                        <select
                            margin="dense"
                            id="education"
                            name="education"
                            label="Education"
                            type="text"
                            fullWidth
                            value={editedUserData.education}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Education *</option>
                            <option value="College of Agriculture and Life Sciences">College of Agriculture and Life Sciences</option>
                            <option value="College of Architecture, Arts, and Design">College of Architecture, Arts, and Design</option>
                            <option value="Pamplin College of Business">Pamplin College of Business</option>
                            <option value="College of Engineering">College of Engineering</option>
                            <option value="College of Liberal Arts and Human Sciences">College of Liberal Arts and Human Sciences</option>
                            <option value="College of Natural Resources and Environment">College of Natural Resources and Environment</option>
                            <option value="College of Science">College of Science</option>
                        </select>
                    </div>
                    <div>
                        <span>Graduation Date: </span>
                        <input
                            margin="dense"
                            id="graduation_date"
                            name="graduation_date"
                            label="Graduation Date"
                            type="month"
                            fullWidth
                            value={editedUserData.graduation_date}
                            onChange={handleInputChange}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}