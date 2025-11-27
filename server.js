const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server Working Fine!");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

