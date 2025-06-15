const express = require("express");
const cors = require("cors");
const routes = require("./router/routes");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

// Define a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, '../')));

// Rota principal exibindo o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get("/", (req, res) => {
  res.send("API de Música com Autenticação JWT rodando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});