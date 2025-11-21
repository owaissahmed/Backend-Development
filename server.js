const express = require("express");
const mongoose = require("mongoose");
const User = require("./user");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Working Fine!");
});

// Mongo DB Connect
mongoose.connect("mongodb://127.0.0.1:27017/backendDB")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("DB Error:", err));


// POST API (Data Save)
app.post("/add-user", async (req, res) => {
  try {
    const user = new User(req.body); // req.body = frontend/Postman data
    await user.save();               // Save in DB
    res.send({ message: "User Saved Successfully!", user });
  } catch (error) {
    res.status(500).send({ error });
  }
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
