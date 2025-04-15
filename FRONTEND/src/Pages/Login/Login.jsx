import React, { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline, IoKey } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, Loader2Icon } from "lucide-react";
import { AuthContext } from "../../Context/AuthProvider";
import { googleLogin } from "../../Config/firebase.config";
const Login = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [password, setPassword] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { refetch } = useContext(AuthContext);

  // -----Handle-Submit------
  const handleSubmit = e => {
    e.preventDefault();
    setButtonLoading(true);
    axiosPublic
      .post(`/user/login`, { email, password }, { withCredentials: true })
      .then(res => {
        if (res?.data?.success) {
          toast.success(`Login SuccesFull!`);
          setButtonLoading(false);
          refetch();
          setEmail("");
          setPassword("");
          navigate("/");
        }
      })
      .catch(error => {
        toast.error(error?.response?.data?.message);
        setButtonLoading(false);
      });
  };

  // ---Google-Login---
  const handleGoogleLogin = () => {
    googleLogin()
      .then(currentUser => {
        if (currentUser) {
          const userInfo = {
            name: currentUser.user?.displayName,
            email: currentUser?.user?.email,
            password: currentUser?.user?.email,
            profile_img: currentUser?.user?.photoURL,
          };
          if (currentUser.user.displayName && currentUser.user.email) {
            axiosPublic
              .post(`/user/google`, userInfo, { withCredentials: true })
              .then(res => {
                if (res?.data?.success) {
                  toast.success(`Account Created SuccesFull!`);

                  refetch();

                  navigate("/");
                }
              })
              .catch(error => {
                toast.error(error?.response?.data?.message);
              });
          }
        }
      })
      .catch(error => toast.error(error?.response?.data?.message));
  };
  return (
    <div className="flex items-center justify-center section h-cover">
      <Toaster />
      <form
        className="w-[80%] max-w-[400px]"
        aria-required
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl text-center capitalize mb-10">Welcome Back</h1>

        <div>
          <label
            htmlFor="email"
            className="text-gray-800 flex items-center gap-2 mb-2 text-base"
          >
            <span>
              <MdEmail size={18} />
            </span>
            Email
          </label>
          <input
            name="username"
            id="email"
            type="text"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-box"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="mt-4">
          <label
            className="text-gray-800 text-sm mb-2 flex items-center gap-2"
            htmlFor="password"
          >
            <span>
              {" "}
              <IoKey size={18} />
            </span>
            Password
          </label>
          <div className="relative flex items-center">
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="password"
              name="password"
              type={visible ? "text" : "password"}
              required
              className="input-box"
              placeholder="Enter password"
            />
            {visible ? (
              <IoEyeOffOutline
                size={18}
                className="absolute right-[2%]"
                onClick={() => setVisible(!visible)}
              />
            ) : (
              <IoEyeOutline
                size={18}
                className="absolute right-[2%]"
                onClick={() => setVisible(!visible)}
              />
            )}
          </div>
        </div>

        <div className="mt-8">
          {buttonLoading ? (
            <button
              type="button"
              className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none flex items-center justify-center "
            >
              Please wait{" "}
              <span>
                <Loader2 className="h-4 w-4 ml-4 animate-spin" />
              </span>
            </button>
          ) : (
            <button
              type="submit"
              className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none "
            >
              Log in
            </button>
          )}
        </div>
        <div className="w-full mt-4">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="py-2.5 px-4 w-full text-sm font-semibold rounded-md text-blue-500 bg-blue-100 hover:bg-blue-200 focus:outline-none "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              className="inline mr-4"
              viewBox="0 0 512 512"
            >
              <path
                fill="#fbbd00"
                d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                data-original="#fbbd00"
              />
              <path
                fill="#0f9d58"
                d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                data-original="#0f9d58"
              />
              <path
                fill="#31aa52"
                d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                data-original="#31aa52"
              />
              <path
                fill="#3c79e6"
                d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                data-original="#3c79e6"
              />
              <path
                fill="#cf2d48"
                d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                data-original="#cf2d48"
              />
              <path
                fill="#eb4132"
                d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                data-original="#eb4132"
              />
            </svg>
            Login with Google
          </button>
        </div>
        <p className="text-base mt-8 text-center text-gray-800">
          Don't have an account?
          <Link
            to={`/singup`}
            className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
          >
            Join Us Today
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
