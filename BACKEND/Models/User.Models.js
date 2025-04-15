import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
let profile_imgs_name_list = [
  "Garfield",
  "Tinkerbell",
  "Annie",
  "Loki",
  "Cleo",
  "Angel",
  "Bob",
  "Mia",
  "Coco",
  "Gracie",
  "Bear",
  "Bella",
  "Abby",
  "Harley",
  "Cali",
  "Leo",
  "Luna",
  "Jack",
  "Felix",
  "Kiki",
];
let profile_imgs_collections_list = [
  "notionists-neutral",
  "adventurer-neutral",
  "fun-emoji",
];
const UserSchema = new mongoose.Schema(
  {
    personal_info: {
      name: {
        type: String,
        lowercase: true,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      password: {
        type: String,
        select: false,
      },
      username: {
        type: String,

        unique: true,
      },
      bio: {
        type: String,

        default: "",
      },
      profile_img: {
        type: String,
        default: `https://api.dicebear.com/6.x/${
          profile_imgs_collections_list[
            Math.floor(Math.random() * profile_imgs_collections_list.length)
          ]
        }/svg?seed=${
          profile_imgs_name_list[
            Math.floor(Math.random() * profile_imgs_name_list.length)
          ]
        }`,
      },
    },
    social_links: {
      youtube: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
    },
    account_info: {
      total_posts: {
        type: Number,
        default: 0,
      },
      total_reads: {
        type: Number,
        default: 0,
      },
    },
    google_auth: {
      type: Boolean,
      default: false,
    },
    blogs: {
      type: [Schema.Types.ObjectId],
      ref: "Blog",
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);
// -----Hash-Password---
UserSchema.pre("save", async function (next) {
  if (!this.isModified("personal_info.password")) {
    next();
  }
  this.personal_info.password = await bcrypt.hash(
    this.personal_info.password,
    10
  );
});
// ----Compare-Password---
UserSchema.methods.comparePassword = async function (entredPassword) {
  return await bcrypt.compare(entredPassword, this.personal_info.password);
};

// ---JWT_TOKEN---
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_TOKEN_KEY, {
    expiresIn: process.env.JWT_EXPRIES,
  });
};
const User = mongoose.model("User", UserSchema);

export default User;
