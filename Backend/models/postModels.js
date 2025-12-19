const { mongoose } = require("mongoose");
const { post } = require("../routes/postsRoutes");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  body: {
    type: String,
    required: true,
  },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  media: { type: String, default: "" },
  fileType: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
});

const postModel = model("Post", postSchema);

module.exports = postModel;
