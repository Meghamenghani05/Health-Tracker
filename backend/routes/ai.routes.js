const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { getAIInsights } = require("../controllers/ai.controllers");

router.get("/ai-insights",auth, getAIInsights);

module.exports = router;