import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../assets/baseUrl';
import axios from 'axios';
import Loaders from '../assets/Loaders';

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
      setError(err.response?.data?.error || 'An unexpected error occurred.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen m-20 bg-gray-100 text-gray-800 relative">
      {loader && (
        <Loaders />
      )}
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md relative">
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}



        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
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
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
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
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
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
