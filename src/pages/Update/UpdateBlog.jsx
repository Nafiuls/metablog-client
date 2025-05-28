import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { BiSend, BiText } from "react-icons/bi";
import { FiEdit3, FiImage } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { TbArticle } from "react-icons/tb";
import { useParams } from "react-router-dom";
import Header from "../../utils/Header";
import toast from "react-hot-toast";
import UseAuth from "../../utils/hooks/UseAuth";
import useAxiosSecure from "../../utils/hooks/UseAxiosSecure";
import Title from "../../utils/Title";
import Loading from "../../utils/Loading";

const UpdateBlog = () => {
  const { user } = UseAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
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
  const queryClient = useQueryClient();
  const fetchBlogData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/single-blog/${id}`
    );
    return data;
  };
  // fetching single blogdata
  const {
    data: singleBlog,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogData", id],
    queryFn: fetchBlogData,
  });

  //   update blog data
  const updateBlogData = async (blogData) => {
    const { data } = await axiosSecure.patch(
      `/update-blog/${id}/${user?.email}`,
      blogData
    );
    refetch();
    return data;
  };

  const { mutateAsync: updateBlog, isPending } = useMutation({
    mutationFn: updateBlogData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singleBlog"] });
      toast.success("Blog Updated Successfully!");
    },
    onError: () => toast.error("Something Went Wrong!"),
  });

  //   handle update function
  const handleUpdata = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.files[0];
    if (!image) {
      toast.error("Please choose an image to update the blog post.");
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
    const shortDescription = form.shortdes.value;
    const longDescription = form.longdes.value;

    const blogData = {
      title,
      image: imageUrl,
      category,
      shortDescription,
      longDescription,
    };
    await updateBlog(blogData);
    form.reset();
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col py-10 justify-center items-center">
      <Title title={"Update Blog"} />
      <Header
        heading={"Update Your Existing Blog Post"}
        subheading={
          "Update the details below and share your content with the MetaBlog community."
        }
      />
      <form
        className="w-full max-w-md bg-white flex flex-col gap-6 p-8 shadow-lg"
        onSubmit={handleUpdata}
      >
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Update A Blog
        </h2>
        {/* title */}
        <div className="flex items-center border-b border-gray-300 focus-within:border-black transition">
          <FiEdit3 size={20} className="text-gray-500" />
          <input
            defaultValue={singleBlog?.title}
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
            required
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
            defaultValue={singleBlog?.shortDescription}
            className="mt-2 w-full border-gray-300 border rounded-sm focus-within:border-black resize-none py-2 px-3  text-sm text-gray-700 placeholder-gray-400"
            name="shortdes"
            placeholder="write a short descreption"
          ></textarea>
        </div>
        {/* long description */}
        <div>
          <TbArticle size={20} />
          <textarea
            defaultValue={singleBlog?.longDescription}
            className="mt-2 w-full h-28 border-gray-300 border rounded-sm focus-within:border-black resize-none py-2 px-3  text-sm text-gray-700 placeholder-gray-400"
            name="longdes"
            placeholder="write a long descreption"
          ></textarea>
        </div>
        <button className="flex gap-4 items-center justify-center bg-black text-white border py-2 w-full rounded-sm hover:bg-white hover:border-black hover:text-black cursor-pointer uppercase transition">
          {isPending ? "posting" : "update post"}
          <BiSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
