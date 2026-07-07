const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    meetingTitle: {
      type: String,
      required: true,
    },

    // Meeting Creator
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Meeting Participants
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    meetingType: {
      type: String,
      default: "Video Meeting",
    },

    agenda: {
      type: String,
      default: "",
    },

    meetingDate: {
      type: Date,
      required: true,
    },

    roomID: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: [
        "Scheduled",
        "Live",
        "Completed",
        "Cancelled",
      ],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meeting", meetingSchema);