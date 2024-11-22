import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Welcome() {

  const {isLoggedIn} = useSelector( (state)=>state.auth);
  const navigate = useNavigate();

  useEffect( ()=>{
    if(isLoggedIn){
      navigate("/home");
    }
  },[]);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          Welcome to DevTinder
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-300">
          Discover developers, connect, and build amazing projects together.
          Your journey starts here.
        </p>
        <div className="flex space-x-8 justify-center mb-16">
          <Link
            to="/login"
            className="px-8 py-4 text-lg font-medium bg-blue-600 hover:bg-blue-700 rounded-full shadow-xl transform transition-transform duration-200 hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-8 py-4 text-lg font-medium bg-green-600 hover:bg-green-700 rounded-full shadow-xl transform transition-transform duration-200 hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
        <p className="text-center text-lg text-gray-400">
          Join the community and start building together. Let's make magic
          happen!
        </p>
      </div>
      <div className="absolute bottom-8 text-center w-full">
        <p className="text-gray-400 text-sm">
          © 2024 DevTinder. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Welcome;
