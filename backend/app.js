// app.js
const express = require("express");
const cors = require("cors");

const app = express();

// CORS middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://health-tracker-gamma-one.vercel.app",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);

// Handle all OPTIONS requests for CORS preflight
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(204);
  } else {
    next();
  }
});

app.use(express.json());

const uploadRoutes = require("./routes/upload.routes");
const analyzeRoutes = require("./routes/analyze.routes");
const aiRoutes = require("./routes/ai.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api", require("./routes/export.routes"));
app.use("/api", aiRoutes);
app.use("/api", analyzeRoutes);
app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "Backend is running 🚀"
  });
});

module.exports = app;