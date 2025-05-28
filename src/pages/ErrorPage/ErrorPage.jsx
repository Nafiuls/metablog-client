import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-2">
        {error?.message || "Oops! The page you're looking for doesn't exist."}
      </p>
      <p className="text-sm text-gray-400 mb-6">
        {error?.statusText && `Error: ${error.statusText}`}
      </p>
      <Link
        to="/"
        className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
