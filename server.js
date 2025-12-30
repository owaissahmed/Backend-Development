require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
// DB connect
connectDB();

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server Working Fine!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
