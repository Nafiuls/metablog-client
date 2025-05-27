import toast from "react-hot-toast";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">MetaBlog</h2>
          <p className="text-sm text-gray-400">
            MetaBlog is your daily dose of insightful stories, industry tips,
            and creative inspiration — curated for curious minds.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-white transition">
                Blogs
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-3">
            Subscribe to get our latest blog updates directly in your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thank you for subscribing to our newsletter!");
            }}
          >
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 mb-2 rounded bg-gray-800 text-white text-sm placeholder-gray-400 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-gray-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MetaBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
