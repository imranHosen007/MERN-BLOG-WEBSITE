import express from "express";
import {
  blogLikes,
  createNewBlogPost,
  deleteBlog,
  editBlog,
  getAllBlogPost,
  getSimiLarBlog,
  getSingleBlogPost,
  getTrendingBlogPost,
  increaseBlogRead,
  isUserLiked,
  publishBlog,
  userAllBlogPost,
} from "../Controllers/Blog.Controllers.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/", isAuthenticated, createNewBlogPost);
router.get(`/`, getAllBlogPost);
router.get(`/:id`, getSingleBlogPost);
router.get(`/all-user/blog`, isAuthenticated, userAllBlogPost);
router.get(`/trending`, getTrendingBlogPost);
router.post(`/increase-read/:id`, increaseBlogRead);
router.post(`/similar-blog`, getSimiLarBlog);
router.post(`/like-blog`, isAuthenticated, blogLikes);
router.post(`/isuser-like`, isAuthenticated, isUserLiked);
router.delete(`/:id`, isAuthenticated, deleteBlog);
router.put(`/:id`, publishBlog);
router.put(`/edit/:id`, isAuthenticated, editBlog);
export default router;
