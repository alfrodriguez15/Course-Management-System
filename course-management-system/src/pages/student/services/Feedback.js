import { Typography, Box, TextField, Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import Sidebar from '../components/Sidebar';
import StarIcon from '@mui/icons-material/Star';
import * as React from 'react';
import axios from 'axios';

const labels = {
    1: 'Difficult',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

export default function Feedback() {
    const [value, setValue] = React.useState(0); // Initialize value with a default value (e.g., 0)
    const [hover, setHover] = React.useState(-1);
    const [feedback, setFeedback] = React.useState('');
    const [feedbackMessage, setFeedbackMessage] = React.useState('');

    function handleClickSubmit() {
        axios.post('http://localhost:5000/submitfeedback', {
            value,
            feedback
        })
            .then(response => {
                console.log(response.data); // Log the response from the backend
                setValue(0); // Reset the rating to default value
                setFeedback(''); // Reset the feedback
                setFeedbackMessage(response.data.message); // Set the feedback message in state (e.g. "Feedback submitted successfully")
            })
            .catch(error => {
                console.error(error); // Log any errors that occur during the request
                setFeedbackMessage(error.response.data.message);
            });
    }

    return (
        <>
            <Sidebar />

            <Box sx={{ textAlign: 'center', padding: '10px' }}>
                <Typography variant="h4" gutterBottom>
                    Give us Feedback!
                </Typography>

                {/* Ratings */}
                <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
                    <Typography variant="h5" gutterBottom>
                        Rating
                    </Typography>
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 'auto',
                        }}
                    >
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={0.5}
                            getLabelText={(value) => `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`}
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

                {/* Write a Review */}
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
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </Box>
                {feedbackMessage && <p className="error">{feedbackMessage}</p>}
                {/* Submit Button */}
                <Button variant="contained" style={{ backgroundColor: '#861F41', color: 'white' }}  onClick={handleClickSubmit}>
                    Submit
                </Button>
            </Box>
        </>
    );
}
