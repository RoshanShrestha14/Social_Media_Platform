const { mongoose } = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    body: {
      type: String,
      default:""
    },

    image: {
      type: String,
      default:""
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const postModel = model("Post", postSchema);

module.exports = postModel;
