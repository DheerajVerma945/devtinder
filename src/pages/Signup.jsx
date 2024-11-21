import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../assets/baseUrl';
import axios from 'axios';
import Loaders from '../assets/Loaders';
import { useSelector } from 'react-redux';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleSignup = async () => {
    setError('');
    setSuccessMessage('');
    setLoader(true);

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      setLoader(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoader(false);
      return;
    }

    try {
      const url = `${baseUrl}signup`;
      const response = await axios.post(url, { firstName, lastName, emailId: email, password });
      setSuccessMessage('You are registered successfully!');
      setError('');
      navigate('/login');
    } catch (err) {
      if (err.response?.data?.error?.includes('E11000 duplicate key error')) {
        setError('Email already exists.');
      } else {
        setError(err.response?.data?.error || 'An unexpected error occurred.');
      }
    }
    finally {
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
            If you wish to create a new account, please log out first.
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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white relative">
      {loader && <Loaders />}
      <h1 className="text-4xl font-extrabold tracking-wide mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 text-center">Create Account and Get Started</h1>
      <div className="shadow-2xl bg-gray-900 rounded px-8 py-6 w-full max-w-md relative">
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 bg-gray-800 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 bg-gray-800 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {passwordVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-800 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {confirmPasswordVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
        >
          {loader ? "Signing up" : "Sign up"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
