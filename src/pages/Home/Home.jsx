import React from "react";
import Banner from "./Banner";
import RecentBlogs from "./RecentBlogs";
import Newsletter from "../../components/NewsLetter";

const Home = () => {
  return (
    <div>
      {/* banner */}
      <Banner />
      <RecentBlogs />
      <Newsletter />
    </div>
  );
};

export default Home;
