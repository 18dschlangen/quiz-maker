require("dotenv").config();

// node node_modules/db-migrate/bin/db-migrate
const { Client } = require("pg");
const client = new Client({
  user: "landonschlangen",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "quiz-data",
});

module.exports = client;
