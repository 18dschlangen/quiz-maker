import React from "react";
import { Question } from "../pages/CreateQuiz";
interface AddQuestionProps {
  question: Question;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  index: number;
}
export default function AddQuestion(props: AddQuestionProps) {
  const { question, setQuestions, index } = props;

  const addAnswer = () => {
    setQuestions((prev) => prev);
  };

  const modifyQuestion = (options?: {
    questionChange?: string;
    answers?: string[];
    correctAnswer?: string;
  }) => {
    if (options === undefined) return;
    const { questionChange, answers, correctAnswer } = options;
    if (questionChange !== undefined) {
      setQuestions((prev) =>
        prev.map((quest) => {
          if (quest.questionID === index) {
            return { ...quest, questionInput: questionChange };
          }
          return quest;
        })
      );
    }

    if (answers !== undefined && answers.length < 5) {
      setQuestions((prev) =>
        prev.map((quest) => {
          if (quest.questionID === index) {
            return { ...quest, wrongAnswers: answers };
          }
          return quest;
        })
      );
    }

    if (correctAnswer !== undefined) {
      setQuestions((prev) =>
        prev.map((quest) => {
          if (quest.questionID === index) {
            return { ...quest, correctAnswer: correctAnswer };
          }
          return quest;
        })
      );
    }
  };

  return (
    <div className="my-8">
      <label>
        <p>Question {index + 1}</p>
        <input
          className="input input-bordered w-1/2"
          value={question.questionInput}
          onChange={(e) => modifyQuestion({ questionChange: e.target.value })}
        />
      </label>
      <input
        type="button"
        value="Add Wrong Answer"
        className="btn btn-primary mx-2"
        onClick={() =>
          modifyQuestion({ answers: [...question.wrongAnswers, ""] })
        }
      />
      <input
        type="button"
        value="Remove Answer"
        className="btn btn-error"
        onClick={() =>
          modifyQuestion({
            answers: question.wrongAnswers.slice(
              0,
              question.wrongAnswers.length - 1
            ),
          })
        }
      />
      <label>
        <p>Correct Answer</p>
        <input
          className="input input-success input-bordered w-2/5"
          value={question.correctAnswer}
          onChange={(e) => modifyQuestion({ correctAnswer: e.target.value })}
        />
      </label>
      {question.wrongAnswers.map((wa, i) => (
        <label key={i}>
          <p>Wrong Answer</p>
          <input
            className="input input-error input-bordered w-2/5"
            value={wa}
            onChange={(e) => {
              question.wrongAnswers[i] = e.target.value;
              modifyQuestion({ answers: question.wrongAnswers });
            }}
          />
        </label>
      ))}
    </div>
  );
}
