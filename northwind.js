const { Client } = require("pg");

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "pradog",
  database: "northwind",
});

con
  .connect()
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Erro de conexão", err));

module.exports = con;
