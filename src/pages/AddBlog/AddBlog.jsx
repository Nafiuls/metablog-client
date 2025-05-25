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
  const [fileName, setFileName] = useState("No File Chosen");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("No File Chosen");
    }
  };
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
    const image = form.image.files[0];
    const shortDescription = form.shortdes.value;
    const longDescription = form.longdes.value;
    if (!image) {
      toast.error("Please select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
      formData
    );
    const imageUrl = res.data.data.url;
    const blogData = {
      title,
      image: imageUrl,
      category,
      shortDescription,
      longDescription,
      author: {
        authorEmail: user?.email,
        authorName: user?.displayName,
      },
    };
    await createBlog(blogData);
    form.reset();
    setCategory("");
  };
  return (
    <div className="py-10 flex flex-col justify-center items-center">
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
        <div className="flex items-center gap-3">
          <FiImage size={20} className="text-gray-500" />
          <label
            htmlFor="image"
            className="bg-black text-white text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-gray-800 transition"
          >
            Choose Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="text-sm text-gray-600 truncate max-w-[200px]">
            {fileName}
          </span>
        </div>
        {/* category */}
        <div className=" flex items-center border-b border-gray-300 focus-within:border-black transition">
          <MdCategory size={20} className="text-gray-500" />
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full py-2 px-3 outline-none text-sm text-gray-700 placeholder-gray-400"
            required
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
            required
            className="mt-2 w-full border-gray-300 border rounded-sm focus-within:border-black resize-none py-2 px-3  text-sm text-gray-700 placeholder-gray-400"
            name="shortdes"
            placeholder="write a short descreption"
          ></textarea>
        </div>
        {/* long description */}
        <div>
          <TbArticle size={20} />
          <textarea
            required
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
