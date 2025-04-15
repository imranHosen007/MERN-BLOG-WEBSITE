import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
const Navbar = () => {
  return (
    <div className="w-full px-[5vw] py-5 h-[80px] border-b border-gray-200 bg-white flex items-center gap-12 static top-0 !z-50 justify-between">
      <div className="flex gap-4 items-center">
        <Link to={"/"} className="">
          <img src={logo} className="w-10" />
        </Link>{" "}
        <p className="text-black w-full hidden md:block">New Blog</p>
      </div>
      <div className="flex items-center gap-x-3">
        <button className="btn !py-2 !text-base">Publish</button>
        <button className="btn !py-2 !text-base !bg-gray-200 !text-black">
          Save Draft
        </button>
      </div>
    </div>
  );
};

export default Navbar;
