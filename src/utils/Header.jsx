import React from "react";
import { motion } from "framer-motion";

const Header = ({ heading, subheading }) => {
  const words = heading.split(" ");
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center flex-wrap text-center">
        {words.map((word, index) => (
          <motion.h1
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0)", opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            key={index}
            className="text-3xl sm:text-4xl font-bold text-gray-800 mx-1"
          >
            {word}
          </motion.h1>
        ))}
      </div>

      {subheading && (
        <h2 className="text-gray-600 text-base sm:text-lg max-w-xl mt-4 text-center mb-8">
          {subheading}
        </h2>
      )}
    </div>
  );
};

export default Header;
