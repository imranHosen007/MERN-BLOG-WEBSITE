import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import BlogIntraction from "../../components/DynamicBlog/BlogIntraction";
import BlogCard from "../../components/Home/BlogCard";
import toast, { Toaster } from "react-hot-toast";
import BlogContent from "./BlogContent";
import useUser from "../../Hooks/useUser";
import { useContext } from "react";
import { LikeContext } from "../../Context/LikeProvider";
import CommentContainer from "../../components/DynamicBlog/CommentContainer";
import { getTimeFunction } from "../../components/getTimeFunction/getTimeFunction";
import { AuthContext } from "../../Context/AuthProvider";
import Loader from "../../components/Loader/Loader";
import NoMessage from "../../components/NoMessage/NoMessage";

const BlogDeatilsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [blog, setBlog] = useState("");
  const [similarBlogs, setSimilarBlogs] = useState("");
  const [isLikedUser, setIsLikedUser] = useState(false);
  const [totalLike, setTotalLike] = useState(0);
  const [commnetWrapper, setCommentWrapper] = useState(false);
  const [totalParentCommentLoaded, setTotalParentCommentLoaded] = useState(0);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        setLoading(false);
        const blogRes = await axiosPublic.post(`/blog/increase-read/${id}`, {
          withCredentials: true,
        });
        setBlog(blogRes.data.readPost);

        setTotalLike(blogRes.data.readPost.activity.total_likes);

        if (
          blogRes.data.readPost &&
          blogRes.data.readPost.tags &&
          blogRes.data.readPost.tags.length > 0
        ) {
          const similarBlogsRes = await axiosPublic.post(
            `/blog/similar-blog`,
            {
              tag: blogRes.data.readPost.tags[0],
              elimateBlog: blogRes.data.readPost._id,
            },
            { withCredentials: true }
          );
          setSimilarBlogs(similarBlogsRes.data?.similarBlog);
        } else {
          console.warn("Blog data or tags are missing.");
          setSimilarBlogs([]);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, axiosPublic]);

  // ------Handle-Like------
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

  useEffect(() => {
    axiosPublic
      .post(
        `/blog/isuser-like`,
        { _id: id, userId: user, likedByUser: isLikedUser },
        { withCredentials: true }
      )
      .then(res => {
        if (res?.data?.success) {
          setLoading2(false);
          console.log(`this is true,false`, res?.data?.exists.length);
          if (res?.data?.exists.length !== 0) {
            setIsLikedUser(Boolean(res?.data?.exists));
          }
        }
      })
      .catch(error => {
        setLoading2(false);
        console.log(error);
      });
  }, [id]);

  if (loading2 || loading) {
    return <Loader />;
  }
  return (
    <div className="section">
      <CommentContainer
        commnetWrapper={commnetWrapper}
        setCommentWrapper={setCommentWrapper}
        blog={blog}
        setBlog={setBlog}
      />
      <div className=" border max-w-[900px] mx-auto   border-red center">
        <img src={blog?.banner} alt="" className="w-full aspect-video" />
        <div className="mt-6">
          <h2>{blog?.title}</h2>
          <div className="flex justify-between my-8 max-sm:flex-col">
            <div className="flex items-start gap-5">
              <img
                src={blog?.author?.personal_info?.profile_img}
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <p className="capitalize">
                {blog?.author?.personal_info?.name} <br />
                <Link
                  to={`/user/${blog?.author?.personal_info?.username} `}
                  className="hover:underline"
                >
                  @{blog?.author?.personal_info?.username}
                </Link>
              </p>
            </div>
            <div>
              <p className="pl-5 mt-6 ml-12 opacity-75">
                Published On {getTimeFunction(blog?.publishedAt)}
              </p>
            </div>
          </div>
        </div>
        <BlogIntraction
          data={blog}
          handleLike={handleLike}
          totalLike={totalLike}
          isLikedUser={isLikedUser}
          setCommentWrapper={setCommentWrapper}
        />
        {/* -----Blog-Content---- */}
        <div className="my-12">
          {blog?.content?.map((block, index) => {
            return (
              <div key={index} className="my-4 md:my-8">
                <BlogContent block={block} />
              </div>
            );
          })}
        </div>
        {/* ---Similar-Blog---- */}
        {similarBlogs.length != 0 && (
          <NoMessage message={`No Similar Blogs Found`} />
        )}
        {similarBlogs.length != 0 && (
          <div>
            <h1 className="mb-10 text-2xl font-medium mt-14">Similar Blog</h1>
            {similarBlogs.map((item, index) => {
              return <BlogCard key={index} data={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDeatilsPage;
