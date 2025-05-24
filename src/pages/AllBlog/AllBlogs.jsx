import React, { useEffect, useState } from "react";
import Header from "../../utils/Header";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BlogCard from "../../components/BlogCard";
import { MdCategory } from "react-icons/md";

const AllBlogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const fetchAllBlogs = async ({ queryKey }) => {
    const [_key, search, category] = queryKey;
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/blogs?${params.toString()}`
    );
    return data;
  };
  const { data: allBlogs = [], isLoading } = useQuery({
    queryKey: ["allBlogs", search, category],
    queryFn: fetchAllBlogs,
  });

  useEffect(() => {
    console.log(search);
    console.log(category);
  }, [search, category]);
  console.log("Fetching wiht :", { search, category });

  // filter by category

  if (isLoading) return <p>Loading..</p>;
  return (
    <div className="py-10 flex flex-col items-center">
      <Header
        heading={"The Blog Buffet 🍽️"}
        subheading={
          "A little bit of everything — tech tips, travel tales, foodie finds, and more. Pick your favorite flavor and start reading!"
        }
      />
      <div className="flex mb-10 flex-col lg:flex-row gap-5 justify-between items-center w-full max-w-6xl mx-auto">
        {/* search input */}
        <form
          className="flex items-center "
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(e.target.search.value.trim());
          }}
        >
          <input
            className="bg-transparent text-gray-600 rounded-md border border-b-gray-600 p-3"
            type="text"
            placeholder="Search Here 🔍"
            name="search"
          />
          <button
            type="submit"
            className="ml-2 px-5 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Search
          </button>
        </form>
        <div>
          <div className=" flex items-center border p-2 sm:w-full rounded-md border-gray-300 focus-within:border-black transition">
            <MdCategory size={20} className="text-gray-500" />
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full py-2 px-3 outline-none text-sm text-gray-700 placeholder-gray-400"
            >
              <option value=""> Choose a category </option>
              <option value="tech">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="travel">Travel</option>
              <option value="education">Education</option>
              <option value="food">Food</option>
              <option value="gaming">Gaming</option>
            </select>
          </div>
        </div>
      </div>
      {/* all blogs card container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 max-w-6xl mx-auto">
        {allBlogs?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
