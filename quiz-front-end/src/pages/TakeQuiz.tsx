import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IQuiz, IQuestion } from "./Quiz";

const TakeQuiz = () => {
  let params = useParams();
  let nav = useNavigate();
  const [quiz, setQuiz] = useState<IQuiz | undefined>(undefined);
  const [questionID, setQuestionID] = useState<number | undefined>(undefined);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ id: string; answer: string }[]>([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/quizzes/${params.id}`
      );
      const data = await response.json();
      setQuiz(data.error ? undefined : data);
      setQuestionID(data.error ? undefined : data.questions[0].question.id);
      console.log("data :>> ", data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (quiz) {
      setAnswers(getAnswers(quiz.questions[questionNumber - 1]));
    }
  }, [quiz, questionNumber]);

  const shuffle = (arr: { id: string; answer: string }[]) => {
    let currentIndex = arr.length;
    let tempVal, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempVal = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = tempVal;
    }
    return arr;
  };

  const getAnswers = (question: IQuestion | undefined) => {
    if (question === undefined) return [];
    const wrongs = question.wrongAnswers.map((wa) => ({
      id: wa.id.toString(),
      answer: wa.answer,
    }));
    const right = {
      id: "right",
      answer: question.question.answer,
    };
    return shuffle([...wrongs, right]);
  };

  const completeQuestion = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedAnswer === "right") {
      setNumCorrect((prev) => prev + 1);
    }
    if (quiz?.questions.length !== questionNumber) {
      setSelectedAnswer(undefined);
      setQuestionNumber((prev) => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };

  return (
    <>
      {!quizComplete ? (
        <>
          {!loading && (
            <>
              <h3 className="text-center mb-8">{quiz?.quiz.name}</h3>
              <form
                className="max-w-[600px] mx-auto"
                onSubmit={completeQuestion}
              >
                <div>
                  <h4>
                    {questionNumber}.{" "}
                    {quiz?.questions[questionNumber - 1].question.question}
                  </h4>
                  {answers.map((wa) => (
                    <>
                      <label
                        className="text-lg p-4 w-full hover:bg-secondary flex items-center rounded-md"
                        htmlFor={wa.id.toString()}
                      >
                        <input
                          className="radio radio-primary"
                          type="radio"
                          name="wrong-answers"
                          value={wa.id}
                          onChange={() => setSelectedAnswer(wa.id)}
                          id={wa.id.toString()}
                        />
                        <span className="ml-3">{wa.answer}</span>
                      </label>
                    </>
                  ))}
                </div>

                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={selectedAnswer === undefined}
                >
                  Next Question
                </button>
              </form>
            </>
          )}
        </>
      ) : (
        <div>
          Completed Quiz with {numCorrect} out of {quiz?.questions.length}{" "}
          correct
        </div>
      )}
    </>
  );
};

export default TakeQuiz;
