import React from "react";

const Button = ({ title, onClick }) => {
  return (
    <button
      className="w-full md:w-auto px-4 py-2 rounded-md bg-blue-700 text-white"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
