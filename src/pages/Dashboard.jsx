import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiHome, FiMenu, FiShoppingBag, FiCreditCard, FiUser } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-orange-500 mb-8">
          🍽️ IIIT Trichy Canteen
        </h2>

        <nav className="flex flex-col gap-4 font-medium">
          <NavLink to="/dashboard" end className="sidebar-link">
            <FiHome /> Home
          </NavLink>
          <NavLink to="/dashboard/menu" className="sidebar-link">
            <FiMenu /> Menu
          </NavLink>
          <NavLink to="/dashboard/orders" className="sidebar-link">
            <FiShoppingBag /> Orders
          </NavLink>
          <NavLink to="/dashboard/payment" className="sidebar-link">
            <FiCreditCard /> Payment
          </NavLink>
          <NavLink to="/dashboard/profile" className="sidebar-link">
            <FiUser /> Profile
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
