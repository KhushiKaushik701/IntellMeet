const Meeting = require("../models/Meeting");

const getDashboardStats = async (req, res) => {
  try {
    const upcomingMeetings = await Meeting.countDocuments({
      student: req.user.id,
      status: "Scheduled",
    });

    const completedMeetings = await Meeting.countDocuments({
      student: req.user.id,
      status: "Completed",
    });

    const totalMeetings = await Meeting.countDocuments({
      student: req.user.id,
    });

    res.status(200).json({
      upcomingMeetings,
      completedMeetings,
      totalMeetings,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};