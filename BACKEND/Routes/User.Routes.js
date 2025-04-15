import express from "express";
import {
  changeUserProfileImg,
  createUser,
  getSearchUserResult,
  getUser,
  getUserProfile,
  googleAuth,
  loginUser,
  logOutUser,
  singleUserAllBlog,
  updateUsrInformation,
  userPasswordChange,
} from "../Controllers/User.Controllers.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();
router.get(`/`, isAuthenticated, getUser);
router.get(`/logout`, logOutUser);
router.post(`/create-user`, createUser);
router.post(`/login`, loginUser);
router.post(`/google`, googleAuth);
router.post(`/search-result`, getSearchUserResult);
router.get(`/single-user/:username`, getUserProfile);
router.get(`/singleUserBlog/:username`, singleUserAllBlog);
router.put(`/change-password`, isAuthenticated, userPasswordChange);
router.put(`/change-avatar`, isAuthenticated, changeUserProfileImg);
router.put(`/change-information`, isAuthenticated, updateUsrInformation);
export default router;
