import React from "react";
import Banner from "./Banner";
import RecentBlogs from "./RecentBlogs";
import Newsletter from "../../components/NewsLetter";
import TrendingTopics from "./TrendingTopics";
import TopPicks from "./TopPicks";

const Home = () => {
  return (
    <div>
      {/* banner */}
      <Banner />
      <RecentBlogs />
      <Newsletter />
      <TrendingTopics />
      <TopPicks />
    </div>
  );
};

export default Home;
