const express = require("express");
const cors = require("cors");
const routes = require("./router/routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", (req, res) => {
  res.send("API de Música com Autenticação JWT rodando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});