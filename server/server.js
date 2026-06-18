const authRoutes = require("./src/routes/authRoutes");


const express = require("express");



const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./src/config/db");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("IntellMeet Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});