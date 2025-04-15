import React, { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic";
import NotifactionCard from "./NotifactionCard";
import { AuthContext } from "../../../Context/AuthProvider";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";
import NoMessage from "../../../components/NoMessage/NoMessage";

const Notifaction = () => {
  const axiosPublic = useAxiosPublic();
  const [notifaction, setNotifaction] = useState(null);
  const [filter, setFilter] = useState("all");
  const filterButton = ["all", "like", "comment"];
  const [loading, setLoading] = useState(true);
  const { setNewNotifaction } = useContext(AuthContext);
  const handleFilter = btn => {
    setFilter(btn);
    setNotifaction(null);
  };

  // -----Handle-Delete------
  const handleDelete = id => {
    axiosPublic
      .delete(`/notifaction/${id}`, { withCredentials: true })
      .then(res => {
        if (res?.data?.success) {
          const filterNotifaction =
            notifaction.length &&
            notifaction?.filter(not => {
              return not._id !== id;
            });
          setNotifaction(filterNotifaction);
          toast.success(res?.data?.message);
        }
      })
      .catch(error => {
        toast.error(error?.response?.data?.message);
      });
  };
  useEffect(() => {
    axiosPublic
      .post(`/notifaction`, { filter }, { withCredentials: true })
      .then(res => {
        if (res?.data?.success) {
          setLoading(false);
          setNotifaction(res?.data);
          setNewNotifaction(true);
        }
      })
      .catch(error => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  }, [filter]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <h1 className="max-md:hidden">Recent Notifactions</h1>

      <div className="flex gap-6 my-8">
        {filterButton.map((btn, index) => {
          return (
            <button
              onClick={() => handleFilter(btn)}
              key={index}
              className={`btn duration-200 !py-2 !bg-gray-100 !text-black ${
                btn == filter
                  ? "!bg-red !text-white"
                  : "!bg-gray-100 !text-black"
              }`}
            >
              {btn}
            </button>
          );
        })}
      </div>
      {notifaction == null ? (
        <h1>Loading</h1>
      ) : (
        <div>
          {notifaction.allNotifaction.length !== 0 ? (
            <div>
              {" "}
              {notifaction.allNotifaction.map((not, index) => {
                return (
                  <NotifactionCard
                    key={index}
                    data={not}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </div>
          ) : (
            <NoMessage message={`Noting To Avalivle`} />
          )}
        </div>
      )}
    </div>
  );
};

export default Notifaction;
