const userModel = require("../models/userModels");

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
    return res.status(500).json({
      message: "Failed to update profile",
      success: false,
    });
  }
};
