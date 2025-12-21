const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const connectionSchema = new Schema(
  {
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);
connectionSchema.index({ requesterId: 1, recipientId: 1 }, { unique: true });

const connectionModel = model("Connection", connectionSchema);

module.exports = connectionModel;
