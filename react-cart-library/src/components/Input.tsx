
import React from "react";

type InputProps = {
  value: string;
  onChange: (val: string) => void;
};

export const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        width: "100%"
      }}
    />
  );
};
