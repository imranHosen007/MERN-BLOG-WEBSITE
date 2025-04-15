import React, { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/UseAxiosPublic";

import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [newNotifaction, setNewNotifaction] = useState(false);
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosPublic("/user", { withCredentials: true });
      return response.data.user;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      axiosPublic
        .get(`/notifaction/new`, { withCredentials: true })
        .then(res => {
          if (res?.data?.success) {
            setNewNotifaction(res?.data?.newNotifaction);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [user, newNotifaction, setNewNotifaction]);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, refetch, newNotifaction, setNewNotifaction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
