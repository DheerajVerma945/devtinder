import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { profileThunk } from "../store/userSlice";
import { baseUrl } from "../assets/baseUrl";
import Loaders from "../assets/Loaders";

function UpdateProfile() {
  const dispatch = useDispatch();
  const { userDoc } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (userDoc) {
      setUserData(userDoc.data);
      setUpdatedFields({});
    }
  }, [userDoc]);

  const handleFieldChange = (field, value) => {
    setUpdatedFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePreview = URL.createObjectURL(file);
      setFile(filePreview);

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "devtinderv1");
      formData.append("cloud_name", "dzitsseoz");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dzitsseoz/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const uploadedImageUrl = response.data.secure_url;
        handleFieldChange("photoUrl", uploadedImageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Error uploading image. Please try again.");
      } finally {
        URL.revokeObjectURL(filePreview);
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    if (!updatedFields.firstName || !updatedFields.lastName) {
      setError("First Name and Last Name cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const dataToSend = { ...updatedFields };

      if (!file) {
        dataToSend.photoUrl = userData?.photoUrl;
      }

      await axios.patch(`${baseUrl}profile/edit`, dataToSend, { withCredentials: true });

      setSuccessMsg("Profile updated successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      dispatch(profileThunk());
    }
  };

  if (!userDoc)
    return (
      <div className="flex items-center justify-center h-screen text-white bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        You need to login/register to update your profile
      </div>
    );

  const isSaveDisabled = Object.keys(updatedFields).length === 0 && !file;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
      {loading && <Loaders />}
      {error && <div className="text-red-400 text-center m-2">{error}</div>}
      {successMsg && <div className="text-green-400 text-center m-2">{successMsg}</div>}
      <form className="w-full max-w-lg bg-gray-700 p-6 rounded-lg shadow-md space-y-4">
        <div className="flex justify-center mb-4">
          <img
            src={file || userData?.photoUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            placeholder={userData?.firstName || "First Name"}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            placeholder={userData?.lastName || "Last Name"}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            placeholder={userData?.gender || "Select Gender"}
            onChange={(e) => handleFieldChange("gender", e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            placeholder={userData?.age || "Age"}
            onChange={(e) => handleFieldChange("age", e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">About</label>
          <textarea
            placeholder={userData?.about || "Write about yourself"}
            onChange={(e) => handleFieldChange("about", e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Skills</label>
          <input
            type="text"
            placeholder={userData?.skills?.join(", ") || "e.g., React, Node.js"}
            onChange={(e) => handleFieldChange("skills", e.target.value.split(",").map((skill) => skill.trim()))}
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          className={`w-full py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded ${isSaveDisabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
          disabled={isSaveDisabled}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
