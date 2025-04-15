import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiLock, CiUnlock } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline, IoKey } from "react-icons/io5";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
const ChangePassword = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const axiosPublic = useAxiosPublic();
  const handleSubmit = e => {
    setButtonLoading(true);
    e.preventDefault();
    if (
      currentPassword.length == 0 ||
      newPassword.length == 0 ||
      confirmPassword.length == 0
    ) {
      return toast.error(`Please Fill All Filed`);
    }
    if (newPassword !== confirmPassword) {
      return toast.error(`New Password doesn't matched with each other!`);
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Change Password",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(result => {
      if (result.isConfirmed) {
        axiosPublic
          .put(
            `/user/change-password`,
            { currentPassword, confirmPassword },
            { withCredentials: true }
          )
          .then(res => {
            if (res.data.success === true) {
              toast.success(res?.data?.message);
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setButtonLoading(false);
              // window.location.reload(true);
            }
          })
          .catch(error => {
            setButtonLoading(false);
            return toast.error(error?.response?.data?.message);
          });
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-xl">Change Password</h1>
        <div className="w-full md:max-w-[40%] py-10">
          <div className="flex items-center max-w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md outline-blue-600 focus:bg-transparent">
            <span className="w-[6%]">
              <CiUnlock />
            </span>
            <input
              id="password"
              name="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              type={visible ? "text" : "password"}
              required
              className="w-[88%] px-4 outline:none focus:outline-none  py-3 text-sm text-gray-800 bg-gray-200   rounded-md "
              placeholder="Enter password"
            />
            <div className="w-[6%] pr-4">
              {" "}
              {visible ? (
                <IoEyeOffOutline
                  size={18}
                  className=""
                  onClick={() => setVisible(!visible)}
                />
              ) : (
                <IoEyeOutline
                  size={18}
                  className=""
                  onClick={() => setVisible(!visible)}
                />
              )}
            </div>
          </div>{" "}
          <div className="flex items-center max-w-full my-6 bg-gray-200 border border-gray-300 rounded-md tex6t-gray-800 outline-blue-600 focus:bg-transparent">
            <span className="w-[6%]">
              <CiLock />
            </span>
            <input
              id="password"
              name="password"
              type={visible2 ? "text" : "password"}
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-[88%] px-4 outline:none focus:outline-none  py-3 text-sm text-gray-800 bg-gray-200   rounded-md "
              placeholder="Enter New password"
            />
            <div className="w-[6%] pr-4">
              {" "}
              {visible2 ? (
                <IoEyeOffOutline
                  size={18}
                  className=""
                  onClick={() => setVisible2(!visible2)}
                />
              ) : (
                <IoEyeOutline
                  size={18}
                  className=""
                  onClick={() => setVisible2(!visible2)}
                />
              )}
            </div>
          </div>{" "}
          <div className="flex items-center max-w-full my-6 bg-gray-200 border border-gray-300 rounded-md tex6t-gray-800 outline-blue-600 focus:bg-transparent">
            <span className="w-[6%]">
              <CiLock />
            </span>
            <input
              id="password"
              name="password"
              type={visible3 ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-[88%] px-4 outline:none focus:outline-none  py-3 text-sm text-gray-800 bg-gray-200   rounded-md "
              placeholder="Enter Confirm password"
            />
            <div className="w-[6%] pr-4">
              {" "}
              {visible3 ? (
                <IoEyeOffOutline
                  size={18}
                  className=""
                  onClick={() => setVisible3(!visible3)}
                />
              ) : (
                <IoEyeOutline
                  size={18}
                  className=""
                  onClick={() => setVisible3(!visible3)}
                />
              )}
            </div>
          </div>
          <div className="">
            {buttonLoading ? (
              <button
                type="button"
                className="flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-xl hover:bg-blue-700 focus:outline-none "
              >
                Please wait
                <span>
                  <Loader2 className="w-4 h-4 ml-4 animate-spin" />
                </span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-xl hover:bg-blue-700 focus:outline-none "
              >
                Change Password
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
