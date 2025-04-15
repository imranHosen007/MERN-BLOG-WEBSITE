import React from "react";
import useAxiosPublic from "./UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useTrendingBlog = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: trendingBlog,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axiosPublic("/blog/trending", {
        withCredentials: true,
      });
      return response.data.blogs;
    },
  });
  return { trendingBlog, isLoading, refetch };
};

export default useTrendingBlog;
