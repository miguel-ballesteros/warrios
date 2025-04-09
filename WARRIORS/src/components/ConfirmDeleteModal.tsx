import React from "react";

interface Props {
  warriorName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteModal: React.FC<Props> = ({
  warriorName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h3>¿Eliminar guerrero?</h3>
        <p>
          ¿Estás seguro que deseas eliminar <strong>{warriorName}</strong>?
        </p>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
          <button
            onClick={onCancel}
            style={{
              backgroundColor: "#ccc",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
