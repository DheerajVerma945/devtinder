import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileThunk } from "../store/userSlice";
import { FaUserCircle } from "react-icons/fa"; 
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const { userDoc, error } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && !userDoc) {
      dispatch(profileThunk());
    }
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>You need to login first</p>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-10">
      <div className="cursor-pointer flex flex-col items-center md:items-start">
        <FaUserCircle className="text-2xl text-gray-700 hover:text-blue-600" />
        <p className="mt-2 text-gray-700 text-lg inline">Profile</p>
      </div>

      <div className="flex flex-col md:flex-row h-screen items-center justify-center gap-6 md:gap-10 text-center">
        <p className="text-xl md:text-2xl font-semibold">
          Welcome, <span className="text-blue-600">{userDoc?.data.firstName || "User"}</span>
        </p>
        <Link to="/requests" className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300">
          <IoMdNotifications className="text-2xl" />
          Requests
        </Link>
      </div>
    </div>
  );
}

export default Home;
