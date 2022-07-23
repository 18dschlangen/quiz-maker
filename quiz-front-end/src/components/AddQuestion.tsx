import React from "react";
import { Question } from "../pages/CreateQuiz";
interface AddQuestionProps {
  question: Question;
}
export default function AddQuestion(props: AddQuestionProps) {
  const question = props.question;
  return (
    <div>
      <label>
        <p>Question</p>
        <input className="input input-bordered" name="name" />
      </label>
      <button className="btn btn-primary">Add Answer</button>
      <button className="btn btn-error">Remove Answer</button>
      <label>
        <p>Correct Answer</p>
        <input className="input input-bordered" name="name" />
      </label>
      <label>
        <p>Wrong Answer</p>
        <input className="input input-bordered" name="name" />
      </label>
    </div>
  );
}
