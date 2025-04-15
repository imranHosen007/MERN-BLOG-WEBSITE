import User from "../Models/User.Models.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import { sendJwtToken } from "../Utils/sendJwtToken.js";
import cloudinary from "cloudinary";
// create-User
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, profile_img } = req.body;
    console.log(req.body);
    const username = email.split("@")[0];
    const exitsingUser = await User.findOne({ "personal_info.email": email });
    if (exitsingUser) {
      return next(new ErrorHandler("User Already Exits", 400));
    }
    const user = new User({
      personal_info: { name, email, password, username, profile_img },
    });

    sendJwtToken(user, 200, res);
    await user.save();
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Login-User
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }
    const user = await User.findOne({ "personal_info.email": email }).select(
      "+personal_info.password"
    );
    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Please provide the correct Password", 400));
    }

    sendJwtToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// get-User

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// LogOut-User

export const logOutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
// Google-Auth
export const googleAuth = async (req, res, next) => {
  try {
    let { name, profile_img, email, password } = req.body;
    let username = email.split("@")[0];
    username.slice(0, 10);
    email = email.split("@")[0];
    const user = await User.findOne({ "personal_info.email": email }).select(
      "+personal_info.password"
    );
    if (user) {
      return sendJwtToken(user, 201, res);
    } else {
      const newUser = new User({
        personal_info: { name, email, password, username, profile_img },
      });
      await newUser.save();
      sendJwtToken(newUser, 200, res);
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// search-User-Result

export const getSearchUserResult = async (req, res, next) => {
  try {
    const { qurry } = req.body;

    const user = await User.find({
      "personal_info.username": new RegExp(qurry, "i"),
    }).limit(50);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// getSingleUser
export const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({
      "personal_info.username": username,
    }).limit(50);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ----getAllBlogSingleUser
export const singleUserAllBlog = async (req, res, next) => {
  try {
    const { username } = req.params;
    const blogs = await User.findOne({
      "personal_info.username": username,
      "blogs.draft": false,
    })
      .limit(50)
      .select("blogs");

    res.status(201).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ------User-PasswrodChange-------

export const userPasswordChange = async (req, res, next) => {
  try {
    const { currentPassword, confirmPassword } = req.body;
    const user = await User.findById(req.user._id).select(
      "+personal_info.password"
    );
    const isMatched = await user.comparePassword(currentPassword);
    console.log(isMatched);
    if (!isMatched) {
      return next(new ErrorHandler("Old password is incorrect!", 400));
    }
    user.personal_info.password = confirmPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password Change successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// -------ChangeUserProfileImg-------

export const changeUserProfileImg = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findById(req?.user?._id);
    if (avatar !== "") {
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });

      user.personal_info.profile_img = myCloud.secure_url;
      await user.save();
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// -----Update-User-Information-----

export const updateUsrInformation = async (req, res, next) => {
  const {
    name,
    bio,
    username,
    facebook,
    youtube,
    instagram,
    twitter,
    github,
    website,
  } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }
  user.personal_info.name = name;
  user.personal_info.bio = bio;
  user.personal_info.username = username;
  user.social_links.facebook = facebook;
  user.social_links.youtube = youtube;
  user.social_links.twitter = twitter;
  user.social_links.instagram = instagram;
  user.social_links.github = github;
  user.social_links.website = website;
  await user.save();
  res.status(201).json({
    success: true,
    user,
  });
  try {
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
