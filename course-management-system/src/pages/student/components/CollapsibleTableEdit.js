import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function createData(name, subject, professor, days, time, location) {
    return {
        name,
        subject,
        professor,
        days,
        time,
        location
    };
}

function createAdditionalData(crn, section_type, modality, credit_hours) {
    return {
        crn,
        section_type,
        modality,
        credit_hours,
    };
}

function Row(props) {
    const navigate = useNavigate();
    const { row, additionalRow } = props;
    const [open, setOpen] = React.useState(false);
    const [udcData, setUdcData] = React.useState([]);
    const [rmpData, setRmpData] = React.useState([]);
    localStorage.setItem('semester', props.data[props.value]['semester']);
    console.log(props.value);

    function handleDisplayDetails() {
        setOpen(!open);
        const subject = row.subject.split(" ")[0];
        const code = row.subject.split(" ")[1];
        const professor = row.professor;
        console.log(subject, code, professor);
        axios.post('http://localhost:5000/analytics', { subject, code, professor })
            .then(response => {
                setUdcData(response.data);
            })
            .catch(error => {
                console.error(error); // Log any errors that occur during the request
            });
        axios.post('http://localhost:5000/rmp', { professor })
            .then(response => {
                setRmpData(response.data);
            })
            .catch(error => {
                console.error(error); // Log any errors that occur during the request
            });
    }

    function handleDeleteCourse() {
        const email = localStorage.getItem('user_email');
        const semester = props.data[props.value]['semester'];
        const crn = additionalRow.crn;
        console.log(email, semester, crn);
        axios.post('http://localhost:5000/deletecourse', {
            email, semester, crn
        })
            .then(response => {
                console.log("Course deleted!");
            })
            .catch(error => {
                console.error(error); // Log any errors that occur during the request
            });
        navigate('/schedule');
    }

    return (

        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={handleDisplayDetails}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.subject}</TableCell>
                <TableCell align="right">{row.professor}</TableCell>
                <TableCell align="right">{row.days}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">
                    <Button
                        className='add-button'
                        variant="primary"
                        style={{ margin: '10px', backgroundColor: 'orange' }}
                        onClick={handleDeleteCourse}
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Additional Information
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">CRN</TableCell>
                                        <TableCell align="right">Schedule Type</TableCell>
                                        <TableCell align="right">Modality</TableCell>
                                        <TableCell align="right">Credit Hours</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="right">{additionalRow.crn}</TableCell>
                                        <TableCell align="right">{additionalRow.section_type}</TableCell>
                                        <TableCell align="right">{additionalRow.modality}</TableCell>
                                        <TableCell align="right">{additionalRow.credit_hours}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
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
                                    {udcData && udcData.map((element, i) => {
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
                                        <TableCell align="right">Overall Quality (out of 5)</TableCell>
                                        <TableCell align="right">Level of Difficulty (out of 5)</TableCell>
                                        <TableCell align="right">Would take again (%)</TableCell>
                                        <TableCell align="right">Number of Ratings</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        {
                                            rmpData && rmpData.map((e, i) => {
                                                return <TableCell align="right">{e}</TableCell>
                                            })
                                        }
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTableEdit(props) {
    const [rows, setRows] = React.useState([]);
    const [adddtionalRow, setAdditionalRow] = React.useState([]);

    React.useEffect(() => {
        const data = props.data;
        if (data) {
            const newRows = [];
            const additionalInfo = [];
            data['courses'].forEach(element => {
                const subject = element['subject'];
                const code = element['code']
                const name = element['name'];
                const professor = element['professor'];
                const days = element['days'];
                const begin_time = element['begin_time'];
                const end_time = element['end_time'];
                const location = element['location'];
                let courseData = createData(name, subject.concat(" ", code), professor, days, begin_time.concat(" - ", end_time), location)
                newRows.push(courseData);

                const crn = element['crn'];
                const section_type = element['section_type'];
                const modality = element['modality'];
                const credit_hours = element['credit_hours'];
                let additionalData = createAdditionalData(crn, section_type, modality, credit_hours)
                additionalInfo.push(additionalData)
            });
            setRows(newRows);
            setAdditionalRow(additionalInfo);
        }
    }, []);
    return (
        <React.Fragment>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Course</TableCell>
                            <TableCell align="right">Instructor</TableCell>
                            <TableCell align="right">Days</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <Row key={row.name} row={row} additionalRow={adddtionalRow[index]} data={props.alldata} value={props.value}/> // Pass additionalRows prop
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}