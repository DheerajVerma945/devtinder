import React, { useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../assets/baseUrl";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loaders from "../assets/Loaders";

function ChangePass() {
  const { userDoc } = useSelector((state) => state.user);
  const [inputPass, setInputPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    inputPass: false,
    newPass: false,
    confirmPass: false,
  });

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      if (!newPass.trim() || !confirmPass.trim()) {
        setError("Password field can't be empty");
        return;
      }
      if (newPass !== confirmPass) {
        setError("Passwords do not match");
        return;
      }
      const response = await axios.patch(
        `${baseUrl}profile/password`,
        { inputPass, newPass },
        { withCredentials: true }
      );
      console.log(response);
      setSuccessMsg("Password updated successfully");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError(null);
        setSuccessMsg(null);
      }, 3000);
    }
  };

  if (!userDoc) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" rounded-lg shadow-lg p-6 text-red-600 text-center">
            <Loaders />
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-red-600 text-center">
            {error}
          </div>
        </div>
      )}
      {successMsg && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-green-600 text-center">
            {successMsg}
          </div>
        </div>
      )}
      <h1 className="text-2xl font-semibold text-white mb-6">Change Password</h1>
      {loading ? (
        <Loaders />
      ) : (
        <div className="w-full max-w-md space-y-4">
          <label className="block text-sm font-medium text-white">
            Enter current password:
          </label>
          <div className="relative">
            <input
              type={passwordVisibility.inputPass ? "text" : "password"}
              placeholder="Current Password"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setInputPass(e.target.value)}
              value={inputPass}
            />
            <button
              type="button"
              onClick={() =>
                setPasswordVisibility((prev) => ({
                  ...prev,
                  inputPass: !prev.inputPass,
                }))
              }
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
            >
              {passwordVisibility.inputPass ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </button>
          </div>
          <label className="block text-sm font-medium text-white">
            Enter new password:
          </label>
          <div className="relative">
            <input
              type={passwordVisibility.newPass ? "text" : "password"}
              placeholder="New Password"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setNewPass(e.target.value)}
              value={newPass}
            />
            <button
              type="button"
              onClick={() =>
                setPasswordVisibility((prev) => ({
                  ...prev,
                  newPass: !prev.newPass,
                }))
              }
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
            >
              {passwordVisibility.newPass ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </button>
          </div>
          <label className="block text-sm font-medium text-white">
            Confirm new password:
          </label>
          <div className="relative">
            <input
              type={passwordVisibility.confirmPass ? "text" : "password"}
              placeholder="Confirm New Password"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setConfirmPass(e.target.value)}
              value={confirmPass}
            />
            <button
              type="button"
              onClick={() =>
                setPasswordVisibility((prev) => ({
                  ...prev,
                  confirmPass: !prev.confirmPass,
                }))
              }
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
            >
              {passwordVisibility.confirmPass ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </button>
          </div>
          <button
            className="w-full py-2 mt-2 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded"
            onClick={handleSave}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ChangePass;
