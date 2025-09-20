import React from "react";
import "./index.css";

export function Awards() {
  const items = [
    "Innovation Award for internal tooling",
    "Skunkworks 4th Place (out of 40 teams) – Developed object detection model using TensorFlow to improve mobile buying experience",
    "Spot Award for delivery, teamwork, and initiative",
  ];

  return (
    <div className="awards">
      <div className="title flex justify-between">
        <div className="title section-title">Awards</div>
      </div>
      <ul className="list-disc section-content text-sm">
        {items.map((item, idx) => (
          <li key={idx} className="mlr-16">{item}</li>
        ))}
      </ul>
    </div>
  );
}
