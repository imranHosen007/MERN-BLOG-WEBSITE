import React from "react";
import useAxiosPublic from "./UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const axiosPublic = useAxiosPublic();

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
  return { user, isLoading, refetch };
};

export default useUser;
