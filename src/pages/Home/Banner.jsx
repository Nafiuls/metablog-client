import React from "react";
import { motion } from "framer-motion";
import bg from "../../assets/bgblog.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Banner = () => {
  const title = " Write Freely. Read Endlessly.";
  const words = title.split(" ");
  console.log(words);
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
        {words.map((word, index) => (
          <motion.h1
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0)", opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            key={index}
            className="text-3xl sm:text-4xl font-bold text-white text-center inline-block mr-3"
          >
            {word}
          </motion.h1>
        ))}
        <h1 className="text-white text-base sm:text-lg max-w-xl mt-4 mx-auto text-center mb-8">
          Welcome to Meta Blog — where your stories inspire and your curiosity
          thrives.
        </h1>
        <div className="flex items-center justify-center gap-5 mt-10">
          <Link to={"/allBlogs"}>
            <button className="flex items-center justify-center py-2 px-7 font-semibold mx-auto border hover:border-white transition cursor-pointer rounded-full gap-3 bg-white text-black hover:bg-transparent hover:text-white">
              Read Blogs <FaArrowRight />
            </button>
          </Link>
          <Link to={"/addBlogs"}>
            <button className="flex items-center justify-center py-2 px-7 font-semibold mx-auto border hover:border-white transition cursor-pointer rounded-full gap-3 bg-trasnparent text-white hover:bg-white hover:text-black">
              Post A Blog <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
