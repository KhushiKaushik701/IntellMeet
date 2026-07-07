const Meeting = require("../models/Meeting");
const Notification = require("../models/Notification");

// ================= Book Meeting =================

const bookMeeting = async (req, res) => {
  try {
    const {
      meetingTitle,
      meetingDate,
      meetingType,
      agenda,
      participants,
    } = req.body;

    const roomID =
      "room-" +
      Date.now() +
      "-" +
      Math.floor(Math.random() * 1000);

    const meeting = await Meeting.create({
      meetingTitle,
      student: req.user.id,
      participants: participants || [],
      meetingDate,
      meetingType,
      agenda,
      roomID,
      status: "Scheduled",
    });

    // Notification for Meeting Creator
    await Notification.create({
      user: req.user.id,
      title: "Meeting Scheduled",
      message: `${meetingTitle} has been scheduled successfully.`,
      type: "meeting",
    });

    // Notification for Participants
    if (participants && participants.length > 0) {
      for (const userId of participants) {
        await Notification.create({
          user: userId,
          title: "Meeting Invitation",
          message: `You have been invited to "${meetingTitle}".`,
          type: "meeting",
        });
      }
    }

    res.status(201).json({
      message: "Meeting Created Successfully",
      meeting,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Get My Meetings =================

const getMyMeetings = async (req, res) => {
  try {

    const meetings = await Meeting.find({
      $or: [
        {
          student: req.user.id,
        },
        {
          participants: req.user.id,
        },
      ],
    })
      .populate("participants", "name email")
      .sort({
        meetingDate: -1,
      });

    const currentTime = new Date();

    for (let meeting of meetings) {
      if (
        meeting.status === "Scheduled" &&
        new Date(meeting.meetingDate) < currentTime
      ) {
        meeting.status = "Completed";
        await meeting.save();
      }
    }

    res.status(200).json(meetings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Delete Meeting =================

const deleteMeeting = async (req, res) => {
  try {

    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found",
      });
    }

    await Meeting.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Meeting Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookMeeting,
  getMyMeetings,
  deleteMeeting,
};