import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ data }) => {
  return (
    <Link
      to={`/user/${data.personal_info.username}`}
      className="flex items-center gap-5 mb-5"
    >
      <img
        src={data.personal_info.profile_img}
        className="rounded-full w-14 h-14"
      />
      <div>
        <h1 className="text-xl font-medium line-clamp-2">
          {data.personal_info.name}
        </h1>
        <h1 className="text-base font-medium text-gray-500 line-clamp-2">
          @{data.personal_info.username}
        </h1>
      </div>
    </Link>
  );
};

export default UserCard;
