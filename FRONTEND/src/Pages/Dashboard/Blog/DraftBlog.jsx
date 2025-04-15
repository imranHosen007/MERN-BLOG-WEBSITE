import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTimeFunction } from "../../../components/getTimeFunction/getTimeFunction";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic";
import toast, { Toaster } from "react-hot-toast";

const DraftBlog = ({ number, blog, handleDelete }) => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handlePublish = () => {
    axiosPublic
      .put(`/blog/${blog?._id}`)
      .then(res => {
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          navigate(`/`);
          window.location.reload(true);
        }
      })
      .catch(error => {
        toast.error(error?.response?.data?.message);
      });
  };
  return (
    <>
      {" "}
      <div
        key={number}
        className="flex gap-10 border-b mb-6 max-md:px-6 border-gray-100 pb-6 items-center"
      >
        <h1 className="text-center pl-4 md:pl-6 flex-none text-4xl sm:text-3xl lg:text-5xl font-bold text-gray-300 leading-none">
          {number < 10 ? `0${number + 1}` : number + 1}
        </h1>
        <div className="flex flex-col py-2 w-full min-w-[300px] justify-between">
          <div>
            <h2 className="text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2 mb-4 ">
              {blog.title}
            </h2>
            <p className="line-clamp-2">
              {blog?.description?.length ? blog.description : "No Description"}
            </p>
            <div className="flex gap-6 items-center mt-3">
              <Link className="py-2 pr-4 underline" to={`/editor/${blog?._id}`}>
                Edit
              </Link>
              <button
                onClick={handlePublish}
                className="pr-4 py-2 hover:underline text-green"
              >
                Publish
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="pr-4 py-2 hover:underline text-red"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DraftBlog;
