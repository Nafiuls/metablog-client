import React from "react";
import Header from "../../utils/Header";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "../../components/BlogCard";

const RecentBlogs = () => {
  const fetchBlogs = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/recent-blogs`
    );
    return res.data;
  };
  // fetch using query
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["recentBlogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="max-w-6xl px-4 mt-20 mx-auto">
        <Header
          heading={"Latest from the Blog"}
          subheading={
            "Stay updated with our most recent posts, covering fresh insights, tips, and trends in web development."
          }
        />
        {/* grid container maping */}
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
          {blogs?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
