import Notifacftion from "../Models/Notifaction.Model.js";
import User from "../Models/User.Models.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const getAlertNotifaction = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    let newNotifaction;
    const alertNotifaction = await Notifacftion.find({
      notification_for: user._id,
      seen: false,
      user: { $ne: user._id },
    });

    if (alertNotifaction.length !== 0) {
      newNotifaction = true;
    } else {
      newNotifaction = false;
    }
    res.status(201).json({
      success: true,
      newNotifaction,
      alertNotifaction,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getAllNotifaction = async (req, res, next) => {
  try {
    const { filter } = req.body;
    const user = await User.findById(req.user._id);

    let findQurry = {
      notification_for: user._id,
      user: { $ne: user._id },
    };

    if (filter != "all") {
      findQurry.type = filter;
    }
    const allNotifaction = await Notifacftion.find(findQurry)
      .populate("blog", "title")
      .populate(
        "user",
        "personal_info.name personal_info.username personal_info.profile_img "
      )
      .populate("comment", "comment")
      .sort("createdAt-1");
    await Notifacftion.updateMany(findQurry, { seen: true });
    const totalNotifaction = await Notifacftion.countDocuments(findQurry);
    res.status(200).json({
      success: true,
      allNotifaction,
      totalNotifaction,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// -------notifactionDelete-------

export const deleteNotifaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Notifacftion.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Notifaction Delete SuccesFull",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
