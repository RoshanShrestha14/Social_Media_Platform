const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const profileSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  occupation: { type: String, default: "" },
  maritialStatus: {
    type: String,
    enum: ["Single", "Married", "Divorced"],
    default: "Single",
  },
});

const profileModel = model("Profile",profileSchema);

module.exports = profileModel;
