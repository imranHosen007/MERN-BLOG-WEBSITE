import React, { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegCommentDots, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const BlogIntraction = ({
  data,
  handleLike,
  totalLike,
  isLikedUser,
  setCommentWrapper,
}) => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <hr className="my-2 border-gray-200" />
      <div className="flex justify-between">
        {" "}
        <div className="flex gap-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full opacity-80"
            >
              {isLikedUser ? (
                <FaHeart className="text-red" size={20} />
              ) : (
                <CiHeart size={20} />
              )}
            </button>{" "}
            <p className="text-xl text-secondary">{totalLike}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCommentWrapper(prev => !prev)}
              className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full opacity-80"
            >
              <FaRegCommentDots size={20} />
            </button>{" "}
            <p className="text-xl text-secondary">
              {data?.activity?.total_comments}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {user?.personal_info?.username ==
            data?.author?.personal_info?.username && (
            <Link
              to={`/editor/${data._id}`}
              className="underline hover:text-purple-600"
            >
              Edit
            </Link>
          )}
          <Link className="text-xl hover:text-[#1DA1F2]">
            {" "}
            <FaTwitter />
          </Link>
        </div>
      </div>
      <hr className="my-2 border-gray-200" />
    </div>
  );
};

export default BlogIntraction;
