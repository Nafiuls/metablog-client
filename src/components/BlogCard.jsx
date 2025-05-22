import React from "react";
import { FiInfo, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import UseAuth from "../utils/hooks/UseAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const BlogCard = ({ blog }) => {
  const { user } = UseAuth();
  const {
    _id,
    title,
    image,
    category,
    shortDescription,
    longDescription,
    author,
  } = blog || {};

  // add wislist to database
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (wishlistData) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/add-wishlist`,
        wishlistData
      );
      return data;
    },
    onSuccess: () => toast.success("Added to wishlist!"),
    onError: () => toast.error("Already in wishlist!"),
  });

  // add to wishlist
  const handleWishlist = async () => {
    const wishlistData = {
      id: _id,
      title,
      image,
      category,
      shortDescription,
      longDescription,
      author,
      email: user?.email,
    };
    await mutateAsync(wishlistData);
  };

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
          <Link to={`/blog/${_id}`}>
            <button className="flex items-center gap-2 uppercase bg-black py-2 px-6 text-white rounded-full text-base cursor-pointer transition border hover:bg-white hover:text-black hover:border-black">
              <FiInfo size={20} />
              Details{" "}
            </button>
          </Link>
          <button
            onClick={handleWishlist}
            className="flex items-center gap-1 uppercase bg-white border rounded-full py-2 px-6 text-black cursor-pointer hover:border-white hover:bg-black hover:text-white transition "
          >
            <FiPlus size={20} />
            {isPending ? "Adding..." : "Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
