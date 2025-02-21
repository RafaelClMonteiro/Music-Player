require("dotenv").config();
console.log("Mongo URI:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./player-music-backend/routes/AuthRoutes.js");
const path = require('path');

const app = express();

app.use(cors({
  origin: ["http://localhost:5000", "https://music-player-kohl-alpha.vercel.app"],  
  methods: "GET,POST",
  allowedHeaders: "Content-Type"
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.get("/musicPlayer", (req, res) => {
  res.sendFile(path.join(__dirname, "musicPlayer.html"));
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));