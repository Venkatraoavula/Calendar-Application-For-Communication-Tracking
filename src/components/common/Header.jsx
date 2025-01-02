import React, { useState } from "react";
const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const titleStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#2563eb",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "2px",
    textShadow: "2px 2px 4px rgba(37, 99, 235, 0.1)",
    position: "relative",
    cursor: "pointer",
    paddingBottom: "15px",
    display: "inline-block",
    
  };
  const underlineStyle = {
    content: '""',
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "3px",
    backgroundColor: "#2563eb",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scaleX(1)" : "scaleX(0)",
    transformOrigin: isHovered ? "left" : "right",
  };
  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex items-center justify-center">
        <h1
          style={titleStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >CALENDAR APPLICATION FOR COMMUNICATION TRACKING
          <div style={underlineStyle} />
        </h1>
      </div>
    </header>
  );
};
export default Header;
