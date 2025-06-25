import { useState } from "react"
import { Power } from "../../../models/Power"

interface EditPowerModalProps {
  power: Power
  onSave: (updated: Power) => void
  onCancel: () => void
}
export default function EditPowerModal({ power, onSave, onCancel }: EditPowerModalProps) {
  const [name, setName] = useState(power.name)
  const [damage, setDamage] = useState<number>(power.damage)
  const [effect, setEffect] = useState(power.effect)
  const handleSave = () => {
    const updatedPower = new Power(power.id, name, damage, effect)
    onSave(updatedPower)
  }
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={{ marginTop: 0, textAlign: "center" }}>✏️ Editar Poder</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del poder"
            style={styles.input}
          />
          <input
            type="number"
            value={damage}
            onChange={(e) => setDamage(Number(e.target.value))}
            placeholder="Daño"
            style={{ ...styles.input, resize: "none", height: "80px" }}
          />
          <input
            type="text"
            value={effect}
            onChange={(e) => setEffect(e.target.value)}
            placeholder="Efecto"
            style={styles.input}
          />
        </div>
        <div style={styles.actions}>
          <button onClick={onCancel} style={styles.cancelButton}>
            Cancelar
          </button>
          <button onClick={handleSave} style={styles.saveButton}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    width: "400px",
    maxWidth: "90%",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    position: "relative"
  },
  input: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px"
  },
  cancelButton: {
    backgroundColor: "#e5e7eb",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer"
  },
  saveButton: {
    backgroundColor: "#9333ea",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer"
  }
}
