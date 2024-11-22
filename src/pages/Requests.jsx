import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../assets/baseUrl";
import Loaders from "../assets/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { removeRequestDoc } from "../store/userSlice";

function Requests() {
  const dispatch = useDispatch();
  const { requestDoc } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userDoc } = useSelector((state) => state.user);

  useEffect(() => {
    setRequests(requestDoc?.data);
  }, [requestDoc]);

  const updateStatusAndRemove = (id, status) => {
    setStatusUpdates((prev) => ({ ...prev, [id]: status }));
    setTimeout(() => {
      setRequests((prev) => prev.filter((req) => req._id !== id));
      setStatusUpdates((prev) => {
        const updates = { ...prev };
        delete updates[id];
        return updates;
      });
    }, 1000);
  };

  const handleAccept = async (id) => {
    try {
      setLoading(true);
      const reviewResposne = await axios.post(
        `${baseUrl}request/review/accepted/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequestDoc(reviewResposne.data.data._id));
      updateStatusAndRemove(id, "Accepted");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      setLoading(true);
      const reviewResponse = await axios.post(
        `${baseUrl}request/review/rejected/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequestDoc(reviewResponse.data.data._id));
      updateStatusAndRemove(id, "Rejected");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (userDoc)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col  items-center p-4 ">
        {loading && <Loaders />}
        {requests.length === 0 && !error ? (
          <div className="text-white flex items-center justify-center h-screen ">
            No requests at the moment.
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-gray-900 text-white shadow-md rounded-lg p-4 space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="flex border-b-2 flex-col sm:flex-row items-center justify-between  p-4 rounded-lg shadow-sm hover:shadow-md transition"
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
                    <p className="text-lg font-semibold ">
                      {req.fromId.firstName} {req.fromId.lastName}
                    </p>
                    <p className="text-sm  mt-1">
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
