const express = require("express");
const router = express.Router();

const {
  saveMessage,
  getMessages,
} = require("../controllers/chatController");

router.post("/", saveMessage);

router.get("/:roomID", getMessages);

module.exports = router;