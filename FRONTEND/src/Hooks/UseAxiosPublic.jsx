import axios from "axios";
const axiosPublic = axios.create({
  baseURL: "https://mern-blog-website-backend-8ps3.onrender.com",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
