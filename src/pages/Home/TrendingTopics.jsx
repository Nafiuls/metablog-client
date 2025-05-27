import React from "react";

const TrendingTopics = () => {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Trending Topics</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Stay ahead of the curve with our trending blog topics. These are the
          most talked-about subjects among our readers — perfect for when you're
          looking for something fresh and relevant to read.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "AI",
            "Mental Health",
            "Freelancing",
            "Travel Hacks",
            "Gadget Reviews",
          ].map((topic) => (
            <span
              key={topic}
              className="bg-black text-white px-4 py-2 rounded-full text-sm"
            >
              #{topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingTopics;
