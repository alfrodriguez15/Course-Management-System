import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Rating } from '@mui/material';
import Navbar from '../components/Navbar'

function Reviews() {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        // Fetch feedback data when the component mounts
        axios.get('http://localhost:5000/getfeedback')
            .then(response => {
                setFeedback(response.data); // Store feedback data in state
            })
            .catch(error => {
                console.error('Error fetching feedback:', error);
            });
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <div className="reviews-page">
            <Navbar />
            <Box sx={{ textAlign: 'center', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Feedback from our users
                </Typography>
                {/* Render feedback data */}
                {feedback.map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography>{item.feedback}</Typography>
                            <Typography variant="subtitle1">Rating: {item.value}</Typography>
                            <Rating value={item.value} readOnly />
                        </Paper>
                    </Box>
                ))}
            </Box>
        </div>
    );
}

export default Reviews;
