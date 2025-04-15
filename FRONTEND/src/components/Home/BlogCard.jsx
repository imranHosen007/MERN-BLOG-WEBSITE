import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
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
export const getDay = (date) => {
  let dat = new Date(date);
  return `${dat.getDate()} ${month[dat.getMonth()]}`;
};
const BlogCard = ({ data }) => {
  return (
    <Link
      to={`/blog/${data._id}`}
      className="flex items-center justify-between w-full pb-5 mb-4 border-b border-gray-200"
    >
      {" "}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <img
            src={data.author?.personal_info?.profile_img}
            alt=""
            className="w-6 h-6 rounded-full"
          />
          <p className="line-clamp-1">
            {data.author?.personal_info?.name} @
            {data.author?.personal_info?.username}
          </p>
          <p className="min-w-fit">{getDay(data?.publishedAt)}</p>
        </div>
        <h1 className="text-xl font-normal leading-none md:text-3xl sm:text-2xl text-grey">
          {data.title}
        </h1>
        <p className="mt-1 mb-2 text-opacity-70  text-base leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {data.description}
        </p>
        <div className="flex items-center gap-4 my-2 md:my-0">
          <span className="px-3 py-1 mt-1 text-base text-black capitalize bg-gray-200 rounded-full whitespace-nowrap hover:bg-opacity-50">
            {data.category}
          </span>
          <span className="flex items-center gap-2 ">
            <FaRegHeart size={15} />
            {data.activity?.total_likes}
          </span>
        </div>
      </div>
      <div className="ml-2 h-28 aspect-square">
        <img
          src={data.banner}
          alt=""
          className="object-cover w-full h-full aspect-square"
        />
      </div>
    </Link>
  );
};

export default BlogCard;
