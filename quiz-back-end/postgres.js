require("dotenv").config();
const database = require("./database.json");

// node node_modules/db-migrate/bin/db-migrate
const { Client } = require("pg");
const client = new Client({
  user: database.dev.user,
  password: database.dev.password,
  host: database.dev.host,
  port: database.dev.port,
  database: database.dev.database,
});

module.exports = client;
