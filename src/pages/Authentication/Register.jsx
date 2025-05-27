import React, { useState } from "react";
import Header from "../../utils/Header";
import {
  MdOutlinePersonOutline,
  MdOutlineEmail,
  MdOutlinePhotoCamera,
  MdOutlinePassword,
} from "react-icons/md";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../utils/hooks/UseAuth";
import toast from "react-hot-toast";
import Title from "../../utils/Title";

const Register = () => {
  const { handleRegister, handleGoogle, manageProfile } = UseAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.photoUrl.value;
    const password = form.password.value;

    // Password validations
    if (password.length < 6)
      return setError("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password))
      return setError("Password must include an uppercase letter");
    if (!/[a-z]/.test(password))
      return setError("Password must include a lowercase letter");
    if (!/[^A-Za-z0-9]/.test(password))
      return setError("Password must include a special character");
    if (!/\d/.test(password)) return setError("Password must include a number");

    setError("");
    form.reset();

    handleRegister(email, password)
      .then(() => {
        manageProfile(name, image);
        toast.success("Registered successfully!");
        navigate("/");
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  // handle google

  const handleSocial = () => {
    handleGoogle()
      .then(() => {
        toast.success("Registered with Google!");
        navigate("/");
      })
      .catch(() => toast.error("Google registration failed!"));
  };

  return (
    <div className=" px-4 flex flex-col items-center justify-center bg-gray-50">
      <Title title={"Register"} />
      <Header
        heading="Welcome to MetaBlogs"
        subheading="Register to share your voice and connect with a like-minded community."
      />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Create Your Account
        </h2>

        {/* Name */}
        <div className="flex items-center border-b border-gray-300 focus-within:border-black transition">
          <MdOutlinePersonOutline size={20} className="text-gray-500" />
          <input
            className="w-full py-2 px-3 outline-none text-sm text-gray-700 placeholder-gray-400"
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center border-b border-gray-300 focus-within:border-black transition">
          <MdOutlineEmail size={20} className="text-gray-500" />
          <input
            className="w-full py-2 px-3 outline-none text-sm text-gray-700 placeholder-gray-400"
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />
        </div>

        {/* Photo URL */}
        <div className="flex items-center border-b border-gray-300 focus-within:border-black transition">
          <MdOutlinePhotoCamera size={20} className="text-gray-500" />
          <input
            className="w-full py-2 px-3 outline-none text-sm text-gray-700 placeholder-gray-400"
            type="text"
            name="photoUrl"
            placeholder="Your Photo URL"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border-b border-gray-300 focus-within:border-black transition">
          <MdOutlinePassword size={20} className="text-gray-500" />
          <input
            className="w-full py-2 px-3 outline-none text-sm text-gray-700 placeholder-gray-400"
            type="password"
            name="password"
            placeholder="Create a Password"
            required
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center -mt-2">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-black cursor-pointer text-white uppercase py-3 rounded-md hover:bg-white hover:text-black border border-black transition"
        >
          Register
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleSocial}
          className="flex items-center  justify-center cursor-pointer gap-3 bg-black text-white py-3 rounded-md hover:bg-red-600 transition"
        >
          <AiOutlineGoogle size={24} />
          Sign Up with Google
        </button>

        {/* Switch to Login */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
