import React from "react";
const TabButton = ({ active = false, onClick, text, icon: Icon }) => {
  return (
    <button
      className={`flex items-center space-x-2 px-4 py-2 font-medium transition-colors duration-200 ${
        active
          ? "border-b-2 border-blue-500 text-blue-600"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
      }`}
      onClick={onClick}
      type="button"
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{text}</span>
    </button>
  );
};
export default TabButton;
