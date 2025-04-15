import express from "express";
import { config } from "dotenv";
export const app = express();
import cors from "cors";
import ErrorMiddleware from "./Middlewares/ErrorMiddleware.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// ----Using-MiddleWare-----

config({
  path: "./.env",
});

const corsOptions = {
  origin: [
    `http://localhost:5173`,
    "https://mern-blog-website-frontend-vert.vercel.app",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// ---Importing-Routes---
import UserRoutes from "./Routes/User.Routes.js";
import BlogRoutes from "./Routes/Blog.Routes.js";
import CommentRoutes from "./Routes/Comment.Routes.js";
import NotifactionRoutes from "./Routes/Notifaction.Routes.js";

app.use(`/user`, UserRoutes);
app.use(`/blog`, BlogRoutes);
app.use(`/comment`, CommentRoutes);
app.use(`/notifaction`, NotifactionRoutes);
app.get(`/`, (req, res, next) => {
  res.send(`Imran`);
});

// it's for ErrorHandling
app.use(ErrorMiddleware);
