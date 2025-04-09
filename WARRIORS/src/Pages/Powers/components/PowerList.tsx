import { useState } from "react"
import { Power } from "../../../models/Power"
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal"
import EditPowerModal from "./EditPowerModal"
import CreatePowerModal from "./CreatePowerModal"
export default function PowerList() {
  const [powers, setPowers] = useState<Power[]>(Power.getAll())
  const [selectedPower, setSelectedPower] = useState<Power | null>(null)
  const [editingPower, setEditingPower] = useState<Power | null>(null)
  const [creating, setCreating] = useState(false)
  const handleDelete = (id: number) => {
    Power.deleteById(id)
    setPowers(Power.getAll())
    setSelectedPower(null)
  }
  const handleSaveEdit = (updated: Power) => {
    Power.update(updated)
    setPowers(Power.getAll())
    setEditingPower(null)
  }
  const handleCreate = (newPower: Power) => {
    Power.create(newPower)
    setPowers(Power.getAll())
    setCreating(false)
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      <div
        onClick={() => setCreating(true)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f3e8ff",
          border: "2px dashed #a855f7",
          cursor: "pointer",
          borderRadius: "16px",
          height: "160px",
          minWidth: "250px",
          flex: "1 1 calc(33.33% - 20px)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.05)"
        }}
      >
        <span style={{ fontSize: "32px", color: "#9333ea" }}>＋</span>
      </div>
      {powers.map((power) => (
        <div
          key={power.id}
          style={{
            background: "#fff",
            border: "1px solid #e0d4f7",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
            flex: "1 1 calc(33.33% - 20px)",
            minWidth: "250px",
            height: "160px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <h2 style={{ color: "#6b21a8", fontWeight: "600" }}>💥 {power.name}</h2>
            <p><strong>Daño:</strong> {power.damage}</p>
            <p><strong>Efecto:</strong> {power.effect}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <button
              onClick={() => setEditingPower(power)}
              style={{
                backgroundColor: "#3b82f6",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Editar
            </button>
            <button
              onClick={() => setSelectedPower(power)}
              style={{
                backgroundColor: "#ef4444",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      {selectedPower && (
        <ConfirmDeleteModal
          warriorName={selectedPower.name}
          onConfirm={() => handleDelete(selectedPower.id)}
          onCancel={() => setSelectedPower(null)}
        />
      )}
      {editingPower && (
        <EditPowerModal
          power={editingPower}
          onSave={handleSaveEdit}
          onCancel={() => setEditingPower(null)}
        />
      )}
      {creating && (
        <CreatePowerModal
          onCreate={handleCreate}
          onCancel={() => setCreating(false)}
        />
      )}
    </div>
  )
}
