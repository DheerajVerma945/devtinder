import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa"; // Profile Icon
import { IoMdNotifications } from "react-icons/io"; // Requests Icon
import { Link } from "react-router-dom";

function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://devtinder0backend.onrender.com/profile/view",
          { withCredentials: true }
        );
        console.log("Response data:", response.data.data);
        setUserData(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row  items-center justify-between p-6 md:p-10">
      {/* Profile Section */}
      <div className="cursor-pointer  flex flex-col items-center md:items-start">
        <FaUserCircle className="text-2xl text-gray-700 hover:text-blue-600" />
        <p className="mt-2 text-gray-700 text-lg inline">Profile</p>
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row h-screen items-center justify-center gap-6 md:gap-10 text-center">
        <p className="text-xl md:text-2xl font-semibold">
          Welcome, <span className="text-blue-600">{userData?.firstName || "User"}</span>
        </p>
        <Link to="/requests"className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300">
          <IoMdNotifications className="text-2xl" />
          Requests
        </Link>
      </div>
    </div>
  );
}

export default Home;
