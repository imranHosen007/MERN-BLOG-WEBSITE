import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";
import Loader from "../../components/Loader/Loader";

const Layout = () => {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Toaster />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
