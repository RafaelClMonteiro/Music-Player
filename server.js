const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./player-music-backend/routes/AuthRoutes");

dotenv.config();

const app = express();
const port = 5000;

app.use(express.static('.')); 

app.use(cors({
  origin: ['http://localhost:5000', 'http://music-player-kohl-alpha.vercel.app'],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/login.html"); 
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));


app.use("/auth", authRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno no servidor" });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});