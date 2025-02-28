const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./player-music-backend/routes/AuthRoutes");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, '.'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    }
  }
}));

app.use(cors({
  origin: ['http://localhost:5000', 'https://music-player-kohl-alpha.vercel.app'],
  credentials: true
}));

app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/musicPlayer.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'musicPlayer.html'));
});

app.get('/styles/loginStyle.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'styles', 'loginStyle.css'));
});

app.get('/login.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.js'));
});

app.get('/register.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.js'));
});

app.get('/playerScript.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'playerScript.js'));
});

app.get('/LoginBg.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, 'LoginBg.jpg'));
});

app.get("/", (req, res) => {
  res.redirect("/login.html"); 
});

app.use("/auth", authRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno no servidor" });
});

if (process.env.NODE_ENV !== 'production') {
  const port = 5000;
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

module.exports = app; 