import { useCart } from "../context/CartContext";

export default function FoodCard({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img src={item.imageUrl} className="h-40 w-full object-cover rounded" />
      <h3 className="font-semibold mt-2">{item.name}</h3>
      <p className="font-bold">₹{item.price}</p>

      <button
        onClick={() => addToCart(item)}
        className="mt-3 w-full bg-orange-500 text-white py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
