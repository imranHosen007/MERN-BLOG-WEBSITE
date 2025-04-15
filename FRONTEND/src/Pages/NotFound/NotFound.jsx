import React from "react";
import notFound from "../../assets/404.png";
import { Link } from "react-router-dom";
import fullLogo from "../../assets/full-logo.png";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-10 text-center section h-cover">
      <img
        src={notFound}
        className="object-cover rounded aspect-square w-72"
        alt=""
      />
      <h1 className="text-4xl leading-7">Page Not Found</h1>
      <p className="text-xl leading-7 ">
        The Page You are Looking for does not exits.Head back to the{" "}
        <Link to={"/"} className="text-black underline">
          Home Page
        </Link>
      </p>
      <div className="mt-10">
        <img
          src={fullLogo}
          className="block object-contain h-8 mx-auto"
          alt=""
        />
        <p className="mt-5 text-gray-600 ">
          Read Millons Of Stories Around The World
        </p>
      </div>
    </div>
  );
};

export default NotFound;
