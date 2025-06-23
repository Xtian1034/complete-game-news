import React from "react";

function ToggleButton({ label, isOn, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: "150px",
        height: "50px",
        borderRadius: "999px",
        backgroundColor: isOn ? "green" : "gray",
        color: "white",
        fontWeight: "bold",
        border: "none",
        cursor: "pointer",
        marginRight: "10px",
        transition: "backgorund-color 0.3s",
      }}
    >
      {label}: {isOn ? "On" : "Off"}
    </button>
  );
}

export default ToggleButton;
