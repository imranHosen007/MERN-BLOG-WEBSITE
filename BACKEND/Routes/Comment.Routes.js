import express from "express";
import { isAuthenticated } from "../Middlewares/Auth.js";
import {
  blogCommentDelete,
  createComment,
  getBlogComment,
} from "../Controllers/Comment.Controllers.js";
const router = express.Router();

router.post(`/add-comment`, isAuthenticated, createComment);
router.post(`/:id`, getBlogComment);
router.delete(`/:id`, isAuthenticated, blogCommentDelete);
export default router;
