const Chat = require("../models/Chat");

// Save Message
const saveMessage = async (req, res) => {
  try {
    const { roomID, sender, message } = req.body;

    const chat = await Chat.create({
      roomID,
      sender,
      message,
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Messages
const getMessages = async (req, res) => {
  try {
    const chats = await Chat.find({
      roomID: req.params.roomID,
    }).sort({ createdAt: 1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveMessage,
  getMessages,
};