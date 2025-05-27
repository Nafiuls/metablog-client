import React from "react";
import Header from "../../utils/Header";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../utils/hooks/UseAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { handleSignIn, handleGoogle } = UseAuth();
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    handleSignIn(email, password)
      .then(() => {
        toast.success("Login Successfull!");
        navigate(from, { replace: true });
      })
      .catch(() => toast.error("Something Went Wrong!"));
  };
  // handle google
  const handleSocial = async () => {
    try {
      await handleGoogle();
      toast.success("Google Signin Successfull");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen pt-10 px-4 flex flex-col items-center bg-gray-50">
      <Header
        heading="Welcome Back to MetaBlogs"
        subheading="Log in to share your voice, explore new stories, and connect with writers around the world."
      />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg mt-6 p-8 flex flex-col gap-6"
      >
        {/* Login Form Title */}
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Login to Your Account
        </h2>

        {/* Email Input */}
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

        {/* Password Input */}
        <div className="flex items-center border-b border-gray-300 focus-within:border-black transition">
          <MdOutlinePassword size={20} className="text-gray-500" />
          <input
            className="w-full py-2 px-3 outline-none text-sm text-gray-700 placeholder-gray-400"
            type="password"
            name="password"
            placeholder="Your Password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white uppercase py-3 rounded-md hover:bg-white hover:text-black border border-black transition"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleSocial}
          type="button"
          className="flex cursor-pointer items-center justify-center gap-3 bg-black text-white py-3 rounded-md hover:bg-red-600 transition"
        >
          <AiOutlineGoogle size={24} />
          Sign in with Google
        </button>

        {/* Switch to Register */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
