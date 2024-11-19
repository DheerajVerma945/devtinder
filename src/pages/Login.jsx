import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError("Email and password cannot be empty.");
      return;
    }
  
    setError(null);
    setLoader(true);
    setSuccessMessage(null);
  
    try {
      const url = "https://devtinder0backend.onrender.com/login";
      const response = await axios.post(
        url,
        { emailId: email.trim(), password },
        { withCredentials: true }
      );
      setSuccessMessage(response.data.message);
      navigate("/feed");
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "An unexpected error occurred. Please try again later.";
      setError(errorMsg);
    } finally {
      setLoader(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 relative">
      {loader && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-40 flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce1"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce2"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce3"></div>
          </div>
        </div>
      )}

      <div className={`bg-white shadow-md rounded px-8 py-6 w-full max-w-md ${loader ? 'backdrop-blur-sm' : ''}`}>
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
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
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login
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
