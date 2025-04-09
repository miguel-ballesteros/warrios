import React, { useState } from "react"
import { Breed } from "../../../models/Breed"

interface Props {
  breed: Breed
  onSave: (updated: Breed) => void
  onCancel: () => void
}
export default function EditBreedModal({ breed, onSave, onCancel }: Props) {
  const [name, setName] = useState(breed.name)
  const [description, setDescription] = useState(breed.description)
  const [resistance, setResistance] = useState(breed.breedResistance)
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          width: "400px",
          borderRadius: "1rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Editar Raza: {breed.name}
        </h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1rem",
            border: "1px solid #ddd",
            borderRadius: "0.5rem",
            fontSize: "1rem",
          }}
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1rem",
            border: "1px solid #ddd",
            borderRadius: "0.5rem",
            fontSize: "1rem",
          }}
        />
        <input
          value={resistance}
          onChange={(e) => setResistance(e.target.value)}
          placeholder="Resistencia"
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "0.5rem",
            fontSize: "1rem",
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <button
            onClick={onCancel}
            style={{
              backgroundColor: "#e5e7eb",
              color: "#374151",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={() =>
              onSave(new Breed(breed.id, name, description, resistance))
            }
            style={{
              backgroundColor: "#8b5cf6",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
