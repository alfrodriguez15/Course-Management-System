import * as React from 'react';
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
import './Profile.css'

//data of user info goes in here
const data = [
    { icon: <People />, label: 'Insert user name here' },
    { icon: <Work />, label: 'Major' },
    { icon: <Email />, label: 'Email' },
    { icon: <School />, label: 'Education' },
    { icon: <CalendarToday />, label: 'Graduation Date' },
];

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
    const [open, setOpen] = React.useState(true);

    // Function to prevent default behavior (clicking)
    const preventDefaultClick = (event) => {
        event.preventDefault();
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
                            <ListItemButton component="a" href="#customized-list" >
                                <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                <ListItemText
                                    sx={{ my: 0 }}
                                    primary="My Account"
                                    primaryTypographyProps={{
                                        fontSize: 20,
                                        fontWeight: 'medium',
                                        letterSpacing: 0,
                                    }}
                                />
                            </ListItemButton>
                            <Divider />

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
                                    data.map((item) => (
                                        <ListItemButton
                                            key={item.label}
                                            sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                                            onClick={preventDefaultClick}
                                        >
                                            <ListItemIcon sx={{ color: 'inherit' }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.label}
                                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                            />
                                        </ListItemButton>
                                    ))}
                            </Box>
                        </FireNav>
                    </Paper>
                </ThemeProvider>
            </Box>
        </>
    );
}
