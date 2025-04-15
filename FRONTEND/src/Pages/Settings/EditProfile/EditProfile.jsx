import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { CiAt } from "react-icons/ci";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLink,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiOutlineCamera } from "react-icons/ai";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic";
import { Loader2 } from "lucide-react";
import { AuthContext } from "../../../Context/AuthProvider";
const EditProfile = () => {
  const { user, refetch } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const bioLimit = 200;
  const [character, setCharacter] = useState(bioLimit);
  let profileImgElement = useRef();
  const [updatedProfileImg, setUpdatedProfileImg] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [buttonLoading, setButtonLoading] = useState(false);

  // -----Handle-Image-Change-------
  const handleImageChange = e => {
    let img = e?.target?.files[0];

    profileImgElement.current.src = URL.createObjectURL(img);
    setUpdatedProfileImg(img);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        profileImgElement.current.src = reader.result;
        axiosPublic
          .put(
            "/user/change-avatar",
            { avatar: reader.result },
            { withCredentials: true }
          )
          .then(res => {
            if (res?.data?.success) {
              refetch();
              toast.success("Profile Image Change successfully!");
            }
          })
          .catch(error => toast.error(error.response.data.message));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // ---------onSubmitHandle-------
  const onSubmitHandle = data => {
    setButtonLoading(true);
    const updateData = {
      name: data.name,
      username: data.name,
      bio: data.bio,
      facebook: data.facebook,
      youtube: data.youtube,
      instagram: data.instagram,
      twitter: data.twitter,
      github: data.github,
      website: data.website,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Update Information",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(result => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/user/change-information`, updateData, {
            withCredentials: true,
          })
          .then(res => {
            if (res.data.success === true) {
              toast.success("Information Updated SuccesFull!");
              setButtonLoading(false);
              refetch();
            }
          })
          .catch(error => {
            setButtonLoading(false);
            return toast.error(error.response.data.message);
          });
      }
    });
  };
  // -------handeCharacter----
  const handleCharacterLimit = e => {
    if (e.target.value.length >= bioLimit) {
      return alert(`Bio Shoould not be more than  ${bioLimit}`);
    }
    setCharacter(bioLimit - e.target.value.length);
  };
  return (
    <div>
      <div>
        <h1 className="max-md:hidden">Edit Profile</h1>
        <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
          {/* --------Profile-Edit-Image-Side------ */}
          <div className="mb-5 max-lg:center lg:w-[20%] ">
            <div className="relative">
              <img
                ref={profileImgElement}
                src={user?.personal_info?.profile_img}
                alt=""
                className="w-[150px] h-[150px] bg-gray-100 rounded-full  object-cover   overflow-hidden "
              />
              <div className=" bg-gray-200 mt-2  absolute bottom-[10px] left-[30px] rounded-2xl py-1  cursor-pointer flex items-center justify-center">
                <input
                  onChange={handleImageChange}
                  type="file"
                  id="image"
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <AiOutlineCamera size={20} />
                </label>
              </div>
            </div>
          </div>
          {/* --------Profile-Edit-Content-Side------ */}
          <div className="w-full lg:w-[80%]">
            <form onSubmit={handleSubmit(onSubmitHandle)}>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="flex items-center gap-2 mb-2 text-base text-gray-800"
                  >
                    <span>
                      <FaUser size={15} />
                    </span>
                    Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="input-box "
                    defaultValue={user?.personal_info?.name}
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="flex items-center gap-2 mb-2 text-base text-gray-800"
                  >
                    <span>
                      <MdEmail size={15} />
                    </span>
                    Email
                  </label>
                  <input
                    type="email"
                    id="name"
                    className="input-box "
                    defaultValue={user?.personal_info?.email}
                    placeholder="Email"
                    disabled
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="username"
                  className="flex items-center gap-2 mb-2 text-base text-gray-800"
                >
                  <span>
                    <CiAt size={15} />
                  </span>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="input-box "
                  defaultValue={`@${user?.personal_info?.username} `}
                  placeholder="username"
                  {...register("username")}
                />
                <p className="text-secondary">
                  Username will use to search user and will be visible to all
                  users
                </p>
              </div>{" "}
              <div className="mt-4">
                <textarea
                  id="bio"
                  onKeyDown={handleCharacterLimit}
                  maxLength={bioLimit}
                  className="input-box resize-none !h-40 !lg:h-20 leading-7 "
                  defaultValue={user?.personal_info?.bio}
                  placeholder="Enter Your Bio"
                  {...register("bio")}
                ></textarea>
                <p className="mt-1 text-secondary">
                  {character} Character Left
                </p>
              </div>
              <p className="my-4 text-black">Add Your Social Hanldes Below</p>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5">
                <div>
                  <label
                    htmlFor="youtube"
                    className="flex items-center gap-2 mb-2 text-base text-gray-800"
                  >
                    <span>
                      <FaYoutube size={15} />
                    </span>
                    Youtube
                  </label>
                  <input
                    type="url"
                    id="youtube"
                    className="input-box "
                    defaultValue={user?.social_links?.youtube}
                    placeholder="https://"
                    {...register("youtube")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="ings"
                    className="flex items-center gap-2 mb-2 text-base text-gray-800"
                  >
                    <span>
                      <FaInstagram size={15} />
                    </span>
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="ings"
                    className="input-box "
                    defaultValue={user?.social_links?.instagram}
                    placeholder="https://"
                    {...register("instagram")}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 my-2">
                <div>
                  <label
                    htmlFor="facebook"
                    className="flex items-center gap-2 mb-2 text-base text-gray-800"
                  >
                    <span>
                      <FaFacebook size={15} />
                    </span>
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    className="input-box "
                    defaultValue={user?.social_links?.facebook}
                    placeholder="https://"
                    {...register("facebook")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="twitter"
                    className="flex items-center gap-2 mb-2 text-base text-gray-800"
                  >
                    <span>
                      <FaTwitter size={15} />
                    </span>
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    className="input-box "
                    defaultValue={user?.social_links?.twitter}
                    {...register("twitter")}
                  />
                </div>
              </div>{" "}
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 my-2">
                <div>
                  <label
                    htmlFor="github"
                    className="flex items-center gap-2 mb-2 text-base text-gray-800"
                  >
                    <span>
                      <FaGithub size={15} />
                    </span>
                    Github
                  </label>
                  <input
                    type="url"
                    id="github"
                    className="input-box "
                    defaultValue={user?.social_links?.github}
                    placeholder="https://"
                    {...register("github")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="flex items-center gap-2 mb-2 text-base text-gray-800"
                  >
                    <span>
                      <FaLink size={15} />
                    </span>
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    className="input-box "
                    defaultValue={user?.social_links?.website}
                    placeholder="https://"
                    {...register("website")}
                  />
                </div>
              </div>
              {buttonLoading ? (
                <button
                  type="submit"
                  className="px-10 mt-2 py-3 text-xl text-white capitalize bg-black rounded-full whitespace-nowrap hover:bg-opacity-80 flex items-center justify-center"
                >
                  Please wait
                  <span>
                    <Loader2 className="w-4 h-4 ml-4 animate-spin" />
                  </span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-10 mt-2 py-3 text-xl text-white capitalize bg-black rounded-full whitespace-nowrap hover:bg-opacity-80"
                >
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
