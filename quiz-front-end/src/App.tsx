import React, { useEffect } from 'react';
// ignore
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import About from './pages/About';
import CreateQuiz from './pages/CreateQuiz';
import Home from './pages/Home';
import Quizzes from './pages/Quizzes';
import RandomQuestions from './pages/RandomQuestions';

function App() {
  return (
    <div className="bg-base-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="random-questions" element={<RandomQuestions />} />
        <Route path="create-quiz" element={<CreateQuiz />} />
      </Routes>
    </div>
  );
}

export default App;
