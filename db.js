const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;
  return mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connectDB;