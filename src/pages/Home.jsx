//Still eating hostel food? 😭 Your taste buds deserve better—order now!
import React, { useEffect, useState } from "react";
import { getMenu, deleteMenuItem } from "../api/menuApi";
import { FiSearch, FiMoreVertical } from "react-icons/fi";
import { useCart } from "../context/CartContext";

/* ================= IMAGE MATCHER ================= */
const getImageByName = (name = "") => {
  const key = name.toLowerCase().replace(/\s+/g, "");

  if (key.includes("chickencurrywithrice")) return "/chickencurry.jpg";
  if (key.includes("chickencurry")) return "/chickencurry.jpg";
  if (key.includes("chicken65")) return "/chicken65.jpg";
  if (key.includes("chickenfriedrice")) return "/chickenfriedrice.jpg";
  if (key.includes("chickennoodles")) return "/chickennoodles.jpg";
  if (key.includes("eggcurry")) return "/eggcurry.jpg";

  if (key.includes("muttonbiryani")) return "/muttonbiryani.jpg";
  if (key.includes("biryani")) return "/biryani.jpg";

  if (key.includes("idly")) return "/idly.jpg";
  if (key.includes("dosa")) return "/dosa.jpg";
  if (key.includes("poori")) return "/poori.jpg";

  if (key.includes("vegmeals")) return "/vegmeals.jpg";
  if (key.includes("curdrice")) return "/curdrice.jpg";

  if (key.includes("vegburgerdeluxe")) return "/vegburgerdeluxe.jpg";
  if (key.includes("vegburger")) return "/vegburger.jpg";
  if (key.includes("maggie")) return "/maggie.jpg";
  if (key.includes("sandwich")) return "/vegsandwich.jpg";

  if (key.includes("chocolateicecream")) return "/chocolateicecream.jpg";
  if (key.includes("vanillaicecream")) return "/vanillaicecream.jpg";
  if (key.includes("strawberryicecream")) return "/strawberryicecream.jpg";

  if (key.includes("coldcoffee")) return "/coldcoffee.jpg";
  if (key.includes("coke")) return "/coke.jpg";
  if (key.includes("lemonjuice")) return "/lemonjuice.jpg";
  if (key.includes("orangejuice")) return "/orangejuice.jpg";
  if (key.includes("tea")) return "/tea.jpg";

  if (key.includes("gulabjamun")) return "/gulabjamun.jpg";

  return "/food.jpg";
};

/* ================= CATEGORY NORMALIZER ================= */
const normalizeCategory = (cat = "") => {
  const c = cat.toLowerCase();
  if (c.includes("special")) return "Specials";
  if (c.includes("icecream")) return "IceCream";
  if (c.includes("cool")) return "CoolDrinks";
  if (c.includes("beverage")) return "Beverages";
  return cat;
};

/* ================= HOME ================= */
export default function Home() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [toast, setToast] = useState("");

  const { addToCart } = useCart();
  const isAdmin = localStorage.getItem("role") === "ADMIN";

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const res = await getMenu();
      setMenu(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteMenuItem(id);
    loadMenu();
  };

  /* ✅ ADD TO CART (FINAL FIX) */
  const handleAddToCart = (item) => {
  const qty = addToCart(item);

  setToast(`${qty} item${qty > 1 ? "s" : ""} added to cart`);
  setTimeout(() => setToast(""), 2000);
};


  const categories = [
    "ALL",
    ...Array.from(new Set(menu.map((i) => normalizeCategory(i.category)))),
  ];

  const filteredMenu = menu.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "ALL" ||
      normalizeCategory(item.category) === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="bg-[#F8F8F8] min-h-screen px-8 py-6">
      <h2 className="text-3xl font-bold mb-4">
        Still eating hostel food? 😭 Your taste buds deserve better—order now!
      </h2>

      {/* CATEGORY */}
      <div className="flex gap-4 overflow-x-auto mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full ${
              category === cat
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md mb-8">
        <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full border"
        />
      </div>

      {/* MENU */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4"
            >
              <img
                src={item.imageUrl || getImageByName(item.name)}
                onError={(e) => (e.target.src = getImageByName(item.name))}
                className="h-36 w-full object-cover rounded mb-3"
              />

              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">
                {normalizeCategory(item.category)}
              </p>
              <p className="font-bold">₹{item.price}</p>

              <button
                onClick={() => handleAddToCart(item)}
                className="mt-3 w-full bg-orange-500 text-white py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full">
          ✅ {toast}
        </div>
      )}
    </div>
  );
}
