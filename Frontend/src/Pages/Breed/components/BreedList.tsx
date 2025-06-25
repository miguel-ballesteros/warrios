import { useState } from "react"
import { Breed } from "../../../models/Breed"
import EditBreedModal from "./EditBreedModal"
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal"
import CreateBreedModal from "./CreateBreedModal"

export default function BreedList() {
  const [breeds, setBreeds] = useState<Breed[]>(Breed.getAll())
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null)
  const [editingBreed, setEditingBreed] = useState<Breed | null>(null)
  const [creatingNew, setCreatingNew] = useState<boolean>(false)

  const handleDelete = (id: number) => {
    Breed.deleteById(id)
    setBreeds(Breed.getAll())
    setSelectedBreed(null)
  }

  const handleSaveEdit = (updated: Breed) => {
    if (updated.id === 0) {
      Breed.create(updated)
    } else {
      Breed.updateBreed(updated)
    }
    setBreeds(Breed.getAll())
    setEditingBreed(null)
    setCreatingNew(false)
  }

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid #e9d5ff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
  }

  return (
    <div>
      <div style={gridStyle}>
      <div
          style={{
            ...cardStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#7e22ce",
            fontWeight: "bold",
            fontSize: "24px",
          }}
          onClick={() => setCreatingNew(true)}
        >
          ＋
        </div>
        {breeds.map((breed) => (
          <div key={breed.id} style={cardStyle}>
            <h2 style={{ fontSize: "18px", color: "#6b21a8", marginBottom: "8px" }}>
              🧬 {breed.name}
            </h2>
            <p style={{ marginBottom: "4px", color: "#374151" }}>
              <strong>Descripción:</strong> {breed.description}
            </p>
            <p style={{ marginBottom: "16px", color: "#374151" }}>
              <strong>Resistencia:</strong> {breed.breedResistance}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                onClick={() => setEditingBreed(breed)}
                style={{
                  backgroundColor: "#3b82f6",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Editar
              </button>
              <button
                onClick={() => setSelectedBreed(breed)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

      </div>

      {selectedBreed && (
        <ConfirmDeleteModal
          warriorName={selectedBreed.name}
          onConfirm={() => handleDelete(selectedBreed.id)}
          onCancel={() => setSelectedBreed(null)}
        />
      )}
      {editingBreed && (
        <EditBreedModal
          breed={editingBreed}
          onSave={handleSaveEdit}
          onCancel={() => setEditingBreed(null)}
        />
      )}

      {creatingNew && (
        <CreateBreedModal
          onCreate={(newBreed) => {
            Breed.create(newBreed)
            setBreeds(Breed.getAll())
            setCreatingNew(false)
          }}
          onCancel={() => setCreatingNew(false)}
        />
      )}

    </div>
  )
}
