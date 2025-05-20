import React from "react";

const Header = ({ heading, subheading }) => {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
        {heading}
      </h1>
      {subheading && (
        <h1 className="text-gray-600 text-base sm:text-lg max-w-xl mt-4 mx-auto text-center mb-8">
          {subheading}
        </h1>
      )}
    </div>
  );
};

export default Header;
