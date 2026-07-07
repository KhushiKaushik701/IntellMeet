const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("../models/Chat");
const Summary = require("../models/Summary");
const Meeting = require("../models/Meeting");

console.log("Gemini Key:", process.env.GEMINI_API_KEY);
console.log("Length:", process.env.GEMINI_API_KEY?.length);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate AI Summary
const generateSummary = async (req, res) => {
  try {
    const { roomID } = req.body;

    if (!roomID) {
      return res.status(400).json({
        message: "Room ID is required",
      });
    }

    // Get all chat messages
    const chats = await Chat.find({ roomID }).sort({ createdAt: 1 });

    if (chats.length === 0) {
      return res.status(404).json({
        message: "No chat found for this meeting.",
      });
    }

    // Create transcript
    const transcript = chats
      .map((chat) => `${chat.sender}: ${chat.message}`)
      .join("\n");

    const prompt = `
You are an AI Meeting Assistant.

Read the following meeting conversation and generate:

1. Meeting Summary
2. Key Points
3. Action Items

Conversation:
${transcript}

Return the response exactly like this:

## Meeting Summary
...

## Key Points
• ...
• ...

## Action Items
• ...
• ...
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    const aiSummary = result.response.text();

    // Delete previous summary
    await Summary.deleteMany({ roomID });

    // Save new summary
    const savedSummary = await Summary.create({
  roomID,
  user: req.user.id,
  summary: aiSummary,
});

    // ✅ Automatically Complete Meeting
    await Meeting.findOneAndUpdate(
      { roomID },
      {
        status: "Completed",
      }
    );

    res.status(200).json(savedSummary);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Summaries
const getAllSummaries = async (req, res) => {
  try {
const summaries = await Summary.find({
  user: req.user.id,
}).sort({
  createdAt: -1,
});
    
    
    res.status(200).json(summaries);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Delete Summary
const deleteSummary = async (req, res) => {
  try {

   const summary = await Summary.findOne({
  _id: req.params.id,
  user: req.user.id,
});
    if (!summary) {
      return res.status(404).json({
        message: "Summary not found",
      });
    }

    await Summary.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Summary deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  generateSummary,
  getAllSummaries,
  deleteSummary,
};