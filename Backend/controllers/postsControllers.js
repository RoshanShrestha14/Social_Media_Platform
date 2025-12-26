const postModel = require("../models/postModels");
const commentModel = require("../models/commentModels");
const likeModel = require("../models/like.Model");

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

module.exports.toggleLike = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "postId is required",
      });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const existingLike = await likeModel.findOne({ userId, postId });

    if (!existingLike) {
      try {
        await likeModel.create({ userId, postId });

        await postModel.findByIdAndUpdate(
          postId,
          { $inc: { likesCount: 1 } },
          { new: true }
        );

        return res.status(200).json({
          success: true,
          liked: true,
          message: "Post liked",
        });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(409).json({
            success: false,
            message: "Already liked",
          });
        }
        throw error;
      }
    }

    await likeModel.findByIdAndDelete(existingLike._id);

    await postModel.findByIdAndUpdate(
      postId,
      { $inc: { likesCount: -1 } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      liked: false,
      message: "Post unliked",
    });
  } catch (err) {
    console.error("toggle like error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
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
