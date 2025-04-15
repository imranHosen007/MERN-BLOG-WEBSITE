import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getTimeFunction } from "../../../components/getTimeFunction/getTimeFunction";

const PublishBlog = ({ blog, handleDelete }) => {
  const [showStats, setShowStats] = useState(false);

  const BlogStats = ({ stats }) => {
    return (
      <div className="flex gap-2 mb-6 border-b border-gray-100">
        {Object.keys(stats).map((info, index) => {
          return (
            !info.includes("parent") && (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-full h-full p-4 px-6"
              >
                <h1 className="mb-2 text-xl md:text-2xl">
                  {stats[info].toLocaleString()}
                </h1>
                <p className="capitalize text-secondary">
                  {info.split("_")[1]}
                </p>
              </div>
            )
          );
        })}
      </div>
    );
  };
  return (
    <>
      {" "}
      <div className="flex items-center w-full gap-10 pb-6 mb-6 border-b border-gray-100 max-md:px-6">
        <img
          src={blog?.banner}
          alt=""
          className="flex-none hidden object-cover bg-gray-100 md:block w-28 h-28"
        />
        <div className="flex flex-col py-2 w-full min-w-[300px] justify-between">
          <div>
            <Link
              to={`/blog/${blog._id}`}
              className="mb-4 text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2 hover:underline"
            >
              {blog.title}
            </Link>
            <p className="line-clamp-1">
              Published on {getTimeFunction(blog?.publishedAt)}
            </p>
            <div className="flex items-center gap-6 mt-3">
              <Link className="py-2 pr-4 underline" to={`/editor/${blog?._id}`}>
                Edit
              </Link>
              <button
                onClick={() => setShowStats((prev) => !prev)}
                className="py-2 pr-4 underline text-red lg:hidden"
              >
                Stats
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="py-2 pr-4 underline text-red"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="max-lg:hidden">
          <BlogStats stats={blog?.activity} />
        </div>
      </div>
      {showStats && (
        <div className="lg:hidden">
          <BlogStats stats={blog?.activity} />
        </div>
      )}
    </>
  );
};

export default PublishBlog;
