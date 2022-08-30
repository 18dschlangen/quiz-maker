const express = require("express");
const app = express();
const client = require("./postgres");

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, OPTIONS, GET");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to the database
connect();
async function connect() {
  try {
    await client.connect();
    console.log(`Connected`);
  } catch (e) {
    console.error(`connection failed ${e}`);
  }
}

app.get("/api/questions", async (_req, res) => {
  try {
    const results = await client.query("select * from questions");
    res.json(results.rows);
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.get("/api/questions/:id", async (req, res) => {
  try {
    const questionResults = await client.query(
      "select * from questions where id = $1",
      [req.params.id]
    );
    const wrongAnswersResults = await client.query(
      "select * from wrong_answers WHERE question_id = $1",
      [req.params.id]
    );

    if (questionResults.rows.length === 0) {
      res.json({
        error: "Could not find the question with id: " + req.params.id,
      });
    } else {
      res.json({
        question: questionResults.rows[0],
        wrong_answers: wrongAnswersResults.rows,
      });
    }
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.post("/api/questions", async (req, res) => {
  try {
    await client.query(
      "INSERT INTO questions (question, answer) VALUES ($1, $2);",
      [req.body.question, req.body.answer]
    );
    res.json("success");
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.put("/api/questions", async (req, res) => {
  try {
    await client.query(
      "UPDATE questions SET question = $1, answer = $2 WHERE id = $3",
      [req.body.question, req.body.answer, req.body.id]
    );
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.delete("/api/questions", async (req, res) => {
  try {
    await client.query("DELETE FROM questions WHERE id = $1", [req.body.id]);
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.get("/api/wrong_answers", async (_req, res) => {
  try {
    const results = await client.query("select * from wrong_answers");
    res.json(results.rows);
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.post("/api/wrong_answers", async (req, res) => {
  try {
    await client.query(
      "INSERT INTO wrong_answers (question_id, answer) VALUES ($1, $2);",
      [req.body.question_id, req.body.answer]
    );
    res.json("success");
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.put("/api/wrong_answers", async (req, res) => {
  try {
    await client.query("UPDATE wrong_answers SET answer = $1 WHERE id = $2", [
      req.body.answer,
      req.body.id,
    ]);
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.delete("/api/wrong_answers", async (req, res) => {
  try {
    await client.query("DELETE FROM wrong_answers WHERE id = $1", [
      req.body.id,
    ]);
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.post("/api/quizzes", async (req, res) => {
  try {
    const quizNameData = await client.query(
      "INSERT INTO quizzes (name) VALUES ($1) returning *;",
      [req.body.quizName]
    );
    console.log("quizNameData :>> ", quizNameData.rows);
    for (let i = 0; i < req.body.questions.length; i++) {
      const quizQuestionData = await client.query(
        "INSERT INTO questions (question, answer, quiz_id) VALUES ($1, $2, $3) returning *;",
        [
          req.body.questions[i].questionInput,
          req.body.questions[i].correctAnswer,
          quizNameData.rows[0].id,
        ]
      );
      for (let j = 0; j < req.body.questions[i].wrongAnswers.length; j++) {
        await client.query(
          "INSERT INTO wrong_answers (question_id, answer) VALUES ($1, $2);",
          [quizQuestionData.rows[0].id, req.body.questions[i].wrongAnswers[j]]
        );
      }
    }
    res.json("success");
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.get("/api/quizzes", async (req, res) => {
  try {
    const quizNameData = await client.query("SELECT name FROM quizzes;");
    res.json(quizNameData.rows);
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.get("/api/quizzes/:name", async (req, res) => {
  try {
    const quizNameData = await client.query(
      "SELECT * FROM quizzes WHERE name=$1;",
      [req.params.name]
    );
    const questionData = await client.query(
      "SELECT * FROM questions WHERE quiz_id=$1;",
      [quizNameData.rows[0].id]
    );
    const questions = [];
    for (let i = 0; i < questionData.rows.length; i++) {
      const wrongAnswerData = await client.query(
        "SELECT * FROM wrong_answers WHERE question_id=$1;",
        [questionData.rows[i].id]
      );
      questions.push({
        question: questionData.rows[i],
        wrongAnswers: wrongAnswerData.rows,
      });
    }

    res.json({ quiz: quizNameData.rows[0], questions });
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.delete("/api/quizzes/:name", async (req, res) => {
  try {
    const quizNameData = await client.query(
      "DELETE FROM quizzes WHERE name=$1;",
      [req.params.name]
    );
    res.json({ success: true });
  } catch (e) {
    res.json({ error: "There was an error: " + e });
  }
});

app.listen(4000, () => console.log("listening on port 4000...."));
