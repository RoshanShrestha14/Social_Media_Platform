const userModel = require('../models/userModels');

module.exports.updateProfilePicture = async (req, res) => {
  try {
    const imageUrl = req.file.url;
    coonsole.log("Uploaded image URL:", imageUrl);
    
    await userModel.findByIdAndUpdate(req.userId, {
      profilePicture: imageUrl,
    });
    
    res.json({
      profilePicture: imageUrl
    });


    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};