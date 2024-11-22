import axios from "axios";
import { Link } from "react-router-dom";
import { FaEllipsisV, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../assets/baseUrl";
import Loaders from "../assets/Loaders";

function Connections() {
  const [userConnections, setUserConnections] = useState([]);
  const [showEditConnection, setShowEditConnection] = useState(null);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConnectionRemove = async () => {
    setShowConfirmationMessage(false);
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}removeConnection`, {
        data: { fromId: showEditConnection },
        withCredentials: true,
      });
      setUserConnections(
        userConnections.filter(
          (connection) => connection._id !== showEditConnection
        )
      );
    } catch (err) {
      setError(err?.response?.data.message || "An error occurred");
    } finally {
      setShowConfirmationMessage(false);
      setShowEditConnection(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getConnections = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}user/connections`, {
          withCredentials: true,
        });
        setUserConnections(response.data?.data || []);
      } catch (err) {
        setError(err?.response?.data.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    getConnections();
  }, []);

  return (
    <div>
      {loading && <Loaders />}
      {showConfirmationMessage && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 w-full sm:w-10/12 md:w-1/3">
            <h2 className="text-sm sm:text-base md:text-xl font-semibold text-gray-800 text-center mb-3 sm:mb-4">
              Are you sure you want to remove this connection? This action is
              irreversible.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleConnectionRemove}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base text-white bg-red-500 hover:bg-red-600 rounded-lg font-medium shadow-sm transition duration-200"
              >
                Remove
              </button>
              <button
                onClick={() => {
                  setShowConfirmationMessage(false);
                  setShowEditConnection(null);
                }}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-lg font-medium shadow-sm transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="text-center flex items-center justify-center h-screen text-red-500">
          {error}
        </div>
      )}

      {!error && (
        <ul
          className={`mt-10 flex flex-col items-start h-screen gap-6 ${
            userConnections.length === 0 ? "hidden" : ""
          }`}
        >
          <h1
            className={`text-3xl font-bold m-5 ${
              userConnections.length > 0 ? "" : "hidden"
            }`}
          >
            Connections ({userConnections.length})
          </h1>

          {userConnections.map((connection) => (
            <li
              key={connection._id}
              className="flex relative flex-row bg-gray-300 p-6 rounded-lg shadow-md w-full gap-4 hover:shadow-lg transition-all"
            >
              <img
                src={connection.photoUrl}
                alt={`${connection.firstName} ${connection.lastName}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
              />
              <div className="flex justify-between w-full items-center text-center md:text-left">
                <Link
                  to={`/user/${connection._id}`}
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {connection.firstName} {connection.lastName || ""}
                </Link>
                <div
                  className="relative cursor-pointer"
                  onClick={() => setShowEditConnection(connection._id)}
                >
                  <FaEllipsisV />
                  {showEditConnection === connection._id && (
                    <button
                      className="absolute right-10 -top-3 bg-red-500 text-white p-3 inline whitespace-nowrap rounded-md"
                      onClick={() => {
                        setShowConfirmationMessage(true);
                      }}
                    >
                      Remove connection
                      <FaTrash className="inline ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {userConnections.length === 0 && (
        <div className="flex justify-center items-center h-screen text-gray-700">
          <p className="text-2xl font-bold text-center">
            No connections available
          </p>
        </div>
      )}
    </div>
  );
}

export default Connections;
