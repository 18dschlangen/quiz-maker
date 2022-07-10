const express = require("express");
const app = express();
const port = 4000;

const connection = require("./mongodbconnection");
const { Question } = require("./models");
app.get("/", async (req, res) => {
  let question;
  try {
    question = await Question.create({
      questionnumber: 1,
      question: "What is your name?",
      answer: "Dominic",
    });
    await question.save();
  } catch (e) {
    console.log("e.message :>> ", e.message);
  }
  res.json({ question });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
