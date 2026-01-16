import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login as loginUser } from "../api/authApi";
import "./Login.css";
import DeliveryScene from "../components/DeliveryScene";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await loginUser(
      email.trim().toLowerCase(),   // ✅ normalize email
      password
    );
    navigate("/dashboard");
  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data);
    alert(err.response?.data?.message || "Invalid credentials");
  } finally {
    setLoading(false);
  }
  console.log("LOGIN EMAIL SENT:", email);
console.log("LOGIN PASSWORD SENT:", password);

};

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#f7f7f7]">

      {/* 🌆 LEFT: DELIVERY ANIMATION */}
      <div className="flex items-center justify-center p-4">
        <DeliveryScene />
      </div>

      {/* 🔐 RIGHT: LOGIN FORM */}
      <div className="flex items-center justify-center">
        <div className="login-card animate-slide">
          <h2 className="login-title">Login</h2>

          <p className="login-subtitle">
            Heyy IIITian.. Good food is just a login away 🍕
          </p>

          <form onSubmit={handleLogin} autoComplete="on">
            <div className="input-group">
              <input
                type="email"
                name="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="login-footer">
            New here?{" "}
            <span onClick={() => navigate("/register")}>
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
