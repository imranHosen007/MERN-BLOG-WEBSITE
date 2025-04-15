import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import useUser from "../../Hooks/useUser";
import AboutUser from "./AboutUser";
import BlogCard from "../../components/Home/BlogCard";
import { AuthContext } from "../../Context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import NoMessage from "../../components/NoMessage/NoMessage";

const ProfilePage = () => {
  const { id } = useParams();
  const [active, setActive] = useState(0);
  const axiosPublic = useAxiosPublic();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState();

  const ProfileMenu = [
    {
      id: 1,
      name: "Published Blog",
      link: "/",
    },
    {
      id: 2,
      name: "About",

      class: "md:hidden",
    },
  ];

  useEffect(() => {
    axiosPublic
      .get(`/user/single-user/${id}`)
      .then(res => {
        setLoading(false);
        setCurrentUser(res?.data?.user);
      })
      .catch(error => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  }, [id]);

  useEffect(() => {
    axiosPublic
      .get(`/user/singleUserBlog/${id}`)
      .then(res => {
        setLoading2(false);
        setBlogs(res?.data?.blogs?.blogs);
      })
      .catch(error => {
        setLoading2(false);
        toast.error(error?.response?.data?.message);
      });
  }, [id]);

  if (loading) {
    <Loader />;
  }
  return (
    <div>
      <Toaster />
      <section className="gap-10 md:flex-row-reverse md:flex section h-cover">
        {/* -----Profile-Img-Section----- */}
        <div className="w-full md:w-[35%] ">
          <div className="md:w-[35%] w-full">
            {/* -----Profile-Info-Section---- */}
            <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] md:mt-1">
              <img
                src={currentUser?.personal_info?.profile_img}
                alt=""
                className="w-48 h-48 rounded-full md:w-24 md:h-24"
              />
              <h1 className="text-2xl font-medium">
                @{currentUser?.personal_info?.username}
              </h1>
              <p className="h-6 text-xl capitalize">
                {currentUser?.personal_info?.name}
              </p>
              <p>
                {currentUser?.account_info?.total_posts.toLocaleString()} Blogs
                - {currentUser?.account_info?.total_reads.toLocaleString()}{" "}
                Reads
              </p>
              {currentUser?.personal_info?.username ===
                user?.personal_info?.username && (
                <div className="flex gap-4 mt-2">
                  <Link
                    to={`/setting/edit-profile`}
                    className="text-black p-1.5 bg-gray-200 rounded-md"
                  >
                    Edit Profile
                  </Link>
                </div>
              )}
              <div className="hidden md:block">
                <AboutUser user={currentUser} />
              </div>
            </div>
          </div>
        </div>
        {/* -----Profile-Blog-Section----- */}
        <div className="w-full md:w-[65%]  ">
          <div className="relative w-full mb-8 overflow-x-auto bg-white border-b border-gray-200 flex-nowrap">
            {ProfileMenu.map((item, index) => {
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
          {/* ----Blog-Card-Section---- */}

          {active == 0 && (
            <div>
              {blogs?.length == 0 ||
                (blogs == null && <NoMessage message={`No Blogs Publish`} />)}
            </div>
          )}

          {active == 0 &&
            blogs &&
            blogs.slice(0, 5).map((item, index) => {
              return <BlogCard data={item} key={index} />;
            })}
          {active == 1 && (
            <div className=" md:hidden">
              <AboutUser user={currentUser} />
            </div>
          )}
        </div>{" "}
      </section>
    </div>
  );
};

export default ProfilePage;

// {/* <section className="flex flex-row-reverse gap-10 section h-cover">

// {/* ----Profile-Single-Blog-Section----- */}
// <div className="md:w-[65%] hidden w-full">
//   {ProfileMenu.map((item, index) => {
//     return (
//       <button
//         onClick={e => setActive(index)}
//         className={`p-4 px-5 font-normal capitalize duration-300 ${
//           item.class
//         } ${
//           active == index
//             ? "text-black border-b border-black"
//             : "text-gray-400"
//         }`}
//         key={index}
//       >
//         {item.name}
//       </button>
//     );
//   })}
// </div>
// </section> */}
