import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn }) {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* App Name */}
        <h1 className="text-2xl font-bold">
          <Link to="/">AppName</Link>
        </h1>

        {/* Navbar for logged-in or non-logged-in users */}
        <div className="space-x-4">
          {isLoggedIn ? (
            // For logged-in users
            <>
              <Link
                to="/profile"
                className="hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300"
              >
                Profile
              </Link>
              <Link
                to="/request"
                className="hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300"
              >
                Request
              </Link>
            </>
          ) : (
            // For non-logged-in users
            <>
              <Link
                to="/signup"
                className="hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
