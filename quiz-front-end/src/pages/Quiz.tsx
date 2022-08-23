import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Quiz() {
  let params = useParams();
  let nav = useNavigate();
  const [quiz, setQuiz] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:4000/api/quizzes/${params.name}`
      );
      const data = await response.json();
      setQuiz(data.error ? [] : data);
      console.log("data :>> ", data);
    })();
  }, []);

  const deleteQuiz = async () => {
    const response = await fetch(
      `http://localhost:4000/api/quizzes/${params.name}`,
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
      <p className="text-2xl font-bold">{params.name}</p>
      <div className="grid grid-cols-3 gap-3 mt-10">
        <Link to={`/quizzes/${params.name}/Edit`} className="btn btn-warning">
          Edit
        </Link>
        <Link
          to={`/quizzes/${params.name}/TakeQuiz`}
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
