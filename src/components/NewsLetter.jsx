import React, { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email");
      return;
    }

    // Future: send to backend API
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <section className="bg-gray-100 max-w-6xl mx-auto mt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Get the latest blogs, updates, and offers right to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
