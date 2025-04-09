import React from "react";

type LeftHalfModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const LeftHalfModal: React.FC<LeftHalfModalProps> = ({ children, onClose }) => {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "stretch",
    zIndex: 1000,
  },
  modal: {
    width: "50vw",
    height: "100%",
    backgroundColor: "white",
    padding: "20px",
    boxSizing: "border-box",
    overflowY: "auto",
    boxShadow: "4px 0 12px rgba(0,0,0,0.2)",
  },
};

export default LeftHalfModal;
