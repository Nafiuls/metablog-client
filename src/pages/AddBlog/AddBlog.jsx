import React, { useState } from "react";
import Header from "../../utils/Header";
import { MdCategory } from "react-icons/md";
import { FiEdit3, FiImage } from "react-icons/fi";
import { BiText, BiSend } from "react-icons/bi";
import { TbArticle } from "react-icons/tb";
import UseAuth from "../../utils/hooks/UseAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const AddBlog = () => {
  const { user } = UseAuth();
  const [category, setCategory] = useState("");
  // blog post mutation
  const { mutateAsync: createBlog, isPending } = useMutation({
    mutationFn: async (blogData) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/post-blog`,
        blogData
      );
      return data;
    },
    onSuccess: () => toast.success("Blog Posted Successfully!"),
    onError: () => toast.error("Something Went Wrong!"),
  });
  // handle blog
  const handleSubmit = async (e) => {
    // post a blog

    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const shortDescription = form.shortdes.value;
    const longDescription = form.longdes.value;
    const blogData = {
      title,
      image,
      category,
      shortDescription,
      longDescription,
      user: {
        authorEmail: user?.email,
        authorName: user?.displayName,
      },
    };
    await createBlog(blogData);
    form.reset();
    setCategory("");
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <Header
        heading={"Create a New Blog Post"}
        subheading={
          "Fill in the details below and share your content with the MetaBlog community."
        }
      />
      <form
        className="w-full max-w-md bg-white flex flex-col gap-6 p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Post A Blog
        </h2>
        {/* title */}
        <div className="flex items-center border-b border-gray-300 focus-within:border-black transition">
          <FiEdit3 size={20} className="text-gray-500" />
          <input
            className="w-full py-2 px-3 outline-none text-sm text-gray-700 placeholder-gray-400"
            type="text"
            name="title"
            placeholder="Blog Title"
            required
          />
        </div>
        {/* image */}
        <div className="flex items-center border-b border-gray-300 focus-within:border-black transition">
          <FiImage size={20} className="text-gray-500" />
          <input
            className="w-full py-2 px-3 outline-none text-sm text-gray-700 placeholder-gray-400"
            type="text"
            name="image"
            placeholder="Image Url"
            required
          />
        </div>
        {/* category */}
        <div className=" flex items-center border-b border-gray-300 focus-within:border-black transition">
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
        {/* short description */}
        <div>
          <BiText size={20} />
          <textarea
            className="mt-2 w-full border-gray-300 border rounded-sm focus-within:border-black resize-none py-2 px-3  text-sm text-gray-700 placeholder-gray-400"
            name="shortdes"
            placeholder="write a short descreption"
          ></textarea>
        </div>
        {/* long description */}
        <div>
          <TbArticle size={20} />
          <textarea
            className="mt-2 w-full h-28 border-gray-300 border rounded-sm focus-within:border-black resize-none py-2 px-3  text-sm text-gray-700 placeholder-gray-400"
            name="longdes"
            placeholder="write a long descreption"
          ></textarea>
        </div>
        <button className="flex gap-4 items-center justify-center bg-black text-white border py-2 w-full rounded-sm hover:bg-white hover:border-black hover:text-black cursor-pointer uppercase transition">
          {isPending ? "posting" : "creat post"}
          <BiSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
