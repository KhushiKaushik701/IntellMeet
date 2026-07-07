const User = require("../models/user");

// Get Logged-in User Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Logged-in User Profile
const updateProfile = async (req, res) => {
  try {
    const { bio, department, skills, profilePicture } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.bio = bio || user.bio;
    user.department = department || user.department;
    user.skills = skills || user.skills;
    user.profilePicture = profilePicture || user.profilePicture;

    await user.save();

    res.status(200).json({
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};