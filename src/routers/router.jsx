import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import AllBlogs from "../pages/AllBlog/AllBlogs";
import AddBlog from "../pages/AddBlog/AddBlog";
import Feature from "../pages/Feature/Feature";
import Wishlist from "../pages/Wishlist/Wishlist";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Details from "../pages/Details/Details";
import UpdateBlog from "../pages/Update/UpdateBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/addBlogs",
        element: <AddBlog />,
      },
      {
        path: "/blog/:id",
        element: <Details />,
      },
      {
        path: "/allBlogs",
        element: <AllBlogs />,
      },
      {
        path: "/feature",
        element: <Feature />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/update/:id",
        element: <UpdateBlog />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
