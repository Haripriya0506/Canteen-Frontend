
import React, { useEffect, useState } from "react";
import { getMenu } from "../api/menuApi";

export default function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu()
      .then((res) => setMenu(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Menu</h2>

      {menu.length === 0 && <p>No items available</p>}

      {menu.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}
