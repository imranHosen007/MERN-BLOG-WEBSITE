import React, { useContext, useEffect, useRef, useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";

import { IoDocumentOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuFileEdit } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { FaBarsStaggered } from "react-icons/fa6";
import { AuthContext } from "../../Context/AuthProvider";

const Settings = () => {
  let page = location.pathname.split("/")[2];
  const { newNotifaction, user } = useContext(AuthContext);
  const [pageState, setPageState] = useState(page.replace("-", " "));
  const [showSideNav, setShowSideNav] = useState(false);
  let activeTabLine = useRef();
  let sideBarIconTab = useRef();
  let pageStateTab = useRef();
  if (!user) {
    return <Navigate to={`/login`} />;
  }
  const handlePageState = (e, condition) => {
    const { offsetWidth, offsetLeft } = e.target;

    activeTabLine.current.style.width = offsetWidth + "px";
    activeTabLine.current.style.left = offsetLeft + "px";
    setShowSideNav(condition);
  };

  return (
    <div className="relative flex flex-col gap-10 py-0 m-0 md:flex-row section">
      <div className="sticky top-[80px] z-30 ">
        <div className="flex py-1 overflow-x-auto bg-white border-b border-gray-100 md:hidden flex-nowrap">
          <button
            ref={sideBarIconTab}
            onClick={(e) => handlePageState(e, true)}
            className="p-5 "
          >
            <FaBarsStaggered />
          </button>
          <button
            ref={pageStateTab}
            onClick={(e) => handlePageState(e, false)}
            className="p-5 capitalize"
          >
            {pageState}
          </button>
          <hr
            ref={activeTabLine}
            className="absolute bottom-0 duration-500 bg-black "
          />
        </div>
        <div
          className={`min-w-[200px] md:h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0  border-r  border-gray-100 absolute max-md:top-[64px] bg-white max-md:w-[calc(100%+100px)] max-md:px-16 mt-4  md:mt-0 max-md:-ml-7 duration-500 ${
            !showSideNav
              ? "max-md:opacity-0 max-md:pointer-events-none"
              : "opacity-100 pointer-events-auto"
          }`}
        >
          <h1>Dashboard</h1>
          <hr className="mb-8 mr-6 -ml-6 border-gray-100" />
          <div>
            <NavLink
              to={`/dashboard/blog`}
              onClick={(e) => setPageState(e.target.innerText)}
              className={({ isActive }) =>
                `flex gap-4 items-center py-5 text-secondary hover:text-black ${
                  isActive &&
                  "text-black border-r-2 border-black pl-6 bg-gray-100 -ml-6 md:rounded-tl-lg md:rounded-bl-lg max-md:border-none"
                }`
              }
            >
              <IoDocumentOutline />
              Blogs
            </NavLink>{" "}
            <NavLink
              to={`/dashboard/notifaction`}
              onClick={(e) => setPageState(e.target.innerText)}
              className={({ isActive }) =>
                `flex gap-4 items-center py-5 text-secondary hover:text-black ${
                  isActive &&
                  "text-black border-r-2 border-black pl-6 bg-gray-100 -ml-6 md:rounded-tl-lg md:rounded-bl-lg max-md:border-none"
                }`
              }
            >
              <div className="relative">
                <IoIosNotificationsOutline size={20} />
                {newNotifaction && (
                  <span className="absolute top-0 right-0 z-10 w-2 h-2 rounded-full bg-red"></span>
                )}
              </div>
              Notifaction
            </NavLink>{" "}
            <NavLink
              to={`/editor`}
              onClick={(e) => setPageState(e.target.innerText)}
              className={({ isActive }) =>
                `flex gap-4 items-center py-5 text-secondary hover:text-black ${
                  isActive &&
                  "text-black border-r-2 border-black pl-6 bg-gray-100 -ml-6 md:rounded-tl-lg md:rounded-bl-lg max-md:border-none"
                }`
              }
            >
              <LuFileEdit />
              Editor
            </NavLink>
            <h1 className="mt-16 mb-3 text-xl ">Settings</h1>{" "}
            <hr className="mb-8 mr-6 -ml-6 border-gray-100" />
            <NavLink
              onClick={(e) => setPageState(e.target.innerText)}
              to={`/settings/edit-profile`}
              className={({ isActive }) =>
                `flex gap-4 items-center py-5 text-secondary hover:text-black ${
                  isActive &&
                  "text-black border-r-2 border-black pl-6 bg-gray-100 -ml-6 md:rounded-tl-lg md:rounded-bl-lg max-md:border-none"
                }`
              }
            >
              <FaUser />
              Edit Profile
            </NavLink>{" "}
            <NavLink
              onClick={(e) => setPageState(e.target.innerText)}
              to={`/settings/change-password`}
              className={({ isActive }) =>
                `flex gap-4 items-center py-5 text-secondary hover:text-black ${
                  isActive &&
                  " text-black border-r-2 border-black pl-6 bg-gray-200 -ml-6 md:rounded-tl-lg md:rounded-bl-lg max-md:border-none"
                }`
              }
            >
              <CiLock />
              Change Password
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-full mt-5 max-md:-mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
