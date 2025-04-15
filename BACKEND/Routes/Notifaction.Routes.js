import express from "express";
import { isAuthenticated } from "../Middlewares/Auth.js";
import {
  deleteNotifaction,
  getAlertNotifaction,
  getAllNotifaction,
} from "../Controllers/Notifaction.Controllers.js";

const router = express.Router();

router.get(`/new`, isAuthenticated, getAlertNotifaction);
router.post(`/`, isAuthenticated, getAllNotifaction);
router.delete(`/:id`, isAuthenticated, deleteNotifaction);
export default router;
