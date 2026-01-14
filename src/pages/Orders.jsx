import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-xl text-gray-500">
        Your cart is empty 😕
      </div>
    );
  }

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Your Cart 🛒</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-500 text-sm">
              ₹{item.price} × {item.quantity}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold">
              ₹{item.price * item.quantity}
            </span>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 font-semibold"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-6 border-t pt-4">
        <h3 className="text-xl font-bold">Total</h3>
        <h3 className="text-xl font-bold text-green-600">
          ₹{totalAmount}
        </h3>
      </div>

      <button
        onClick={() => navigate("/dashboard/payment")}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
