import React from "react";
import UseAuth from "./hooks/UseAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loading";

const Private = ({ children }) => {
  const location = useLocation();
  const { user, loading } = UseAuth();
  if (loading) return <Loading />;
  if (!user)
    return <Navigate state={{ from: location.pathname }} to={"/login"} />;
  return children;
};

export default Private;
