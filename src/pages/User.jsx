import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loaders from "../assets/Loaders";
import { baseUrl } from "../assets/baseUrl";
import { useSelector } from "react-redux";

function User() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const { userDoc } = useSelector((state) => state.auth);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}user/${userId}`, {
          withCredentials: true,
        });
        setUser(response?.data?.data);
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [userId, userDoc]);

  if (loading) {
    return (
      <div className="flex  bg-gradient-to-br from-gray-800 via-gray-900 to-black  items-center justify-center h-screen">
        <Loaders />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex bg-gradient-to-br from-gray-800 via-gray-900 to-black  items-center justify-center h-screen text-red-500">
        {error.message}
      </div>
    );
  } 
  if (userDoc) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6">
        {user ? (
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <img
                src={user.photoUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-300"
              />
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-200 text-lg mt-2">
                {user.about || "No about information provided."}
              </p>
              <div className="mt-4">
                <p className="text-gray-200">
                  <span className="font-medium">Age:</span>{" "}
                  {user.age || "Age not provided"}
                </p>
                <p className="text-gray-200 mt-2">
                  <span className="font-medium">Gender:</span>{" "}
                  {user.gender || "Gender not specified"}
                </p>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-100">Skills:</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {user.skills.length > 0 ? (
                    user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills listed.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg">
            User not found.
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
