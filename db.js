const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('MONGODB_URI no db.js:', process.env.MONGODB_URI); 
  if (mongoose.connection.readyState >= 1) return mongoose.connection;

  try {
    return await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, 
      heartbeatFrequencyMS: 10000, 
      maxPoolSize: 10, 
    });
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error; 
  }
};

module.exports = connectDB;