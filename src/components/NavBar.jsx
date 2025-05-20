import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const navlinks = [
    { name: "home", path: "/" },
    { name: "add blogs", path: "/addBlogs" },
    { name: "all blogs", path: "/allBlogs" },
    { name: "feature", path: "/feature" },
    { name: "wishlist", path: "/wishlist" },
  ];
  return (
    <div className="navbar border-b bg-transparent lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu uppercase menu-sm dropdown-content text-black bg-white rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navlinks.map((nav) => (
              <NavLink
                className={"transition-all hover:text-blue-400"}
                key={nav.name}
                to={nav.path}
              >
                {nav.name}
              </NavLink>
            ))}
          </ul>
        </div>
        <h1 className="text-xl font-bold">MetaBlogs</h1>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal flex items-center gap-12 text-base uppercase">
          {navlinks.map((nav) => (
            <NavLink
              className={"transition-all hover:text-blue-400"}
              key={nav.name}
              to={nav.path}
            >
              {nav.name}
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <Link to={"/login"}>
          <button className="text-white cursor-pointer hover:border-[1px] hover:bg-transparent hover:text-black transition-all py-2 px-8 rounded-full bg-black text-base font-normal">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
