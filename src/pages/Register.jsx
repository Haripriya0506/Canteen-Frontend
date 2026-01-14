import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        age: Number(form.age),
        password: form.password,
      });

      alert("Registered successfully 🎉");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#fff7ed]">

      {/* 🔥 LEFT SIDE – BIG FOOD IMAGE */}
      <div className="hidden md:flex items-center justify-center">
        <img
          src="/appii.png"
          alt="Food"
          className="w-[800px]"
        />
      </div>

      {/* 🔐 RIGHT SIDE – YOUR SAME FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-10">

          <h2 className="text-3xl font-extrabold text-center mb-2">
            Welcome to IIIT Trichy Canteen
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Are you looking for some good food? <br />
            Register here 🍕🍔
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border rounded-2xl"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border rounded-2xl"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border rounded-2xl"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border rounded-2xl"
              />
              <span
                className="absolute right-5 top-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border rounded-2xl"
              />
              <span
                className="absolute right-5 top-5 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-500 cursor-pointer font-semibold"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
