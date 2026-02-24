const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");
const analyzeRoutes = require("./routes/analyze.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(cors({
  origin: [
    "https://health-tracker-six-sigma.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true
}));

/* ✅ Body parser */
app.use(express.json());

/* ✅ Routes */
app.use("/api", uploadRoutes);
app.use("/api", analyzeRoutes);
app.use("/api", aiRoutes);
app.use("/api/auth", authRoutes);
/* ✅ Health check */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "Backend is running 🚀"
  });
});

module.exports = app;