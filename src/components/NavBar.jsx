import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import UseAuth from "../utils/hooks/UseAuth";

const NavBar = () => {
  const { user, handleLogout } = UseAuth();

  const navlinks = [
    { name: "home", path: "/" },
    { name: "add blogs", path: "/addBlogs" },
    { name: "all blogs", path: "/allBlogs" },
    { name: "feature", path: "/feature" },
    { name: "wishlist", path: "/wishlist" },
  ];

  return (
    <div className="navbar  bg-white shadow-sm  px-2 lg:px-10 ">
      {/* Left */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-10 mt-3 p-4 bg-white rounded-box w-52 shadow text-gray-800 font-medium uppercase space-y-2"
          >
            {navlinks.map((nav) => (
              <NavLink
                key={nav.name}
                to={nav.path}
                className={({ isActive }) =>
                  `block hover:text-blue-500 transition ${
                    isActive ? "text-blue-600 underline" : ""
                  }`
                }
              >
                {nav.name}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-gray-800">MetaBlogs</h1>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-10 text-sm font-medium uppercase text-gray-700">
          {navlinks.map((nav) => (
            <NavLink
              key={nav.name}
              to={nav.path}
              className={({ isActive }) =>
                `hover:text-blue-500 transition ${
                  isActive ? "text-blue-600 underline underline-offset-4" : ""
                }`
              }
            >
              {nav.name}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-gray-300 ring-offset-2">
                <img src={user?.photoURL} />
              </div>
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2 bg-black text-white hover:bg-white hover:text-black border border-black transition-all py-2 px-6 rounded-full text-sm"
            >
              <GiExitDoor />
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="flex cursor-pointer items-center gap-2 bg-black text-white hover:bg-white hover:text-black border border-black transition-all py-2 px-6 rounded-full text-sm">
              <FaRegUser />
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
