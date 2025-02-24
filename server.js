require("dotenv").config();
console.log("Mongo URI:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./player-music-backend/routes/AuthRoutes.js");
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: ["http://localhost:5000", "https://music-player-kohl-alpha.vercel.app"],  
  methods: "GET,POST",
  allowedHeaders: "Content-Type"
}));
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// Roteamento
app.use("/api/auth", authRoutes);

app.use(express.static(path.join(__dirname)));

// Roteamento para páginas HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.get("/musicPlayer", (req, res) => {
  res.sendFile(path.join(__dirname, "musicPlayer.html"));
});

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
