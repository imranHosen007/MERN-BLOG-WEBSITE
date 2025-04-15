import React from "react";
import { NavLink } from "react-router-dom";
import useLatesBlog from "../../Hooks/useLatesBlog";
import BlogCard from "./BlogCard";
import useTrendingBlog from "../../Hooks/useTrendingBlog";
import NoMessage from "../NoMessage/NoMessage";
const homeMenu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Trending Blog",
    link: "/trending",
  },
];
export const LatestBlog = () => {
  const { blog } = useLatesBlog();

  return (
    <div>
      <div className="mt-5">
        {blog.length == 0 && <NoMessage message={`No Blogs Found`} />}
        {blog &&
          blog.map((data, index) => {
            return <BlogCard data={data} key={index} />;
          })}
      </div>
    </div>
  );
};
