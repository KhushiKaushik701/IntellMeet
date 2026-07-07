const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateSummary,
  getAllSummaries,
  deleteSummary,
} = require("../controllers/summaryController");

// Generate AI Summary
router.post("/", protect, generateSummary);

// Get Previous Summaries
router.get("/", protect, getAllSummaries);
router.delete("/:id", protect, deleteSummary);

module.exports = router;