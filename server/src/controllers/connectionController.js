const Connection = require("../models/connection");
const Notification = require("../models/Notification");

// Send Connection Request
const sendRequest = async (req, res) => {
  try {
    const { mentorId } = req.body;

    const connection = await Connection.create({
      student: req.user.id,
      mentor: mentorId,
      status: "Pending",
    });

    // Notification
    await Notification.create({
      user: req.user.id,
      title: "Connection Request Sent",
      message: "Your connection request has been sent successfully.",
      type: "connection",
    });

    res.status(201).json({
      message: "Connection request sent",
      connection,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get My Connections
const getConnections = async (req, res) => {
  try {

    const connections = await Connection.find({
      student: req.user.id,
    }).populate("mentor");

    res.status(200).json(connections);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  sendRequest,
  getConnections,
};