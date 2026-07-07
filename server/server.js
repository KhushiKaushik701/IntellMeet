require("dotenv").config();   // ⭐ Sabse pehle

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const mentorRoutes = require("./src/routes/mentorRoutes");
const connectionRoutes = require("./src/routes/connectionRoutes");
const meetingRoutes = require("./src/routes/meetingRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const summaryRoutes = require("./src/routes/summaryRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
// Connect MongoDB
connectDB();

const app = express();

// ⭐ HTTP Server
const server = http.createServer(app);

// ⭐ Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// ⭐ Socket Events
io.on("connection", (socket) => {
  console.log("✅ User Connected:", socket.id);

  socket.on("join-room", (roomID) => {
    socket.join(roomID);
    console.log(`User joined room: ${roomID}`);
  });

  socket.on("send-message", (data) => {
    io.to(data.roomID).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User Disconnected:", socket.id);
  });
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("IntellMeet Server Running");
});

const PORT = process.env.PORT || 5000;

// ⭐ server.listen (app.listen nahi)
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});