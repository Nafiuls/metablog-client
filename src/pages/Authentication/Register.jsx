import React, { useState } from "react";
import Header from "../../utils/Header";
import {
  MdOutlinePersonOutline,
  MdOutlineEmail,
  MdOutlinePhotoCamera,
  MdOutlinePassword,
} from "react-icons/md";

import { AiOutlineGooglePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import UseAuth from "../../utils/hooks/UseAuth";
import toast from "react-hot-toast";

const Register = () => {
  const { handleRegister, handleGoogle, manageProfile } = UseAuth();
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.photoUrl.value;
    const password = form.password.value;
    if (password.length < 6) {
      return setError("password must contain 6 character");
    }
    if (!/[A-Z]/.test(password)) {
      return setError("password must contain 1 upper character");
    }
    if (!/[a-z]/.test(password)) {
      return setError("password must contain 1 lower character");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return setError("password must contain 1 special character");
    }
    if (!/\d/.test(password)) {
      return setError("password must contain 1 number");
    }
    setError("");
    form.reset();
    handleRegister(email, password)
      .then(() => {
        manageProfile(name, image);
        toast.success("Registered Successfully!");
      })
      .then(() => toast.error("Something wen wrong!"));
  };

  //   handle google
  const handleSocial = () => {
    handleGoogle();
  };
  return (
    <div className="pt-6 flex  flex-col justify-center items-center">
      <Header
        heading={"Welcome to MetaBlogs"}
        subheading={
          "Register to share your voice and connect with a like-minded community."
        }
      />
      <form
        className="w-full lg:w-md shadow-2xl flex flex-col gap-6 p-5"
        onSubmit={handleSubmit}
      >
        <Header heading={"Register"} />
        <div className="w-full border-b flex items-center">
          <MdOutlinePersonOutline size={20} />
          <input
            className="outline-none w-full py-2 px-3  text-gray-600 "
            type="text"
            name="name"
            placeholder="Your name"
          />
        </div>
        <div className="w-full border-b flex items-center">
          <MdOutlineEmail size={20} />
          <input
            className="outline-none w-full py-2 px-3  text-gray-600 "
            type="email"
            name="email"
            placeholder="Your Email"
          />
        </div>
        <div className="w-full border-b flex items-center">
          <MdOutlinePhotoCamera size={20} />
          <input
            className="outline-none w-full py-2 px-3  text-gray-600 "
            type="text"
            name="photoUrl"
            placeholder="Your Photo url"
          />
        </div>
        <div className="w-full border-b flex items-center">
          <MdOutlinePassword size={20} />
          <input
            className="outline-none w-full py-2 px-3  text-gray-600 "
            type="password"
            name="password"
            placeholder="Type Your Password "
          />
        </div>
        {error && (
          <p className="text-center capitalize text-red-400 text-sm">{error}</p>
        )}
        <div className="flex flex-col gap-3">
          <div className="w-full ">
            <button className="bg-black w-full uppercase  text-white py-3 cursor-pointer hover:border hover:bg-transparent hover:text-black transition-all">
              Register
            </button>
          </div>
          <hr />
          <div className="w-full ">
            <button
              onClick={handleSocial}
              className="flex items-center justify-center gap-3 bg-black w-full uppercase text-white py-3 cursor-pointer hover:border hover:bg-transparent hover:text-black transition-all"
            >
              <AiOutlineGooglePlus size={30} />
              <span>sign up with google</span>
            </button>
          </div>
        </div>
        <p className="capitalize text-sm">
          contain an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
