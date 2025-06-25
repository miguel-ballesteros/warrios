import React, { useState } from "react"
import { Breed } from "../../../models/Breed"

interface Props {
  onCreate: (newBreed: Breed) => void
  onCancel: () => void
}

export default function CreateBreedModal({ onCreate, onCancel }: Props) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [resistance, setResistance] = useState("")
  const randomId = Date.now() + Math.floor(Math.random() * 1000)
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "16px",
        width: "400px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ fontSize: "20px", marginBottom: "16px", color: "#6b21a8" }}>
          Crear nueva raza
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          style={{ width: "100%", padding: "8px", marginBottom: "8px", border: "1px solid #ccc", borderRadius: "8px" }}
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          style={{ width: "100%", padding: "8px", marginBottom: "8px", border: "1px solid #ccc", borderRadius: "8px" }}
        />
        <input
          value={resistance}
          onChange={(e) => setResistance(e.target.value)}
          placeholder="Resistencia"
          style={{ width: "100%", padding: "8px", marginBottom: "16px", border: "1px solid #ccc", borderRadius: "8px" }}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <button
            onClick={onCancel}
            style={{
              backgroundColor: "#e5e7eb",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none"
            }}
          >
            Cancelar
          </button>
          <button
            onClick={() =>
              onCreate(new Breed(randomId, name, description, resistance))
            }
            style={{
              backgroundColor: "#9333ea",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none"
            }}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  )
}
