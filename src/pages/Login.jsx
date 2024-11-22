import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loaders from "../assets/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../assets/baseUrl";
import { setIsLoggedIn } from "../store/authSlice";
import { profileThunk, requestsThunk } from "../store/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setError("");
    setLoader(true);
    if (!email || !password) {
      setError("Both email and password are required.");
      setLoader(false);
      return;
    }

    try {
      const url = `${baseUrl}login`;
      await axios.post(
        url,
        { emailId: email, password },
        { withCredentials: true }
      );
      await dispatch(profileThunk());
      await dispatch(requestsThunk());
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
    } finally {
      dispatch(setIsLoggedIn(true));
      setLoader(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
        <div className="bg-gray-800 shadow-md rounded-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            You’re already logged in.
          </h2>
          <p className="text-gray-400 mb-6">
            If you wish to log in with a different account, please log out
            first.
          </p>
          <Link
            to="/home"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      {loader && <Loaders />}
      <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
        Welcome back
      </h1>
      <div className="bg-gray-900 shadow-lg rounded-lg px-8 py-6 max-w-md w-full text-white">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
            >
              {passwordVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 py-2 rounded-md text-lg font-medium hover:bg-blue-700 transition duration-300"
        >
          {loader ? "Logging in" : "Login"}
        </button>
        <p className="text-center text-sm mt-4 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-700 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
