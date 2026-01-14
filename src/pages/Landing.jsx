import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#fff7ed]">

      {/* 🍽️ LEFT SIDE IMAGE */}
      <div className="hidden md:flex items-center justify-center relative">
        <img
          src="/fooo.png"   // 🔴 put ONE big food image in public/
          alt="Food"
          className="w-[85%] max-w-xl rounded-3xl shadow-xl"
        />
      </div>

      {/* ✨ RIGHT SIDE CONTENT */}
      <div className="flex items-center justify-center px-8">
        <div className="max-w-md w-full">

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
  WELCOME TO <span className="text-orange-500">IIIT TRICHY</span>
</h1>

<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
  Canteen · Cafe · Connect 
</h2>


          {/* QUOTE */}
          <p className="text-gray-600 text-lg mb-8">
            Craving something delicious?  
            <br />
            Let’s get you started with good food 🍔
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/register")}
              className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Register
            </button>

            <button
              onClick={() => navigate("/login")}
              className="flex-1 border-2 border-orange-500 text-orange-500 py-3 rounded-xl font-semibold hover:bg-orange-50 transition"
            >
              Login
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
