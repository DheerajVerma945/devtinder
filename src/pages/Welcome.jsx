import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to DevTinder</h1>
      <p className="text-lg md:text-xl text-center max-w-xl mb-8">
        Connect with developers, share ideas, and collaborate on projects. Build your network and take your coding journey to the next level.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 text-lg md:text-xl font-medium bg-blue-600 hover:bg-blue-700 rounded-full transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 text-lg md:text-xl font-medium bg-green-600 hover:bg-green-700 rounded-full transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Home;
