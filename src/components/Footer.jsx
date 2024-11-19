import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Section */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-white">DevTinder</h2>
            <p className="text-sm">Connecting Developers Around the World</p>
          </div>

          {/* Links Section */}
          <div className="flex space-x-6">
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

          {/* Social Media Section */}
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <i className="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="text-center text-sm mt-6 text-gray-400">
          &copy; {new Date().getFullYear()} DevTinder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
