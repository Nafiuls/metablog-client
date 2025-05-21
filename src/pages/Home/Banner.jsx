import React from "react";
import bg from "../../assets/bgblog.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        height: "700px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="flex items-center justify-center px-4 md:px-8"
    >
      <div className="max-w-4xl text-center text-white bg-opacity-50 p-6 rounded-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
          "Welcome to MetaBlog — Your Space to Explore & Share Ideas"
        </h1>
        <h1 className="text-white text-base sm:text-lg max-w-xl mt-4 mx-auto text-center mb-8">
          "Dive into the latest trends, stories, and insights from creators
          around the world."
        </h1>
        <Link to={"/allBlogs"}>
          <button className="flex items-center justify-center py-2 px-7 font-semibold mx-auto border hover:border-white transition cursor-pointer rounded-full gap-3 bg-white text-black hover:bg-transparent hover:text-white">
            Explore <FaArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
