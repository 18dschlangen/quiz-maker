import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddQuestion from "../components/AddQuestion";
import EditCreateQuiz, { Question, Quiz } from "../components/EditCreateQuiz";

export default function EditQuiz() {
  let params = useParams();
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:4000/api/quizzes/${params.name}`
      );
      const data = await response.json();
      console.log("data", data);
      const formattedData: Quiz = {
        quizName: data.quiz.name,
        questions: data.questions.map((q: any) => ({
          questionID: q.question.id,
          questionInput: q.question.question,
          correctAnswer: q.question.answer,
          wrongAnswers: q.wrongAnswers.map((wa: any) => wa.answer),
        })),
      };
      setQuiz(data.error ? undefined : formattedData);
      console.log("formattedData :>> ", formattedData);
    })();
  }, []);

  const publishQuiz = async (questions: Question[], quizName: string) => {
    try {
      const response = await fetch("http://localhost:4000/api/quizzes", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ quizName, questions }), // body data type must match "Content-Type" header
      });
      const data = await response.json();
      console.log("data :>> ", data);
      if (data.error)
        alert(
          "There is already a quiz with that name. Please choose a new name."
        );
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <div>
      <h2 className="text-center m-4">EditQuiz</h2>
      {quiz && <EditCreateQuiz saveFunc={publishQuiz} editQuiz={quiz} />};
    </div>
  );
}
