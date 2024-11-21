import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-300 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">DevTinder</h2>
            <p className="text-sm">Connecting Developers Around the World</p>
          </div>

          <div className="flex flex-wrap justify-center space-x-6 md:space-x-8">
            <a
              href="/about"
              className="text-gray-300 hover:text-white text-sm transition duration-300"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-300 hover:text-white text-sm transition duration-300"
            >
              Contact
            </a>
            <a
              href="/privacy"
              className="text-gray-300 hover:text-white text-sm transition duration-300"
            >
              Privacy Policy
            </a>
          </div>

          <div className="flex space-x-6 justify-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <FaGithub className="text-2xl" />
            </a>
          </div>
        </div>

        <div className="text-center text-sm mt-8 text-gray-400">
          &copy; {new Date().getFullYear()} DevTinder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
