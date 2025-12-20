const userModel = require("../models/userModels");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Authentication Failed: No token provided",
      });
    }
    let data = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await userModel.findById(data.id);
    if (!user) {
      return res.json({ success: false });
    }
  console.log("Verified user:", user);
    req.userId = data.id;
    req.User = user;        
     next(); 

  } catch (err) {
    res.json({ success: false, message: "Authentication Failed" });
  }
};