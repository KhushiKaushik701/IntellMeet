const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  sendRequest,
  getConnections,
} = require("../controllers/connectionController");

router.post("/send", protect, sendRequest);
router.get("/", protect, getConnections);

module.exports = router;