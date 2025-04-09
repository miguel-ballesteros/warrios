import React, { useState } from "react"
import { Warrior } from "../../../models/Warrior"

interface Props {
  warrior: Warrior
  onClose: () => void
  onUpdate: (updatedWarrior: Warrior) => void
}

export const EditWarriorModal: React.FC<Props> = ({ warrior, onClose, onUpdate }) => {
  const [name, setName] = useState(warrior.name)
  const [life, setLife] = useState(warrior.health)
  const [energy, setEnergy] = useState(warrior.energy)


  const handleSubmit = () => {
    warrior.update(name, life, energy)
    onUpdate(warrior)
    onClose()
  }

  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h2 style={titleStyle}>Editar Guerrero</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {renderField("Nombre:", name, setName)}
          {renderField("Vida:", life, (val) => setLife(Number(val)), "number")}
          {renderField("Energía:", energy, (val) => setEnergy(Number(val)), "number")}

        </div>

        <div style={footerStyle}>
          <button style={buttonPrimary} onClick={handleSubmit}>
            Guardar
          </button>
          <button style={buttonSecondary} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

const renderField = (
  label: string,
  value: string | number,
  onChange: (val: string) => void,
  type: "text" | "number" = "text"
) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <label style={{ width: "140px", fontWeight: 600 }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={inputStyle}
    />
  </div>
)

const modalOverlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
}

const modalContent: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "500px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
}

const titleStyle: React.CSSProperties = {
  marginBottom: "20px",
  textAlign: "center",
}

const footerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "30px",
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
}

const buttonPrimary: React.CSSProperties = {
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
}

const buttonSecondary: React.CSSProperties = {
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
}
