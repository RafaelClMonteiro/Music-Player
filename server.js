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

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.get("/musicPlayer", (req, res) => {
  res.sendFile(path.join(__dirname, "musicPlayer.html"));
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Teste com * primeiro, depois podemos restringir
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));