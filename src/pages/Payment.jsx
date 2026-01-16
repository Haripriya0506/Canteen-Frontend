import React from "react";
import { useCart } from "../context/CartContext";

export default function Payment() {
  const { cart, totalAmount } = useCart();

  if (cart.length === 0) {
    return <p className="p-6 text-lg">Cart is empty 😕</p>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Payment</h2>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>
            {item.name} × {item.qty}
          </span>
          <span>₹{item.price * item.qty}</span>
        </div>
      ))}
      
      <img
  src="/readyah.png"
  alt="Success"
  className="w-48 mx-auto pop-in"
/>
<h2 className="text-2xl font-bold text-green-600 text-center">
  Order Placed Successfully 🎉
</h2>



      <hr className="my-4" />

      <h3 className="text-xl font-bold">
        Total: ₹{totalAmount}
      </h3>

      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded">
        Payment done!!
      </button>
    </div>
  );
}
