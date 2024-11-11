"use client";

import Header from "@/components/header";
import {
  useGetProfileInfoQuery,
  useUploadProfilePictureMutation,
} from "@/slices/apiSlice";
import { showToast } from "@/utils/toast";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [userId] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const {
    data: profileData,
    isLoading,
    isSuccess,
    isError,
  } = useGetProfileInfoQuery();

  const [updateProfilePic, { isLoading2, isSuccess2, isError2 }] =
    useUploadProfilePictureMutation();

  useEffect(() => {
    setUserRole(profileData?.profileInfo?.user_role);
    setUserEmail(profileData?.profileInfo?.user_email);
    setUserName(profileData?.profileInfo?.user_name);
    setProfilePicture(profileData?.profileInfo?.profile_picture);
  }, [profileData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the updated profile data to your API
    console.log("Updated Profile Info: ", { userId, userName, userEmail });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setProfilePicture(imageUrl);
    }
  };

  const handleUploadProfilePicture = async () => {
    if (!file) return; // Early return if no file is selected
    setUploading(true); // Indicate that uploading has started

    const formData = new FormData();
    formData.append("photo", file); // Use the expected key name 'photo'

    try {
      await updateProfilePic(formData).unwrap(); // Send the actual file to the API
      showToast("Profile picture updated successfully!", "success");
      setFile(null); // Clear the file input after successful upload

      // Optionally, update the profile picture preview if necessary
      setProfilePicture(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error updating profile picture", error);
      showToast("Error updating profile picture. Please try again.", "error");
    } finally {
      setUploading(false); // Always reset uploading state in both success and error cases
    }
  };

  return (
    <>
      <Header />
      <div
        className={`bg-gradient-to-r flex flex-col items-center justify-center py-10 ${
          profilePicture ? "" : "bg-black"
        }`}
      >
        <h1 className="text-4xl font-extrabold text-center text-white mb-6">
          User Profile
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 px-4"
        >
          <div className="relative">
            <div className="flex items-center justify-center">
              <div className="relative">
                <img
                  src={profilePicture || "/path/to/default/profile.png"}
                  alt="Profile"
                  className={`w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg ${
                    !profilePicture ? "bg-black" : ""
                  }`}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="absolute bottom-0 right-0 mb-2 mr-2 p-2 bg-white rounded-full shadow-lg">
                  {/* Icon for upload */}
                </span>
              </div>
            </div>
            <button
              onClick={handleUploadProfilePicture}
              disabled={isLoading2 || uploading}
              className={`mt-2 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-200 shadow-lg ${
                isLoading2 || uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading2 || uploading
                ? "Uploading..."
                : "Update Profile Picture"}
            </button>
          </div>

          <div>
            <label className="block font-semibold text-white mb-2">
              User Role:
            </label>
            <input
              type="text"
              value={userRole}
              disabled
              className="w-full shadow-lg border rounded-lg py-2 px-4 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block font-semibold text-white mb-2">
              User Name:
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full shadow-lg border rounded-lg py-2 px-4 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block font-semibold text-white mb-2">
              User Email:
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full shadow-lg border rounded-lg py-2 px-4 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md transition duration-200 shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
