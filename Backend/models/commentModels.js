const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  body: {
    type: String,
    required: true,
  },
});

const commentModel = model("Comment", commentSchema);

module.exports = commentModel;
