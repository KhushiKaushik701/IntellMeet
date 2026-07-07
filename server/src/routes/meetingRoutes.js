const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  bookMeeting,
  getMyMeetings,
  deleteMeeting,
} = require("../controllers/meetingController");

// Book Meeting
router.post("/book", protect, bookMeeting);

// Get My Meetings
router.get("/my-meetings", protect, getMyMeetings);

// Delete Meeting
router.delete("/:id", protect, deleteMeeting);

module.exports = router;