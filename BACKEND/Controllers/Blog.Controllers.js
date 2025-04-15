import Blog from "../Models/Blog.Model.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import cloudnairy from "cloudinary";
import User from "../Models/User.Models.js";
import Notifacftion from "../Models/Notifaction.Model.js";
import Comment from "../Models/Comment.Models.js";

// Create-New-Blog-Post
export const createNewBlogPost = async (req, res, next) => {
  try {
    let { title, description, banner, category, tags, content, draft } =
      req.body;

    const author = await User.findById(req.user._id);

    const myCloud = await cloudnairy.v2.uploader.upload(banner, {
      folder: "nlog Banner",
    });
    tags = tags.map(tag => tag.toLowerCase());
    const newPost = await Blog.create({
      title,
      description,
      banner: myCloud.url,
      category,
      tags,
      content,
      author,
      draft,
    });
    const incrementVal = draft ? 0 : 1;

    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $inc: { "account_info.total_posts": incrementVal },
        $push: { blogs: newPost },
      }
    );

    res.status(200).json({
      success: true,
      newPost,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// get-All-Post

export const getAllBlogPost = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ draft: "false" })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username _id personal_info.name"
      )
      .limit(5)
      .sort({ publishedAt: -1 });
    res.status(201).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// -Trending-Blog

export const getTrendingBlogPost = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ draft: "false" })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username _id personal_info.name"
      )
      .sort({ publishedAt: -1 });
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
  try {
    const blogs = await Blog.find({ draft: "false" })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username _id personal_info.name"
      )
      .limit(5)
      .sort({
        "activity.total_reads": -1,
        "activity.total_likes": -1,
        publishedAt: -1,
      });
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// -----Blog-Read---

export const increaseBlogRead = async (req, res, next) => {
  try {
    const { id, mode } = req.params;

    const incrementVal = mode != "edit" ? 1 : 0;
    const readPost = await Blog.findByIdAndUpdate(
      { _id: id },
      { $inc: { "activity.total_reads": incrementVal } }
    ).populate(
      "author",
      "personal_info.profile_img personal_info.username _id personal_info.name"
    );

    const ownerPost = await Blog.findById({ _id: id });

    const finalUpdate = await User.findOneAndUpdate(
      {
        _id: ownerPost.author._id,
      },
      { $inc: { "account_info.total_reads": incrementVal } }
    );

    res.status(200).json({
      success: true,
      readPost,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ------Similar-Blog-----

export const getSimiLarBlog = async (req, res, next) => {
  try {
    const { tag, elimateBlog } = req.body;

    const similarBlog = await Blog.find({
      tags: tag,
      draft: false,
      _id: { $ne: elimateBlog },
    }).populate(
      "author",
      "personal_info.profile_img personal_info.username _id personal_info.name"
    );

    res.status(200).json({
      success: true,
      similarBlog,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ----Likes-Blog-------

export const blogLikes = async (req, res, next) => {
  try {
    const { blog_id, likedByUser } = req.body;
    const incrementVal = !likedByUser ? 1 : -1;
    console.log(likedByUser);

    const user = await User.findById(req.user._id);

    const updateBlogLike = await Blog.findOneAndUpdate(
      { _id: blog_id },
      { $inc: { "activity.total_likes": incrementVal } }
    );
    if (likedByUser) {
      await Notifacftion.findOneAndDelete({ blog: blog_id });
    }
    if (!likedByUser) {
      await Notifacftion.create({
        type: "like",
        blog: blog_id,
        user,
        notification_for: updateBlogLike.author,
      });
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// -----getUserLiked----

export const isUserLiked = async (req, res, next) => {
  try {
    const { _id, userId } = req.body;

    const user = await User.findById(req.user._id);

    const exists = await Notifacftion.find({
      user: user._id,
      type: "like",
      blog: _id,
    });

    console.log(exists);
    res.status(200).json({
      success: true,
      exists,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ---User-All--Blog-Post----

export const userAllBlogPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    const allBlog = await Blog.find({ author: user._id }).sort({
      publishedAt: -1,
    });

    res.status(200).json({
      success: true,
      allBlog,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ----Publish-Blog------

export const publishBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const publishBlog = await Blog.findOneAndUpdate(
      { _id: id },
      { draft: false }
    );
    res.status(200).json({
      success: true,
      message: "Blog Publish SuccessFull",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
// ------Delete-Blog-------

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const deleteBlog = await Blog.findByIdAndDelete(id);
    const incrementVal = deleteBlog.draft ? 0 : 1;
    await Notifacftion.deleteMany({ blog: deleteBlog._id });
    await Comment.deleteMany({ blog_id: deleteBlog._id });
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        $pull: { blogs: id },
        $inc: { "account_info.total_posts": incrementVal },
      }
    );

    res.status(200).json({
      success: true,
      message: "Blog Delete SuccessFull",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ------get-Single-Blog-----

export const getSingleBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Blog.findById(id);
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

//

export const editBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { title, description, banner, category, tags, content, draft } =
      req.body;
    tags = tags.map(tag => tag.toLowerCase());
    const user = await User.findById(req.user._id);
    const blog = await Blog.findById(id);
    if (blog.banner == banner) {
      blog.banner = banner;
    }
    const myCloud = await cloudnairy.v2.uploader.upload(banner, {
      folder: "nlog Banner",
    });

    blog.title = title;
    blog.description = description;
    blog.category = category;
    blog.draft = draft;
    blog.banner = myCloud.url;
    blog.tags = tags;
    blog.content = content;
    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog Update SuccessFull",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
