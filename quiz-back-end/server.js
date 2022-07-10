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
  // read
  try {
    const results = await client.query("select * from questions");
    res.json(results.rows);
  } catch (e) {
    res.send("There was an error" + e.message);
  }
});

app.post("/api/questions", async (req, res) => {
  console.log(req.body);
  try {
    await client.query("INSERT INTO questions (title) VALUES ($1);", [
      req.body.title,
    ]);
    res.json("success");
  } catch (e) {
    res.send("There was an error");
  }
  // create
});

app.listen(4000, () => console.log("listening on port 4000...."));
