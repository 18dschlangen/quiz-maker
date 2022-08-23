import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4000/api/quizzes");
      const data = await response.json();
      setQuizzes(data.error ? [] : data);
      console.log("data :>> ", data);
    })();
  }, []);

  return (
    <div>
      <div>Quizzes</div>
      <div className="grid grid-cols-3">
        {quizzes.map((q: { name: string }, i: number) => (
          <Link
            to={`/quizzes/${q.name}`}
            key={i}
            className="bg-primary card m-4 p-8"
          >
            {q.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
