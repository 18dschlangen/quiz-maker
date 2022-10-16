import React, { useEffect } from "react";
// ignore
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import CreateQuiz from "./pages/CreateQuiz";
import Home from "./pages/Home";
import Quizzes from "./pages/Quizzes";
import RandomQuestions from "./pages/RandomQuestions";
import Quiz from "./pages/Quiz";
import EditQuiz from "./pages/EditQuiz";
import TakeQuiz from "./pages/TakeQuiz";

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
        <Route path="quizzes/:id" element={<Quiz />} />
        <Route path="quizzes/:id/edit" element={<EditQuiz />} />
        <Route path="quizzes/:id/take-quiz" element={<TakeQuiz />} />
      </Routes>
    </div>
  );
}

export default App;
