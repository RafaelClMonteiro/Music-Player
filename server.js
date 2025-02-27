const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./player-music-backend/routes/AuthRoutes");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, '.')));

app.use(cors({
  origin: ['http://localhost:5000', 'https://music-player-kohl-alpha.vercel.app'],
  credentials: true
}));

app.use(express.json());


app.get('/favicon.ico', (req, res) => res.status(204).end());


app.get("/", (req, res) => {
  res.redirect("/login.html"); 
});

app.use("/auth", authRoutes); 


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno no servidor" });
});

module.exports = app; 