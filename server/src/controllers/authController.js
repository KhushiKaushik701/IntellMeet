// ================= Get All Users =================
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= Register =================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Login =================

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Profile =================

const getProfile = async (req, res) => {
  try {

    res.status(200).json({
      message: "Profile fetched successfully",
      user: req.user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Update Profile =================

const updateProfile = async (req, res) => {
  try {

    const {
      bio,
      department,
      skills,
      profilePicture,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.bio = bio || user.bio;
    user.department = department || user.department;
    user.skills = skills || user.skills;
    user.profilePicture =
      profilePicture || user.profilePicture;

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

// ================= Change Password =================

const changePassword = async (req, res) => {
  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current Password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Get All Users =================

const getAllUsers = async (req, res) => {
  try {

    const users = await User.find(
      {
        _id: { $ne: req.user.id },
      },
      "name email profilePicture"
    );

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Exports =================

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
};
