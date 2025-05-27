import React from "react";
import Banner from "./Banner";
import RecentBlogs from "./RecentBlogs";
import Newsletter from "../../components/NewsLetter";
import TrendingTopics from "./TrendingTopics";

const Home = () => {
  return (
    <div>
      {/* banner */}
      <Banner />
      <RecentBlogs />
      <Newsletter />
      <TrendingTopics />
    </div>
  );
};

export default Home;
