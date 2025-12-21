const userModel = require("../models/userModels");
const connectionModel = require("../models/connectionModels");
// updating profile pic
module.exports.updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = req.file.path;
    console.log("Cloudinary URL:", imageUrl);

    await userModel.findByIdAndUpdate(req.userId, {
      profilePicture: imageUrl,
    });

    res.json({
      success: true,
      profilePicture: imageUrl,
      message: "Profile picture updated successfully",
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

//updating profile info
module.exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { bio, location, occupation, maritalStatus } = req.body;
    const profile = await profileModel.findOneAndUpdate(
      { userId },
      { bio, location, occupation, maritalStatus },
      { new: true, upsert: true }
    );

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
  } catch (err) {
    console.log("errro is ", err);

    return res.status(500).json({
      message: "Failed to update profile",
      success: false,
    });
  }
};

//sending request connection

module.exports.sendConnection = async (req, res) => {
  try {
    const userId = req.userId;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "No Username Found",
        success: false,
      });
    }

    const receiver = await userModel.findOne({ username });

    if (!receiver) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (receiver._id.toString() === userId) {
      return res.status(400).json({
        message: "You cannot send request to yourself",
        success: false,
      });
    }

    const sendConnection = new connectionModel({
      requesterId: userId,
      recipientId: receiver._id,
      status: "pending",
    });

    await sendConnection.save();

    res.status(200).json({
      message: "Request Sent Successfully",
      success: true,
      connection: sendConnection,
    });
  } catch (err) {
    console.log("errro is ", err);

    return res.status(400).json({
      message: "failed to create create connnection",
      success: false,
    });
  }
};

// accept request

module.exports.acceptConnection = async (req, res) => {
  try {
    const receiver = req.userId;
    const { connectionId } = req.body;

    if (!connectionId) {
      return res
        .status(400)
        .json({ message: "Connection Id required", success: false });
    }
    const connection = await connectionModel.findById(connectionId);

    if (!connection) {
      return res
        .status(400)
        .json({ message: "Invalid ConnectionID", success: false });
    }
    if (connection.recipientId.toString() !== receiver) {
      return res.status(403).json({
        message: "You are not allowed to accept this request",
        success: false,
      });
    }

    connection.status = "accepted";
    await connection.save();
    return res.status(200).json({
      message: "Connection accepted successfully",
      success: true,
      connection,
    });
  } catch (err) {
    console.log("errro is ", err);

    return res.status(400).json({
      message: "failed to create accept connnection",
      success: false,
    });
  }
};

module.exports.rejectConnection = async (req, res) => {
  try {
    const receiver = req.userId;
    const { connectionId } = req.body;

    if (!connectionId) {
      return res
        .status(400)
        .json({ message: "Connection Id required", success: false });
    }
    const connection = await connectionModel.findById(connectionId);

    if (!connection) {
      return res
        .status(400)
        .json({ message: "Invalid ConnectionID", success: false });
    }
    if (connection.recipientId.toString() !== receiver) {
      return res.status(403).json({
        message: "You are not allowed to accept this request",
        success: false,
      });
    }

    connection.status = "rejected";
    await connection.save();
    return res.status(200).json({
      message: "Connection rejected successfully",
      success: true,
      connection,
    });
  } catch (err) {
    console.log("errro is ", err);
    return res.status(400).json({
      message: "failed to reject connnection",
      success: false,
    });
  }
};

module.exports.cancelConnection = async (req, res) => {
  try {
    const canceler = req.userId;
    const { connectionId } = req.body;
    if (!connectionId) {
      return res
        .status(400)
        .json({ message: "Connection Id required", success: false });
    }
    const connection = await connectionModel.findById(connectionId);

    if (!connection) {
      return res
        .status(400)
        .json({ message: "Invalid ConnectionID", success: false });
    }
    if (connection.requesterId.toString() !== canceler) {
      return res.status(403).json({
        message: "You are not allowed to cancel this request",
        success: false,
      });
    }
    connection.status = "rejected";
    await connection.save();
    return res.status(200).json({
      message: "Connection rejected successfully",
      success: true,
      connection,
    });
  } catch (err) {
    console.log("errro is ", err);
  }
};
