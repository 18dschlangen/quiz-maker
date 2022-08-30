import React, { useState } from "react";
import AddQuestion from "../components/AddQuestion";
import EditCreateQuiz, { Question } from "../components/EditCreateQuiz";

export default function CreateQuiz() {
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
      <h2 className="text-center m-4">CreateQuiz</h2>
      <EditCreateQuiz saveFunc={publishQuiz} editQuiz={undefined} />;
    </div>
  );
}
