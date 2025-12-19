const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const profileModel = require("../models/profile.Models");
const { createSecretToken } = require("../utils/secret.Tokens");

module.exports.register = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    if (!name || !username || !password || !email) {
      return res.status(400).json({
        message: "All Fields are Required !",
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User Already Exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    const profile = new profileModel({
      userId: newUser._id,
    });

    res
      .status(200)
      .json({ message: "User Created Successfully", success: true });
  } catch (err) {
    return res.status(400).json({
      message: "Failed to Create User",
      success: false,
    });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    res.status(200).json({
      success: true,
      message: "user logged in successfullly",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Failed to Create User",
      success: false,
    });
  }
};
