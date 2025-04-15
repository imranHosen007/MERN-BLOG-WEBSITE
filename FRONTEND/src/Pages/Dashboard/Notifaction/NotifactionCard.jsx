import React from "react";
import { Link } from "react-router-dom";
import { getTimeFunction } from "../../../components/getTimeFunction/getTimeFunction";

const NotifactionCard = ({ data, handleDelete }) => {
  return (
    <div className="p-6 border border-gray-100 ">
      <div className="flex gap-5 mb-3">
        <img
          src={data?.user?.personal_info.profile_img}
          alt=""
          className="flex-none rounded-full w-14 h-14"
        />
        <div className="w-full">
          <h1 className="text-base font-medium text-secondary">
            <span className="hidden capitalize lg:inline-block">
              {data?.user?.personal_info?.name}
            </span>
            <Link
              className="mx-1 text-black underline"
              to={`/user/${data?.user?.personal_info?.username}`}
            >
              @{data?.user?.personal_info?.username}
            </Link>
            <span className="font-normal">
              {data?.type == "like"
                ? "Liked Your Blog"
                : data?.type == "comment"
                ? "Comment On"
                : ""}
            </span>
          </h1>
          <div>
            <Link
              className="font-medium text-secondary hover:underline line-clamp-1"
              to={`/blog/${data?.blog?._id}`}
            >{`"${data?.blog?.title}"`}</Link>
            {data?.comment && (
              <p className="mt-4 line-clamp-2">{data?.comment?.comment}</p>
            )}
            <div className="flex items-center gap-3 mt-2 ">
              <p className="font-medium ">{getTimeFunction(data?.createdAt)}</p>
              {data?.type == "comment" && (
                <button
                  className="hover:underline"
                  onClick={() => handleDelete(data._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifactionCard;
