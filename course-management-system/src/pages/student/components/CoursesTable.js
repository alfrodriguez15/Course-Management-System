import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import axios from 'axios';

function Row({ course }) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    function handleDisplayDetails() {
        setOpen(!open);
        const subject = course.subject;
        const code = course.code;
        const professor = course.professor;
        axios.post('http://localhost:5000/analytics', { subject, code, professor })
            .then(response => {
                // console.log(response.data); // Log the response from the backend
                // Optionally, you can handle the response here, such as redirecting the user if login is successful
                let newData = []
                newData.push(response.data);
                setData(newData);
            })
            .catch(error => {
                console.error(error); // Log any errors that occur during the request
            });
    }

    return (
        <>
            <TableRow key={course.crn}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={handleDisplayDetails}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="right">{course.crn}</TableCell>
                <TableCell align="right">{course.subject}-{course.code}</TableCell>
                <TableCell align="right">{course.name}</TableCell>
                <TableCell align="right">{course.section_type}</TableCell>
                <TableCell align="right">{course.modality}</TableCell>
                <TableCell align="right">{course.credit_hours}</TableCell>
                <TableCell align="right">{course.capacity}</TableCell>
                <TableCell align="right">{course.professor}</TableCell>
                <TableCell align="right">{course.schedule.Days.join(' ')}</TableCell>
                <TableCell align="right">{course.schedule.Begin}</TableCell>
                <TableCell align="right">{course.schedule.End}</TableCell>
                <TableCell align="right">{course.schedule.Location}</TableCell>
            </TableRow>
            {open && (
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Grade Distribution
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">Academic Year</TableCell>
                                            <TableCell align="right">Term</TableCell>
                                            <TableCell align="right">GPA</TableCell>
                                            <TableCell align="right">A(%)</TableCell>
                                            <TableCell align="right">A-(%)</TableCell>
                                            <TableCell align="right">B+(%)</TableCell>
                                            <TableCell align="right">B(%)</TableCell>
                                            <TableCell align="right">B-(%)</TableCell>
                                            <TableCell align="right">C+(%)</TableCell>
                                            <TableCell align="right">C(%)</TableCell>
                                            <TableCell align="right">C-(%)</TableCell>
                                            <TableCell align="right">D+(%)</TableCell>
                                            <TableCell align="right">D(%)</TableCell>
                                            <TableCell align="right">D-(%)</TableCell>
                                            <TableCell align="right">F(%)</TableCell>
                                            <TableCell align="right">Withdraws</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.length > 0 && data[0].map((element, i) => {
                                            return <TableRow>
                                                {
                                                    element.map((e, i) => {
                                                        return <TableCell align="right">{e}</TableCell>
                                                    })
                                                }
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Rate My Professor
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">Name</TableCell>
                                            <TableCell align="right">Teaches</TableCell>
                                            <TableCell align="right">At</TableCell>
                                            <TableCell align="right">Overall Quality</TableCell>
                                            <TableCell align="right">Would take again (%)</TableCell>
                                            <TableCell align="right">Level of Difficulty</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
}

function CoursesTable({ courses }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="right">CRN</TableCell>
                        <TableCell align="right">Course</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Schedule Type</TableCell>
                        <TableCell align="right">Modality</TableCell>
                        <TableCell align="right">Credit Hours</TableCell>
                        <TableCell align="right">Seats</TableCell>
                        <TableCell align="right">Instructor</TableCell>
                        <TableCell align="right">Days</TableCell>
                        <TableCell align="right">Begin</TableCell>
                        <TableCell align="right">End</TableCell>
                        <TableCell align="right">Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses.map((course) => (
                        <Row key={course.crn} course={course} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CoursesTable;