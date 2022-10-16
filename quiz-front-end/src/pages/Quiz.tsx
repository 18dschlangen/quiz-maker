import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export interface IQuestion {
  question: {
    id: number;
    quiz_id: number;
    question: string;
    answer: string;
    created_at: string;
    updated_at: string;
  };
  wrongAnswers: {
    id: number;
    question_id: number;
    answer: string;
    created_at: string;
    updated_at: string;
  }[];
}
export interface IQuiz {
  questions: IQuestion[];
  quiz: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

function Quiz() {
  let params = useParams();
  let nav = useNavigate();
  const [quiz, setQuiz] = useState<IQuiz | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/quizzes/${params.id}`
      );
      const data = await response.json();
      setQuiz(data.error ? [] : data);
      console.log("data :>> ", data);
      setLoading(false);
    })();
  }, []);

  const deleteQuiz = async () => {
    const response = await fetch(
      `http://localhost:4000/api/quizzes/${params.id}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      }
    );
    console.log("response", response);
    const data = await response.json();
    console.log("data :>> ", data);
    if (data.success) {
      nav("/quizzes");
    }
  };

  return (
    <div className="card bg-secondary text-center p-10">
      {!loading && <p className="text-2xl font-bold">{quiz?.quiz.name}</p>}
      <div className="grid grid-cols-3 gap-3 mt-10">
        <Link to={`/quizzes/${params.id}/Edit`} className="btn btn-warning">
          Edit
        </Link>
        <Link
          to={`/quizzes/${params.id}/take-quiz`}
          className="btn btn-success"
        >
          Take Quiz
        </Link>
        <button className="btn btn-error" onClick={deleteQuiz}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Quiz;
