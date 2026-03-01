const express = require("express");
const router = express.Router();
const { exportData } = require("../controllers/export.controllers");

router.get("/export", exportData);

module.exports = router;