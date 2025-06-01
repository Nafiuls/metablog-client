import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Import your pages manually
import Home from "../pages/Home/Home";
import AllBlogs from "../pages/AllBlog/AllBlogs";
import AddBlog from "../pages/AddBlog/AddBlog";
import Feature from "../pages/Feature/Feature";
import Wishlist from "../pages/Wishlist/Wishlist";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Details from "../pages/Details/Details";
import UpdateBlog from "../pages/Update/UpdateBlog";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Private from "../utils/Private";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

const MainLayout = () => {
  const location = useLocation();

  return (
    <div>
      <NavBar />

      <div className="bg-gray-50 min-h-[calc(100vh-52px)] overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div {...pageTransition}>
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/addBlogs"
              element={
                <motion.div {...pageTransition}>
                  <Private>
                    <AddBlog />
                  </Private>
                </motion.div>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <motion.div {...pageTransition}>
                  <Details />
                </motion.div>
              }
            />
            <Route
              path="/allBlogs"
              element={
                <motion.div {...pageTransition}>
                  <AllBlogs />
                </motion.div>
              }
            />
            <Route
              path="/feature"
              element={
                <motion.div {...pageTransition}>
                  <Feature />
                </motion.div>
              }
            />
            <Route
              path="/wishlist"
              element={
                <motion.div {...pageTransition}>
                  <Private>
                    <Wishlist />
                  </Private>
                </motion.div>
              }
            />
            <Route
              path="/update/:id"
              element={
                <motion.div {...pageTransition}>
                  <Private>
                    <UpdateBlog />
                  </Private>
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div {...pageTransition}>
                  <Login />
                </motion.div>
              }
            />
            <Route
              path="/register"
              element={
                <motion.div {...pageTransition}>
                  <Register />
                </motion.div>
              }
            />
            <Route
              path="*"
              element={
                <motion.div {...pageTransition}>
                  <ErrorPage />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
