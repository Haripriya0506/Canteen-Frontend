import React from "react";
import "./DeliveryScene.css";

const DeliveryScene = () => {
  return (
    <div className="scene">
      {/* ☁️ Clouds */}
      <img src="/cloud.png" alt="cloud" className="cloud cloud1" />
      <img src="/cloud.png" alt="cloud" className="cloud cloud2" />

      {/* 🏙️ Buildings */}
      <img
        src="/buildings.png"
        alt="buildings"
        className="buildings"
      />

      {/* 🚴 Delivery Bike */}
      <img
        src="/delivery.png"
        alt="delivery bike"
        className="bike"
      />

      {/* 🛣️ Road */}
      <img
        src="/road.png"
        alt="road"
        className="road"
      />
    </div>
  );
};

export default DeliveryScene;
