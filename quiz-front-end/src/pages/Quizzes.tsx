import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../api/questions';
export default function Quizzes() {
  const [questions, setQuestions] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const _questions = await fetchQuestions();
      setQuestions(_questions ?? []);
    })();
  }, []);
  return (
    <div>
      <div>Quizzes</div>
      {questions.map((q: any) => (
        <div>{q.question}</div>
      ))}
    </div>
  );
}
