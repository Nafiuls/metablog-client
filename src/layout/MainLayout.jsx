import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className=" bg-gray-50 min-h-[calc(100vh-52px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
