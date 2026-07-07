const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema(
  {
    roomID: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    keyPoints: {
      type: [String],
      default: [],
    },

    actionItems: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Summary ||
  mongoose.model("Summary", summarySchema);