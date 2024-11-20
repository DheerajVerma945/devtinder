import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../store/authSlice';
import Loaders from '../assets/Loaders';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, error, isLoggedin } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!email.trim() || !password) return; 

    const resultAction = await dispatch(loginThunk({ emailId: email.trim(), password }));
    if (loginThunk.fulfilled.match(resultAction)) {
      navigate('/home'); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 relative">
      {status === 'loading' && <Loaders />}

      <div
        className={`bg-white shadow-md rounded px-8 py-6 w-full max-w-md ${
          status === 'loading' ? 'backdrop-blur-sm' : ''
        }`}
      >
        {isLoggedin && <p className="text-green-500 text-sm mb-4">Login successful!</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute top-2/3 right-3 transform -translate-y-1/2"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
