import React from 'react';
import './App.css';
import QuizComponent from './QuizComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Club Quiz</h1>
        <p>Test your knowledge of popular books!</p>
      </header>
      <main>
        <QuizComponent />
      </main>
      <footer>
        <p>&copy; 2024 Book Club Quiz. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
