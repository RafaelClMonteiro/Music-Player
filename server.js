const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const authRoutes = require("./player-music-backend/routes/AuthRoutes.js");

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

app.use(express.static(__dirname));
app.use("/styles", express.static(path.join(__dirname, "styles"))); 

// Roteamento
app.use("/api/auth", authRoutes);


// Roteamento para páginas HTML
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "register.html")));
app.get("/musicPlayer", (req, res) => res.sendFile(path.join(__dirname, "musicPlayer.html")));

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
