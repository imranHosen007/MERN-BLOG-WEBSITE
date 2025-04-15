import React from "react";
import { Link } from "react-router-dom";
import { getDay } from "./BlogCard";

const TrendingCard = ({ data, index }) => {
  return (
    <Link to={`/blog/${data._id}`} className="flex gap-5 mb-4 ">
      <h1 className="md:text-4xl text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-300 leading-none;">
        {index < 10 ? "0" + (index + 1) : index + 1}
      </h1>
      <div>
        {" "}
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
        <h1 className="text-3xl font-normal leading-none sm:text-2xl text-grey">
          {data.title}
        </h1>
      </div>
    </Link>
  );
};

export default TrendingCard;
