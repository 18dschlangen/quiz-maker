import React, { useState } from "react";
import AddQuestion from "../components/AddQuestion";
export interface Question {
  questionNumber: number;
  questionInput: string;
  correctAnswer: string;
  wrongAnswers: string[];
}
export default function CreateQuiz() {
  const questionNumber = 1;
  const [questions, setquestions] = useState<Question[]>([]);
  const addQuestion = () => {
    setquestions([
      ...questions,
      {
        questionNumber: 1,
        questionInput: "",
        correctAnswer: "",
        wrongAnswers: [],
      },
    ]);
  };

  return (
    <div>
      CreateQuiz
      <div>
        <form>
          <label>
            <p>Name of Quiz</p>
            <input className="input input-bordered" name="name" />
          </label>
          <input
            type="button"
            value="Add Question"
            className="btn btn-primary"
            onClick={addQuestion}
          />
          <input
            type="button"
            value="Remove Question"
            className="btn btn-error"
          />
          {questions.map((q, i) => (
            <AddQuestion question={q} />
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
