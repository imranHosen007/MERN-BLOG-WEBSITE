import React from "react";
import useTrendingBlog from "../../Hooks/useTrendingBlog";
import { NavLink } from "react-router-dom";
import TrendingCard from "../../components/Home/TrendingCard";
import NoMessage from "../../components/NoMessage/NoMessage";
const homeMenu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Trending Blog",
    link: "/trending",
  },
];
const TrendingPage = () => {
  const { trendingBlog } = useTrendingBlog();

  return (
    <div>
      <div className="mt-5">
        {trendingBlog.length == 0 && (
          <NoMessage message={`Not Trending Blogs Found`} />
        )}
        {trendingBlog &&
          trendingBlog.map((data, index) => {
            return <TrendingCard data={data} key={index} />;
          })}
      </div>
    </div>
  );
};

export default TrendingPage;
