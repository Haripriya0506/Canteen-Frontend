import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState({
    name: "VENEPALLY HARIPRIYA",
    email: "231167@iiitt.ac.in",
    role: "Student",
  });

  const [image, setImage] = useState(null);

  // 🔹 Load saved user + image on page load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  // 🔹 Save image permanently
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 image
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
      
      {/* Profile Image */}
      <div
        className="flex justify-center mb-4 cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        <img
          src={
            image ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-orange-400 hover:opacity-90 transition"
        />
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Change Photo */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="text-sm text-orange-500 font-semibold mb-4 hover:underline"
      >
        Change Profile Photo
      </button>

      {/* User Info */}
      <h2 className="text-2xl font-bold text-gray-800">
        {user.name}
      </h2>

      <p className="text-gray-600 mt-1">{user.email}</p>

      <span className="inline-block mt-3 px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
        {user.role}
      </span>

      {/* Actions */}
      <div className="mt-6 space-y-3">
        <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600">
          Edit Profile
        </button>

        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
