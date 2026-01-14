
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold">
        IIIT Trichy Canteen 🍽️
      </h1>

      <div className="flex gap-6 font-medium">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/payment">Payment</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>

      <button
        onClick={logout}
        className="bg-white text-orange-600 px-4 py-1 rounded-full font-semibold hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
}
