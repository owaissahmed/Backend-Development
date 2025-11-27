const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://muhammadowais25122003_db_user:ofRbia5kgSEgm9or@owaiscluster.05s0jh1.mongodb.net/backendDB");
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("DB Connection Error:", error);
  }
};

module.exports = connectDB;
