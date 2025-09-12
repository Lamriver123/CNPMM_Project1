import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex", justifyContent: "center", alignItems: "center"
      }}
    >
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
        {children}
        <button onClick={onClose} style={{ marginTop: "10px" }}>Đóng</button>
      </div>
    </div>
  );
};
