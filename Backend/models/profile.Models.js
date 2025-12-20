const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const profileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
    unique: true,
  },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  occupation: { type: String, default: "" },
  maritalStatus: {
    type: String,
    default: "",
  },
});

const profileModel = model("Profile", profileSchema);

module.exports = profileModel;
