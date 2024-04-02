require("dotenv").config();
const express = require("express");
const knexConfig = require("./conection");
const knex = require("knex");
const cors = require("cors");

const app = express();
const db = knex(knexConfig);

app.use(express.json());
app.use(cors());

app.post("/submit", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { nome, email, celular, cpf, regiao } = req.body;
  try {
    await db("clientes").insert({ nome, email, celular, cpf, regiao });
    res.json({ message: "Dados enviados!" });
  } catch (error) {
    res
      .status(500)
      .send("Ocorreu um erro ao inserir os dados no banco de dados.");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(process.env.PORT);
});
