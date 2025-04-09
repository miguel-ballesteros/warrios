import { useState } from "react"
import { TypeWarrior } from "../../../models/TypeWarrior"

import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal"
import EditTypeModal from "./EditTypeModal"
import CreateTypeModal from "./CreateTypeModal"

export default function TypeWarriorList() {
  const [types, setTypes] = useState<TypeWarrior[]>(TypeWarrior.getAll())
  const [selectedType, setSelectedType] = useState<TypeWarrior | null>(null)
  const [editingType, setEditingType] = useState<TypeWarrior | null>(null)
  const [creating, setCreating] = useState(false)

  const handleDelete = (id: number) => {
    TypeWarrior.deleteById(id)
    setTypes(TypeWarrior.getAll())
    setSelectedType(null)
  }

  const handleSaveEdit = (updated: TypeWarrior) => {
    TypeWarrior.update(updated)
    setTypes(TypeWarrior.getAll())
    setEditingType(null)
  }

  const handleCreate = (newType: TypeWarrior) => {
    TypeWarrior.create(newType)
    setTypes(TypeWarrior.getAll())
    setCreating(false)
  }

  return (
    <div>
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

        {types.map((type) => (
          <div
            key={type.id}
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
              <h2 style={{ color: "#6b21a8", fontWeight: "600" }}>⚔️ {type.name}</h2>
              <p><strong>Descripción:</strong> {type.description}</p>
              <p><strong>Poder base:</strong> {type.basePower}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "10px" }}>
              <button
                onClick={() => setEditingType(type)}
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
                onClick={() => setSelectedType(type)}
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
      </div>

      {selectedType && (
        <ConfirmDeleteModal
          warriorName={selectedType.name}
          onConfirm={() => handleDelete(selectedType.id)}
          onCancel={() => setSelectedType(null)}
        />
      )}

      {editingType && (
        <EditTypeModal
          typeWarrior={editingType}
          onSave={handleSaveEdit}
          onCancel={() => setEditingType(null)}
        />
      )}

      {creating && (
        <CreateTypeModal
          onCreate={handleCreate}
          onCancel={() => setCreating(false)}
        />
      )}
    </div>
  )
}
