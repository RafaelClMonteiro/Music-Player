require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./player-music-backend/routes/AuthRoutes.js");

const PORT = process.env.PORT || 5000;
const app = express();

const jwtSecretKey = process.env.JWT_secretkey;
const mongoUri = process.env.mongodb_uri;

mongoose.connect(mongoUri)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.use(cors({
  origin: ["http://localhost:5000", "https://music-player-kohl-alpha.vercel.app"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use(express.static(path.join(__dirname))); 
app.use("/styles", express.static(path.join(__dirname, "styles"))); 

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "register.html")));
app.get("/musicPlayer", (req, res) => res.sendFile(path.join(__dirname, "musicPlayer.html")));

// Tratamento para favicon.ico para evitar erro 404
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
