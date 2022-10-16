import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_API } from "../api/config";
export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${BASE_API}/quizzes`);
      const data = await response.json();
      setQuizzes(data.error ? [] : data);
      console.log("data :>> ", data);
    })();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3">
        {quizzes.map((q: { name: string; id: number }, i: number) => (
          <Link
            to={`/quizzes/${q.id}`}
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
