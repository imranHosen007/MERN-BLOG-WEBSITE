import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
let month = [
  "jan",
  "feb",
  "march",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const AboutUser = ({ user }) => {
  const getFullDate = timeStamp => {
    let date = new Date(timeStamp);
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="md:w-[90%] md:mt-2 ">
      <p className="text-xl leading-7">
        {user?.bio?.length ? bio : "Nothing To Read Here"}
      </p>

      <div className="flex flex-wrap gap-x-3 gap-y-2 text-2xl items-center mt-4 text-secondary">
        <Link to={user?.social_links.youtube}>
          <FaYoutube />
        </Link>{" "}
        <Link to={user?.social_links.instagram}>
          <FaInstagram />
        </Link>{" "}
        <Link to={user?.social_links.facebook}>
          <FaFacebook />
        </Link>{" "}
        <Link to={user?.social_links.twitter}>
          <FaTwitter />
        </Link>{" "}
        <Link to={user?.social_links.github}>
          <FaGithub />
        </Link>
      </div>
      <p className="text-xl leading-7">
        Joined On {getFullDate(user?.joinedAt)}
      </p>
    </div>
  );
};

export default AboutUser;
