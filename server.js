require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./player-music-backend/routes/AuthRoutes.js");

const PORT = process.env.PORT || 5000;
const app = express();

// Configuração de CORS
app.use(cors({
  origin: ["http://localhost:5000", "https://music-player-kohl-alpha.vercel.app"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log( "Erro ao conectar com o mongoDB", err));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname))); // Serve .js e .html da raiz
app.use("/styles", express.static(path.join(__dirname, "styles"))); // Serve arquivos CSS

// Rotas de API
app.use("/api/auth", authRoutes);

// Rotas HTML
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "register.html")));
app.get("/musicPlayer", (req, res) => res.sendFile(path.join(__dirname, "musicPlayer.html")));

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
