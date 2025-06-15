const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = [];

const autenticarJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).send("Token não fornecido.");
  
  try {
    const dados = jwt.verify(token, "segredoJWT");
    req.user = dados;
    next();
  } catch {
    res.status(403).send("Token inválido.");
  }
};

router.get('/musicas', autenticarJWT, (req, res) => {
  res.json([
    { id: 1, titulo: 'Música A', artista: 'DJ A' },
    { id: 2, titulo: 'Música B', artista: 'DJ B' },
  ]);
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };
  users.push(user);
  res.status(201).json({ message: "User registered" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign({ email }, "segredoJWT", { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json("Credenciais inválidas.");
});

module.exports = router;