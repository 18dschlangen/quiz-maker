import React, { useState } from 'react';
import AddQuestion from '../components/AddQuestion';
export interface Question {
  questionID: number;
  questionInput: string;
  correctAnswer: string;
  wrongAnswers: string[];
}
export default function CreateQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizName, setQuizName] = useState<string>('');
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionID: questions.length,
        questionInput: '',
        correctAnswer: '',
        wrongAnswers: [],
      },
    ]);
  };
  const removeQuestion = () => {
    setQuestions(
      questions.filter((q) => q.questionID !== questions.length - 1)
    );
  };

  return (
    <div>
      <h2 className="text-center m-4">CreateQuiz</h2>
      <div className="flex flex-col justify-center content-center">
        <form className="mx-auto border-2 border-secondary rounded-md p-10 lg:min-w-[1024px]">
          <div className="mb-8">
            <label>
              <p>Name of Quiz</p>
              <input
                className="input input-primary input-bordered w-3/5"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
              />
            </label>
            <input
              type="button"
              value="Add Question"
              className="btn btn-primary mx-2"
              onClick={addQuestion}
            />
            <input
              type="button"
              value="Remove Question"
              className="btn btn-error"
              onClick={removeQuestion}
            />
          </div>
          {questions.map((q, i) => (
            <AddQuestion
              question={q}
              setQuestions={setQuestions}
              key={i}
              index={i}
            />
          ))}
          <button type="submit" className="btn btn-secondary mt-8">
            Save as Incomplete
          </button>
          <button type="submit" className="btn btn-success mx-2">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}
