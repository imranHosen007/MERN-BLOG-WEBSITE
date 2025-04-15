import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLatesBlog from "../../Hooks/useLatesBlog";
import BlogCard from "../../components/Home/BlogCard";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import UserCard from "./UserCard";

import { CiUser } from "react-icons/ci";
import NoMessage from "../../components/NoMessage/NoMessage";
const SearchQurry = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [active, setActive] = useState(0);
  const [blogs, setBlogs] = useState("");
  const { blog } = useLatesBlog();
  const [user, setUser] = useState(null);
  const homeMenu = [
    {
      id: 1,
      name: `Search Reuslt From "${id}"`,
      link: "/",
    },
    {
      id: 2,
      name: "Account Matched",

      class: "md:hidden",
    },
  ];

  useEffect(() => {
    const searchBlog =
      blog?.length &&
      blog.filter(item => {
        return item.title.toLowerCase().includes(id.toLowerCase());
      });

    setBlogs(searchBlog);
  }, [blog, id]);
  useEffect(() => {
    axiosPublic
      .post(`/user/search-result`, { qurry: id }, { withCredentials: true })
      .then(res => {
        setUser(res?.data?.user);
      })
      .catch(error => console.log(error));
  }, [id]);

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
              {blogs?.length == 0 && <NoMessage message={`No Blogs Publish`} />}
              {active == 0 &&
                blogs &&
                blogs.slice(0, 5).map((item, index) => {
                  return <BlogCard data={item} key={index} />;
                })}
            </div>
            <div className="w-full md:hidden ">
              {active == 1 &&
                user &&
                user?.map((item, index) => {
                  return <UserCard data={item} key={index} index={index} />;
                })}
              {user?.length == 0 && <NoMessage message={`No User Found`} />}
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[35%] md:block hidden w-full border-1 ol-8 pt-3 border-gray-200">
        <h1 className="flex items-center gap-4 mb-8 text-xl font-semibold">
          User Releted To Search <CiUser size={20} />
        </h1>
        {user?.length == 0 && <NoMessage message={`No User Found`} />}
        {user &&
          user.length !== 0 &&
          user.map((item, index) => {
            return <UserCard data={item} key={index} />;
          })}
      </div>
    </div>
  );
};

export default SearchQurry;
