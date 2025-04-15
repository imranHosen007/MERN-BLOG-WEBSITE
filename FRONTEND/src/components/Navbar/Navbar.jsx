import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";

import { AuthContext } from "../../Context/AuthProvider";
import { IoIosNotificationsOutline } from "react-icons/io";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import toast from "react-hot-toast";
import { Query } from "@tanstack/react-query";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isLoading, refetch, newNotifaction } = useContext(AuthContext);
  const [dropDown, setDropDown] = useState(false);
  const [scrollPostion, setScrollPostion] = useState(0);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleLogout = () => {
    axiosPublic
      .get(`/user/logout`, { withCredentials: true })
      .then(res => {
        if (res?.data.success) {
          toast.success(res?.data?.message);

          window.location.reload(true);
        }
      })
      .catch(error => toast.error(error?.response?.data?.message));
  };

  // -----Handle-KeyDown----
  const handleKeyDown = e => {
    const qurry = e.target.value;

    if (e.keyCode == 13 && qurry.length) {
      navigate(`/search/${qurry}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setScrollPostion(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="!sticky top-0 z-50">
      {" "}
      <nav className="w-full px-[5vw] py-5 h-[80px] border-b border-gray-200 bg-white flex items-center gap-12  justify-between">
        <div className="flex items-center gap-8">
          {" "}
          <Link to={"/"} className="">
            <img src={logo} className="w-10" />
          </Link>
          <div className="bg-white relative hidden md:block   mt-0.5  border-gray-200 p-0 border-0 w-auto">
            <input
              onKeyDown={handleKeyDown}
              placeholder="Search...."
              type="text"
              className="w-auto p-3 pl-12 pr-6 bg-gray-200 rounded-full placeholder:text-dark-gray"
            />
            <FaSearch className="absolute text-xl text-gray-400 -translate-y-1/2 top-1/2 left-5" />
          </div>{" "}
        </div>{" "}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full cursor-pointer md:hidden"
          >
            <FaSearch size={20} className="text-gray-400" />
          </button>
          <Link
            to={`/editor`}
            className="items-center hidden gap-2 p-2 px-3 bg-gray-200 opacity-75 md:flex hover:opacity-50"
          >
            <LuFileEdit size={15} />
            <p>Write</p>
          </Link>
          {user ? (
            <>
              <Link to={`/dashboard/notifaction`}>
                {" "}
                <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer relative ">
                  <IoIosNotificationsOutline size={20} className="text-black" />
                  {newNotifaction && (
                    <span className="bg-red w-3 h-3 rounded-full top-2 right-2 absolute "></span>
                  )}
                </button>
              </Link>
              <div className="relative">
                <button
                  className="w-12 h-12 mt-1"
                  onClick={() => setDropDown(!dropDown)}
                >
                  <img
                    src={user?.personal_info?.profile_img}
                    className="object-cover w-full h-full rounded-full"
                    alt=""
                  />
                </button>
                {dropDown && (
                  <div className="absolute right-0 z-50 overflow-hidden duration-200 bg-white border border-gray-200 shadow-md top-full w-60">
                    <Link
                      onClick={() => setDropDown(false)}
                      to={`/editor`}
                      className="flex items-center gap-2 p-2 px-3 opacity-75 hover:bg-gray-200 hover:opacity-50"
                    >
                      <LuFileEdit size={15} />
                      <p>Write</p>
                    </Link>
                    <Link
                      onClick={() => setDropDown(false)}
                      className="flex items-center gap-2 p-2 px-3 pl-8 opacity-75 hover:bg-gray-200 hover:opacity-50"
                      to={`/user/${user?.personal_info.username}`}
                    >
                      Profile
                    </Link>
                    <Link
                      onClick={() => setDropDown(false)}
                      className="flex items-center gap-2 p-2 px-3 pl-8 opacity-75 hover:bg-gray-200 hover:opacity-50"
                      to={`/dashboard/blog`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      onClick={() => setDropDown(false)}
                      className="flex items-center gap-2 p-2 px-3 pl-8 opacity-75 hover:bg-gray-200 hover:opacity-50"
                      to={`/settings/edit-profile`}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full gap-2 p-2 px-3 pl-8 text-left opacity-75 hover:bg-gray-200 hover:opacity-50"
                    >
                      <h1 className="font-bold t">Log Out</h1>
                      <span>{user?.personal_info?.username}</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                className="btn hidden md:block !py-2 !text-base"
                to={`/singup`}
              >
                Sing Up
              </Link>{" "}
              <Link
                className="btn !py-2 !text-base !text-black !bg-gray-200 "
                to={`/login`}
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </nav>
      {open && (
        <div className="px-[5vw] relative mt-4 md:hidden">
          <input
            onKeyDown={handleKeyDown}
            placeholder="Search...."
            type="text"
            className="w-full p-3 pl-12 pr-6 bg-gray-200 rounded-full placeholder:text-gray-400"
          />
          <FaSearch className="absolute text-xl text-gray-400  top-1/2 right-[10%] -translate-y-1/2" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
