import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, Card, CardContent, Alert } from '@mui/material';

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [score, setScore] = useState(null); // Added this line

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
    
    // Check answer immediately
    checkAnswer(questionId, answer);
  };

  const checkAnswer = (questionId, answer) => {
    console.log(`Checking answer for question ${questionId}: ${answer}`);
    axios.post('http://localhost:5000/api/check-answer', { id: questionId, answer })
      .then(response => {
        console.log(`Received response for question ${questionId}:`, response.data);
        setFeedback(prevFeedback => ({
          ...prevFeedback,
          [questionId]: response.data.correct
        }));
      })
      .catch(error => console.error('Error checking answer:', error));
  };

  const handleSubmit = () => {
    const formattedAnswers = Object.keys(answers).map(id => ({
      id: parseInt(id, 10),
      answer: answers[id]
    }));
    axios.post('http://localhost:5000/api/submit', { answers: formattedAnswers })
      .then(response => setScore(response.data))
      .catch(error => console.error('Error submitting quiz:', error));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Book Club Quiz
        </Typography>
        {questions.map(question => (
          <Card sx={{ mb: 2 }} key={question.id}>
            <CardContent>
              <FormControl component="fieldset">
                <FormLabel component="legend">{question.question}</FormLabel>
                <RadioGroup
                  aria-label={`question-${question.id}`}
                  name={`question-${question.id}`}
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                >
                  {question.options.map(option => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </FormControl>
              {feedback[question.id] !== undefined && (
                <Alert severity={feedback[question.id] ? "success" : "error"}>
                  {feedback[question.id] ? "Correct!" : "Incorrect. Try again!"}
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
        <Box textAlign="center">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          {score !== null && (
            <Typography variant="h5" color="secondary" sx={{ mt: 2 }}>
              Your Score: {score.score}/{score.total}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default App;