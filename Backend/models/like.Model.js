const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const likeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
);

likeSchema.index({ userId: 1, postId: 1 }, { unique: true });

const likeModel = model("Like", likeSchema);
module.exports = likeModel;
