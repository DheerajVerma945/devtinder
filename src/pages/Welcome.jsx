import React from 'react';
import { Link } from 'react-router-dom';
import { FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaDatabase, FaCode } from 'react-icons/fa';

function Home() {
  return (
    <div className="flex  flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          Welcome to DevTinder
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-300">
          Discover developers, connect, and build amazing projects together. Your journey starts here.
        </p>
        <div className="flex space-x-6">
          <Link
            to="/login"
            className="px-8 py-4 text-lg font-medium bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-8 py-4 text-lg font-medium bg-green-600 hover:bg-green-700 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-16 space-x-8 md:space-x-12 text-6xl text-gray-400">
        <FaHtml5 className="hover:text-red-500 transition-colors duration-200" />
        <FaCss3Alt className="hover:text-blue-500 transition-colors duration-200" />
        <FaJs className="hover:text-yellow-400 transition-colors duration-200" />
        <FaNodeJs className="hover:text-green-500 transition-colors duration-200" />
        <FaDatabase className="hover:text-purple-500 transition-colors duration-200" />
        <FaCode className="hover:text-pink-500 transition-colors duration-200" />
      </div>
    </div>
  );
}

export default Home;
