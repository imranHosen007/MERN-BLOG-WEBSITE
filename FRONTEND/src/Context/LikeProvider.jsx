import React, { createContext, useState } from "react";
import useAxiosPublic from "../Hooks/UseAxiosPublic";
import toast from "react-hot-toast";
import useUser from "../Hooks/useUser";

export const LikeContext = createContext();
const LikeProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useUser();
  const [isLikedUser, setIsLikedUser] = useState(false);
  const [totalLike, setTotalLike] = useState(0);

  const handleLike = () => {
    if (user) {
      setIsLikedUser(prev => !prev);

      if (!isLikedUser) {
        setTotalLike(prev => prev + 1);
      }
      if (isLikedUser) {
        setTotalLike(prev => prev - 1);
      }

      axiosPublic
        .post(
          `/blog/like-blog`,
          { blog_id: blog._id, likedByUser: isLikedUser },
          { withCredentials: true }
        )
        .then(res => {})
        .catch(error => {
          console.log(error);
        });
    } else {
      toast.error(`Please Login to Like this blog`);
    }
  };
  return (
    <LikeContext.Provider value={{ isLikedUser, setIsLikedUser, handleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export default LikeProvider;
