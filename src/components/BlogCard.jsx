import React from "react";
import { FiInfo, FiPlus } from "react-icons/fi";

const BlogCard = ({ blog }) => {
  const { title, image, category, shortDescription } = blog || {};
  return (
    <div className="bg-white shadow-sm rounded-md overflow-hidden flex flex-col h-full">
      <figure>
        <img
          src={image}
          className="h-[200px] w-full object-cover"
          alt="Blog cover"
        />
      </figure>

      {/* Content container: flex layout to push badges to bottom */}
      <div className="flex flex-col justify-between flex-1 p-4">
        {/* Title & category */}
        <div className="flex items-start flex-1  justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <div className="bg-black text-white text-xs px-3 py-1 rounded-full">
            {category}
          </div>
        </div>

        {/* Short description */}
        <p className="text-sm text-gray-600 flex-1">{shortDescription}</p>

        {/* Bottom badges */}
        <div className="flex gap-1 pt-4 mt-4 items-center">
          <button className="flex items-center gap-2 uppercase bg-black py-2 px-6 text-white rounded-full text-base cursor-pointer transition border hover:bg-white hover:text-black hover:border-black">
            <FiInfo size={20} />
            Details{" "}
          </button>
          <button className="flex items-center gap-1 uppercase bg-white border rounded-full py-2 px-6 text-black cursor-pointer hover:border-white hover:bg-black hover:text-white transition ">
            <FiPlus size={20} />
            Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
