import { FiInfo, FiPlus } from "react-icons/fi";
const TopPicks = () => {
  const blogs = [
    {
      _id: "1",
      title: "Revolutionizing Tech: The Future of AI",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      category: "Tech",
      shortDescription:
        "Explore how AI is transforming industries and what it means for the future.",
    },
    {
      _id: "2",
      title: "Wanderlust Diaries: Hidden Gems Around the World",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
      category: "Travel",
      shortDescription:
        "Join us on a journey to breathtaking places off the beaten path.",
    },
    {
      _id: "3",
      title: "Healthy Habits for a Balanced Life",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      category: "Lifestyle",
      shortDescription:
        "Tips and tricks to improve your daily routine for wellness and happiness.",
    },
  ];
  return (
    <section className="py-10 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Top Picks of the Month</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Discover our editor's top picks this month — hand-selected articles we
          think you'll absolutely love. These blogs cover trending stories,
          inspiring journeys, and must-read insights to keep you informed and
          inspired.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-sm rounded-md overflow-hidden flex flex-col h-full"
            >
              <figure>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-[200px] w-full object-cover"
                />
              </figure>

              <div className="flex flex-col justify-between flex-1 p-4">
                <div className="flex items-start flex-1 justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {blog.title}
                  </h2>
                  <div className="bg-black text-white text-xs px-3 py-1 rounded-full">
                    {blog.category}
                  </div>
                </div>

                <p className="text-sm text-gray-600 flex-1">
                  {blog.shortDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPicks;
