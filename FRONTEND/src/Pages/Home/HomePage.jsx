import React, { useEffect, useRef, useState } from "react";
import { LatestBlog } from "../../components/Home/LatestBlog";
import { NavLink } from "react-router-dom";
import useLatesBlog from "../../Hooks/useLatesBlog";
import BlogCard from "../../components/Home/BlogCard";
import useTrendingBlog from "../../Hooks/useTrendingBlog";
import TrendingCard from "../../components/Home/TrendingCard";
import Loader from "../../components/Loader/Loader";
import NoMessage from "../../components/NoMessage/NoMessage";

const HomePage = () => {
  const [active, setActive] = useState(0);
  const { blog, refetch, isLoading } = useLatesBlog();
  const { trendingBlog } = useTrendingBlog();
  const [selectedCategory, setSelectedCategory] = useState("home");
  const category = ["home", ...new Set(blog?.map(data => data.category))];
  const [blogs, setBlogs] = useState(null);

  const homeMenu = [
    {
      id: 1,
      name: selectedCategory,
      link: "/",
    },
    {
      id: 2,
      name: "Trending Blog",
      link: "/trending",
      class: "md:hidden",
    },
  ];

  const handleCategory = tags => {
    setSelectedCategory(tags);

    const filteredBlogs =
      tags === "home"
        ? blog
        : blog.filter(
            item => item.category.toLowerCase() === tags.toLowerCase()
          );
    setBlogs(filteredBlogs);
  };

  useEffect(() => {
    if (blog) {
      setBlogs(blog);
    }
  }, [blog]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex gap-10 section h-cover">
      <div className="md:w-[65%] w-full">
        <div className="w-full">
          {" "}
          <div className="relative w-full mb-8 overflow-x-auto bg-white border-b border-gray-200 flex-nowrap">
            {homeMenu.map((item, index) => {
              return (
                <button
                  onClick={e => setActive(index)}
                  className={`p-4 px-5 font-normal capitalize duration-300 ${
                    item.class
                  } ${
                    active == index
                      ? "text-black border-b border-black"
                      : "text-gray-400"
                  }`}
                  key={index}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <div>
            <div className="w-full ">
              {blogs?.length === 0 && (
                <NoMessage message={"No Blogs Publish"} />
              )}
              {active == 0 &&
                blogs &&
                blogs.slice(0, 5).map((item, index) => {
                  return <BlogCard data={item} key={index} />;
                })}
            </div>
            <div className="w-full md:hidden ">
              {active == 1 &&
                trendingBlog &&
                trendingBlog.map((item, index) => {
                  return <TrendingCard data={item} key={index} index={index} />;
                })}
              {trendingBlog?.length == 0 && (
                <NoMessage message={`Not Trending Blogs Found`} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[35%] hidden md:block w-full border-1 ol-8 pt-3 border-gray-200">
        <h1 className="mb-8 text-xl font-semibold">
          Stories From all Interest
        </h1>
        <div className="flex flex-wrap gap-3">
          {category &&
            category.map((item, index) => {
              return (
                <button
                  onClick={e => handleCategory(item)}
                  className={`p-1  rounded-full px-5 capitalize ${
                    item == selectedCategory
                      ? "bg-black text-white"
                      : "bg-gray-300"
                  }`}
                  key={index}
                >
                  {item}
                </button>
              );
            })}
        </div>
        <h1 className="my-8 text-xl font-medium">Treding</h1>
        {trendingBlog &&
          trendingBlog.map((item, index) => {
            return <TrendingCard data={item} key={index} index={index} />;
          })}
      </div>
    </div>
  );
};

export default HomePage;
