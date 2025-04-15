import React from "react";
import useAxiosPublic from "./UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useLatesBlog = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: blog,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axiosPublic.get(
        "/blog",

        {
          withCredentials: true,
        }
      );
      return response.data.blogs;
    },
  });
  return { blog, isLoading, refetch };
};

export default useLatesBlog;
