import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../assets/baseUrl";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});

  useEffect(() => {
    const getRequests = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}user/requests/recieved`,
          { withCredentials: true }
        );
        setRequests(response.data.data);
      } catch (error) {
        setError(error);
      }
    };
    getRequests();
  }, []);

  const updateStatusAndRemove = (id, status) => {
    setStatusUpdates((prev) => ({ ...prev, [id]: status }));
    setTimeout(() => {
      setRequests((prev) => prev.filter((req) => req._id !== id));
      setStatusUpdates((prev) => {
        const updates = { ...prev };
        delete updates[id];
        return updates;
      });
    }, 2000);
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(
        `${baseUrl}request/review/accepted/${id}`,
        {},
        { withCredentials: true }
      );
      updateStatusAndRemove(id, "Accepted");
    } catch (error) {
      setError(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(
        `${baseUrl}request/review/rejected/${id}`,
        {},
        { withCredentials: true }
      );
      updateStatusAndRemove(id, "Rejected");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error.message || "An error occurred. Please try again later."}
        </div>
      )}
      {requests.length === 0 ? (
        <div className="text-gray-600 text-center">
          No requests at the moment.
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center space-x-4">
                {req.fromId.photoUrl && (
                  <img
                    src={req.fromId.photoUrl}
                    alt={`${req.fromId.firstName} ${req.fromId.lastName}`}
                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  />
                )}
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {req.fromId.firstName} {req.fromId.lastName}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Skills:</strong>{" "}
                    {req.fromId.skills && req.fromId.skills.length > 0
                      ? req.fromId.skills.join(", ")
                      : "No skills listed"}
                  </p>
                </div>
              </div>
              {statusUpdates[req._id] ? (
                <p
                  className={`mt-4 sm:mt-0 text-lg font-medium ${
                    statusUpdates[req._id] === "Accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {statusUpdates[req._id]}
                </p>
              ) : (
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleAccept(req._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-300 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-300 transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Requests;
