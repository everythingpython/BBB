import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function QuizComponent() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/questions`)
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const answers = Object.entries(userAnswers).map(([id, answer]) => ({ id: parseInt(id), answer }));
    axios.post(`${API_URL}/api/submit`, answers)
      .then(response => setScore(response.data))
      .catch(error => console.error('Error submitting answers:', error));
  };

  return (
    <div>
      {questions.map(question => (
        <div key={question.id}>
          <h3>{question.question}</h3>
          {question.options.map(option => (
            <label key={option}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                onChange={() => handleAnswerChange(question.id, option)}
                checked={userAnswers[question.id] === option}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score && <p>Your score: {score.score} out of {score.total}</p>}
    </div>
  );
}

export default QuizComponent;
