import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-[calc(100vh-88px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
