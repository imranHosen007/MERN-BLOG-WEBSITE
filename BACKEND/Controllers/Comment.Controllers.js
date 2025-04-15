import Blog from "../Models/Blog.Model.js";
import Comment from "../Models/Comment.Models.js";
import Notifacftion from "../Models/Notifaction.Model.js";
import User from "../Models/User.Models.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
// ----Create-Comment-------
export const createComment = async (req, res, next) => {
  try {
    const { blogId, comment, replyingTo, blogAuthor } = req.body;
    const user = await User.findById(req.user._id);
    let newComment;
    let commentNotifaction;
    if (replyingTo) {
      newComment = await Comment.create({
        blog_id: blogId,
        blog_author: blogAuthor,
        comment,
        commented_by: user._id,
        parent: replyingTo,
        isReply: true,
      });

      commentNotifaction = await Notifacftion.create({
        type: replyingTo ? "reply" : "comment",
        blog: blogId,
        user,
        notification_for: blogAuthor,
        comment: newComment._id,
        replied_on_comment: replyingTo,
      });
    } else {
      newComment = await Comment.create({
        blog_id: blogId,
        blog_author: blogAuthor,
        comment,
        commented_by: user._id,
        isReply: false,
      });
      commentNotifaction = await Notifacftion.create({
        type: replyingTo ? "reply" : "comment",
        blog: blogId,
        user,
        notification_for: blogAuthor,
        comment: newComment._id,
      });
    }

    const finalComment = await Blog.findByIdAndUpdate(
      { _id: blogId },
      {
        $push: { comments: newComment },
        $inc: { "activity.total_comments": 1 },
      }
    );

    if (replyingTo) {
      const updateCom = await Comment.findOneAndUpdate(
        { _id: replyingTo },
        { $push: { children: newComment._id } }
      );
    }
    res.status(201).json({
      success: true,
      message: "Comment SuccesFull",
      commentNotifaction,
      finalComment,
      newComment,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// --------getComment-----
export const getBlogComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allComment = await Comment.find({ blog_id: id, isReply: false })
      .populate("commented_by")
      .populate("children")
      .sort({
        commentedAt: -1,
      });
    res.status(200).json({
      success: true,
      allComment,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ------handleDeleteComment------

export const blogCommentDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findComment = await Comment.findOne({ _id: id });

    const updateBlog = await Blog.findOneAndUpdate(
      {
        _id: findComment.blog_id,
      },
      {
        $inc: { "activity.total_comments": -1 },
      }
    );
    await Comment.deleteOne(findComment);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
