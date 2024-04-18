import { Typography, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import Sidebar from '../components/Sidebar';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import * as React from 'react';

//for select component layout
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

//for yes or no component layout
const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
        '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
        },
    }),
);

//courses for each professor, if they teach multiple courses
//only sample data for now
const courses = [
    'CS 3114',
    'CS 4604',
    'CS 2114',
    'CS 2505',
    'CS 2506',
];

//grade received for the class with this professor
const grades = [
    'A+',
    'A',
    'A-',
    'B+',
    'B',
    'B-',
    'C+',
    'C',
    'C-',
    'D+',
    'D',
    'D-',
    'F',
    'Drop/Withdrawal',
    'Incomplete',
];

//labels for star ratings
const labels = {
    1: 'Difficult',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

function getStylesCourse(name, course, theme) {
    return {
        fontWeight:
            course.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function getStylesGrade(name, grade, theme) {
    return {
        fontWeight:
            grade.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

//method for yes or no selects
function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
    /**
     * The value of the component.
     */
    value: PropTypes.any,
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function Ratings() {
    //this is for the star ratings
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    //this is for the select boxes
    const theme = useTheme();
    const [course, setCourse] = React.useState([]);
    const [grade, setGrade] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCourse(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setGrade(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            <Sidebar />

            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Rate This Professor
                </Typography>

                {/* Ratings */}
                <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                    <Typography variant="h5" gutterBottom>
                        Ratings
                    </Typography>
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center', // Center horizontally
                            margin: 'auto', // Center vertically
                        }}
                    >
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                </Box>

                {/* Select Course */}
                <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                    <Typography variant="h5" gutterBottom>
                        Select Course
                    </Typography>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="multiple-course-label">Course</InputLabel>
                        <Select
                            labelId="multiple-course-label"
                            id="multiple-course"
                            multiple
                            value={course}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {courses.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStylesCourse(name, course, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Select Grade */}
                <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                    <Typography variant="h5" gutterBottom>
                        Select Grade Received
                    </Typography>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="multiple-grade-label">Grade</InputLabel>
                        <Select
                            labelId="multiple-grade-label"
                            id="multiple-grade"
                            multiple
                            value={grade}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {grades.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStylesGrade(name, grade, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Yes or No */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                    <Typography variant="h5" gutterBottom>
                        Would you take this professor again?
                    </Typography>
                    <RadioGroup name="use-radio-group" defaultValue="yes">
                        <MyFormControlLabel value="yes" label="Yes" control={<Radio />} />
                        <MyFormControlLabel value="no" label="No" control={<Radio />} />
                    </RadioGroup>
                </Box>


                <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
                    <Typography variant="h5" gutterBottom>
                        Write a Review
                    </Typography>
                    <TextField
                        id="feedback"
                        label="Your Feedback"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                    />
                </Box>

            </Box>
        </>
    );
}