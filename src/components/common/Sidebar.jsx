import React from "react";
import { useState } from "react";
import { BarChart3, Bell, User } from "lucide-react";
import icon from "../common/icon.jpg"
const buttonStyle = {
  width: "100%",
  padding: "20px",
  marginBottom: "40px",
  display: "flex",
  alignItems: "center",
  border: "2px solid #2563eb",
  borderRadius: "8px",
  color: "#2563eb",
  backgroundColor: "white",
  cursor: "pointer",
  transition: "all 0.2s",
  fontSize: "17px",
};
const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#1d4ed8",
  color: "white",
  borderColor: "#1d4ed8",
};

const iconStyle = { marginRight: "16px", width: "24px", height: "24px" };
const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);
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
  const currentPath = window.location.pathname;
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "white",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      
      <img src={icon}
       
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "0px",
          color: "#2563eb",
          fontFamily: "'Orbitron', sans-serif",
          letterSpacing: "2px",
          textShadow: "2px 2px 4px rgba(37, 99, 235, 0.1)",
          paddingBottom: "15px",
        }}
      
      >
     
       
      </img>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          flexGrow: 1,
          marginTop: "40px",
        }}
      >
       
        <button
          onClick={() => (window.location.pathname = "/admin")}
          style={currentPath === "/admin" ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => {
            if (currentPath !== "/admin") {
              e.currentTarget.style.backgroundColor = "#1d4ed8";
              e.currentTarget.style.color = "white";
            }
          }}
          onMouseOut={(e) => {
            if (currentPath !== "/admin") {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#2563eb";
            }
          }}
        >
          <BarChart3 style={iconStyle} />
          <span style={{ fontWeight: "500" }}>Admin</span>
        </button>
        <button
          onClick={() => (window.location.pathname = "/user")}
          style={currentPath === "/user" ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => {
            if (currentPath !== "/user") {
              e.currentTarget.style.backgroundColor = "#1d4ed8";
              e.currentTarget.style.color = "white";
            }
          }}
          onMouseOut={(e) => {
            if (currentPath !== "/user") {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#2563eb";
            }
          }}
        >
          <User style={iconStyle} />
          <span style={{ fontWeight: "500" }}>User</span>
        </button>
        <button
          onClick={() => (window.location.pathname = "/reports")}
          style={currentPath === "/reports" ? activeButtonStyle : buttonStyle}
          onMouseOver={(e) => {
            if (currentPath !== "/reports") {
              e.currentTarget.style.backgroundColor = "#1d4ed8";
              e.currentTarget.style.color = "white";
            }
          }}
          onMouseOut={(e) => {
            if (currentPath !== "/reports") {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#2563eb";
            }
          }}
        >
          <Bell style={iconStyle} />
          <span style={{ fontWeight: "500" }}>Reports</span>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
