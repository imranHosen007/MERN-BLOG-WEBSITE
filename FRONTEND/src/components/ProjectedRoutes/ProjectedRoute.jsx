import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Navigate } from "react-router-dom";

const ProjectedRoute = ({ children }) => {
  const { user, isLoading, refetch } = useContext(AuthContext);

  if (isLoading == false) {
    if (user) {
      return <Navigate to={`/`} replace />;
    }
  }
  return children;
};

export default ProjectedRoute;
