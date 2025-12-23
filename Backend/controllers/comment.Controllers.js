const commentModel = require("../models/commentModels");
const postModel = require("../models/postModels");

module.exports.createComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { comment, postId } = req.body;

    if (!comment || !postId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid postId and non-empty comment",
      });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const newComment = await commentModel.create({
      userId,
      postId,
      body: comment,
    });

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (err) {
    console.error("Create comment error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create comment",
    });
  }
};

module.exports.editComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { comment, commentId } = req.body;

    if (!comment || !commentId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid commentId and non-empty comment",
      });
    }

    const oldComment = await commentModel.findById(commentId);

    if (oldComment.userId.toString() !== userId) {
      return res.status(400).json({
        message: "Unauthorized User to edit the comment ",
        success: false,
      });
    }

    if (!oldComment) {
      return res.status(404).json({
        success: false,
        message: "oldComment not found",
      });
    }

    await commentModel.findByIdAndUpdate(commentId, {
      body: comment,
    });

    res.status(200).json({
      success: true,
      message: "Comment edited successfully",
      comment: comment,
    });
  } catch (err) {
    console.error("edit comment error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to edit comment",
    });
  }
};

module.exports.destroyComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { commentId } = req.body;

    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid commentId ",
      });
    }

    const existingComment = await commentModel.findById(commentId);

    if (!existingComment) {
      return res.status(400).json({
        success: false,
        message: "no comment found",
      });
    }

    if (existingComment.userId.toString() !== userId) {
      return res.status(400).json({
        message: "Unauthorized User to delete the comment ",
        success: false,
      });
    }

    await commentModel.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment Deleted successfully",
      comment: existingComment,
    });
  } catch (err) {
    console.error("delete comment error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete comment",
    });
  }
};

module.exports.fetchComment = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Invalid PostId",
      });
    }
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(204).json({
        success: false,
        message: "No Post",
      });
    }

    const allComments = await commentModel
      .find({ postId })
      .populate("userId", "username name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Comment Fetch SuccessFully",
      comments:allComments,
    });
  } catch (err) {
    console.error("error in fetching the comment", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch comment",
    });
  }
};
