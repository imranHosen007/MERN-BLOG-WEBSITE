import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic";

import PublishBlog from "./PublishBlog";
import DraftBlog from "./DraftBlog";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";
import NoMessage from "../../../components/NoMessage/NoMessage";

const homeMenu = [
  {
    id: 1,
    name: "Publish Blogs",
    onclick: false,
  },
  {
    id: 2,
    name: "Draft",
    onclcik: true,
  },
];
const BlogManagement = () => {
  const [active, setActive] = useState(0);
  const [allUserBlog, setallUserBlog] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const [filterBlog, setFilterBlog] = useState("");

  // ----Handle-Filter-------

  const handleFilter = (index) => {
    setActive(index);

    if (index == 0) {
      const filterPublish =
        allUserBlog.length !== 0 &&
        allUserBlog.filter((blog) => {
          return blog.draft == false;
        });
      setFilterBlog(filterPublish);
    }

    if (index == 1) {
      const filterDraft =
        allUserBlog.length !== 0 &&
        allUserBlog.filter((blog) => {
          return blog.draft === true;
        });
      setFilterBlog(filterDraft);
    }
  };
  // ------------Handle-Delete--------
  const handleDelete = (id) => {
    axiosPublic
      .delete(`/blog/${id}`, { withCredentials: true })
      .then((res) => {
        if (res?.data?.success) {
          const filteredBlog = filterBlog.filter((blog) => {
            return blog._id !== id;
          });
          setFilterBlog(filteredBlog);
        }
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  // ------Fetching-Data-----
  useEffect(() => {
    axiosPublic
      .get(`/blog/all-user/blog`, { withCredentials: true })
      .then((res) => {
        if (res?.data?.success) {
          setLoading(false);

          setallUserBlog(res?.data?.allBlog);

          const filterPublish =
            res?.data?.allBlog?.length !== 0 &&
            res?.data?.allBlog?.filter((blog) => {
              return blog.draft == false;
            });
          setFilterBlog(filterPublish);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  }, [axiosPublic]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <h1 className="mb-8 max-md:hidden">Manage Blog</h1>
      <div className="relative w-full mb-8 bg-white flex-nowrap">
        {homeMenu.map((item, index) => {
          return (
            <button
              onClick={() => handleFilter(index, item.onclcik)}
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
      {filterBlog.length == 0 && <NoMessage message={`No Blog Found`} />}
      {active == 0 &&
        filterBlog.length !== 0 &&
        filterBlog?.map((blog, index) => {
          return (
            <PublishBlog key={index} blog={blog} handleDelete={handleDelete} />
          );
        })}{" "}
      {active == 1 &&
        filterBlog.length !== 0 &&
        filterBlog?.map((blog, index) => {
          return (
            <DraftBlog number={index} blog={blog} handleDelete={handleDelete} />
          );
        })}
    </div>
  );
};

export default BlogManagement;
