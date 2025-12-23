const postModel = require("../models/postModels");
const commentModel = require("../models/commentModels");
const likeModel = require("../models/like.Model")

module.exports.activeCheck = async (req, res) => {
  return res.json({ messgage: "Server Running" });
};

module.exports.createPost = async (req, res) => {
  try {
    const userId = req.userId;
    const image = req.file?.path || null;
    const body = req.body?.body?.trim() || "";

    // Validation: at least text or image
    if (!body && !image) {
      return res.status(400).json({
        success: false,
        message: "Post must contain text or image",
      });
    }

    const newPost = await postModel.create({
      userId,
      body,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      postId: newPost._id,
    });
  } catch (err) {
    console.error("Create post error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

module.exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.userId;

    const posts = await postModel.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    console.error("Get user posts error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.body;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this post",
      });
    }

    await postModel.findByIdAndDelete(postId);
    await commentModel.deleteMany({ postId });

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.error("Delete post error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete post",
    });
  }
};

module.exports.getAllUsersPost = async (req, res) => {
  try {
    const allPosts = await postModel
      .find({ isActive: true })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      allPosts,
    });
  } catch (err) {
    console.error("Get user posts error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

module.exports.likeIncrement = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.params;

    if (!postId) {
      return res.status(404).json({
        success: false,
        message: "postId not found",
      });
    }

    const post = await postModel.findById(postId)
      if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }

  


  } catch (er) {
    console.error("failed to increase likes error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to like posts",
    });
  }
};

//sdfaksdjfladjflajd;fa;d;fla;ld

module.exports.knowPosts = async (req, res) => {
  try {
    const { postId } = req.body;

    const postDetail = await postModel
      .findById(postId)
      .populate("userId", "name");
    res.json({
      detai: postDetail,
    });
  } catch (err) {
    console.log("err is ", err);
  }
};
