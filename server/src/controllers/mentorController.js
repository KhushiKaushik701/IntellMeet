const Mentor = require("../models/Mentor");

// Get All Mentors + Search
const getMentors = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            company: {
              $regex: search,
              $options: "i",
            },
          },
          {
            skills: {
              $elemMatch: {
                $regex: search,
                $options: "i",
              },
            },
          },
        ],
      };
    }

    const mentors = await Mentor.find(query);

    res.status(200).json(mentors);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getMentors,
};