import { useState } from "react"
import { TypeWarrior } from "../../../models/TypeWarrior"

interface EditTypeModalProps {
  typeWarrior: TypeWarrior
  onSave: (updated: TypeWarrior) => void
  onCancel: () => void
}

export default function EditTypeModal({ typeWarrior, onSave, onCancel }: EditTypeModalProps) {
  const [name, setName] = useState(typeWarrior.name)
  const [description, setDescription] = useState(typeWarrior.description)
  const [basePower, setBasePower] = useState(typeWarrior.basePower)

  const handleSubmit = () => {
    const updated = new TypeWarrior(typeWarrior.id, name, description, basePower)
    onSave(updated)
  }

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.container}>
        <h2 style={{ marginTop: 0 }}>Editar Tipo de Guerrero</h2>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nombre"
          style={modalStyles.input}
        />
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Descripción"
          style={modalStyles.input}
        />
        <input
          type="number"
          value={basePower}
          onChange={e => setBasePower(Number(e.target.value))}
          placeholder="Poder base"
          style={modalStyles.input}
        />
        <div style={modalStyles.actions}>
          <button onClick={handleSubmit} style={modalStyles.saveButton}>Guardar</button>
          <button onClick={onCancel} style={modalStyles.cancelButton}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

const modalStyles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  container: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  saveButton: {
    backgroundColor: "#4ade80",
    color: "#000",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#f87171",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
}
