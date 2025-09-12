import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      style={{
        padding: "10px 16px",
        borderRadius: "8px",
        border: "none",
        background: "#4CAF50",
        color: "white",
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  );
};
