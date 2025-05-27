import React from "react";
import Banner from "./Banner";
import RecentBlogs from "./RecentBlogs";
import Newsletter from "../../components/NewsLetter";
import TrendingTopics from "./TrendingTopics";
import TopPicks from "./TopPicks";
import { Helmet } from "react-helmet";
import Title from "../../utils/Title";

const Home = () => {
  return (
    <div>
      <Title title={"Home"} />
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
