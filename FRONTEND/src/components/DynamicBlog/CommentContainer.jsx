import React, { useContext, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { Loader2 } from "lucide-react";
import { AuthContext } from "../../Context/AuthProvider";
const CommentContainer = ({
  commnetWrapper,
  setCommentWrapper,
  blog,
  setBlog,
}) => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [comment, setComment] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [postAllComment, setPostAllComment] = useState("");
  const [isReply, setIsReply] = useState(null);
  const [showComment, setShowComment] = useState(false);

  const handleComment = com_id => {
    setButtonLoading(true);
    if (!user) {
      toast.error(`Please Login First`);
      setButtonLoading(false);
    } else if (comment.length === 0) {
      toast.error(`Write Something to Leave a Commet......`);
      setButtonLoading(false);
    } else {
      axiosPublic
        .post(
          `/comment/add-comment`,
          {
            blogId: blog?._id,
            comment,
            blogAuthor: blog?.author,
            replyingTo: com_id,
          },
          { withCredentials: true }
        )
        .then(res => {
          setButtonLoading(false);
          toast.success(res?.data?.message);
          setPostAllComment([res?.data?.newComment, ...postAllComment]);
          setComment("");
        })
        .catch(error => {
          toast.error(error?.response?.data?.message);
          setButtonLoading(false);
        });
    }
  };

  // ------Handle-Reply-Click-------
  // const handleReplyClick = comId => {
  //   if (!user) {
  //     toast.error(`Please Login First`);
  //   }
  //   if (comId === isReply) {
  //     setIsReply(null);
  //   } else {
  //     setIsReply(comId);
  //   }
  // };

  // -----Handle-Comment-Delete-------
  const handleCommentDelete = comId => {
    if (!user) {
      toast.error(`Please Login First`);
    }

    axiosPublic
      .delete(`/comment/${comId}`, { withCredentials: true })
      .then(res => {
        if (res?.data?.success) {
          toast.success(`Comment Delete SuccesFull`);
          const filteredCom = postAllComment.filter(com => {
            return com._id !== comId;
          });
          setPostAllComment(filteredCom);
        }
      })
      .catch(error => {
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    if (blog) {
      axiosPublic
        .post(`/comment/${blog?._id}`, { withCredentials: true })
        .then(res => {
          setPostAllComment(res?.data?.allComment);
        })
        .catch(error => {
          toast.error(error?.response?.data?.message);
        });
    }
  }, [blog, handleComment, handleCommentDelete]);
  return (
    <div
      className={`w-full duration-700 fixed sm:top-0  sm:right-0 min-w-[350px] sm:w-[30%]  shadow-2xl z-50  h-screen p-8 bg-white overflow-y-auto overflow-x-hidden ${
        commnetWrapper ? "top-0 sm:right-0" : "top-[100%] sm:right-[-100%]"
      }`}
    >
      <div className="relative">
        <h1 className="text-xl font-medium">Comment</h1>
        <p className="text-lg mt-2 w-[70%] line-clamp-2 text-secondary">
          {blog?.title}
        </p>
        <button
          onClick={() => setCommentWrapper(false)}
          className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full"
        >
          <FaXmark size={20} />
        </button>
      </div>
      <hr className="my-8 w-[120%] -ml-10 border-gray-100" />
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Leave Comment...... "
        className="input-box pl-5 h-[150px] resize-none overflow-auto placeholder:text-secondary"
      ></textarea>
      {buttonLoading ? (
        <button
          type="button"
          className="flex items-center justify-center btn mt-5 !px-8 !py-3 "
        >
          Please wait
          <span>
            <Loader2 className="w-4 h-4 ml-4 animate-spin" />
          </span>
        </button>
      ) : (
        <button
          onClick={() => handleComment()}
          className="btn mt-5 !px-8 !py-3"
        >
          comment
        </button>
      )}
      <p className="pl-6 mt-10 text-xl">Post All Comment</p>
      {postAllComment && postAllComment.length !== 0
        ? postAllComment.map((com, index) => {
            return (
              <div
                className="w-full"
                style={{ paddingLeft: `${index + 2 * 4}px` }}
              >
                <div className="p-6 my-5 border border-gray-100 rounded-md">
                  <div className="flex items-center gap-3 mb-8">
                    <img
                      className="w-6 h-6 rounded-full"
                      src={com?.commented_by?.personal_info?.profile_img}
                      alt=""
                    />
                    <p className="line-clamp-1">
                      {com?.commented_by?.personal_info?.name} @
                      {com?.commented_by?.personal_info?.username}
                    </p>
                    <p>27 sep</p>
                  </div>
                  <p className="ml-3 text-xl">{com?.comment}</p>
                  <div className="flex items-center gap-5 mt-5">
                    {user?._id == com?.commented_by._id && (
                      <button
                        className="underline"
                        onClick={() => handleCommentDelete(com?._id)}
                      >
                        Delete Comment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        : "No Message"}
    </div>
  );
};

export default CommentContainer;
