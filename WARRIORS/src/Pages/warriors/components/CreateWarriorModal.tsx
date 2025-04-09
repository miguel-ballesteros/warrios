import React, { useState, useEffect } from "react"
import { Breed } from "../../../models/Breed"
import { Power } from "../../../models/Power"
import { TypeWarrior } from "../../../models/TypeWarrior"
import { Warrior } from "../../../models/Warrior"

interface Props {
  onClose: () => void
  onCreate: (warrior: Warrior) => void
}

export const CreateWarriorModal: React.FC<Props> = ({ onClose, onCreate }) => {
  const [name, setName] = useState("")
  const [life, setLife] = useState(100)
  const [energy, setEnergy] = useState(50)
  const [image, setImage] = useState<string | null>(null)
  const [breed, setBreed] = useState<Breed | null>(null)
  const [type, setType] = useState<TypeWarrior | null>(null)
  const [selectedPowers, setSelectedPowers] = useState<Power[]>([])
  const [breeds, setBreeds] = useState<Breed[]>([])
  const [types, setTypes] = useState<TypeWarrior[]>([])
  const [powers, setPowers] = useState<Power[]>([])
  useEffect(() => {
    setBreeds(Breed.getAll())
    setTypes(TypeWarrior.getAll())
    setPowers(Power.getAll())
  }, [])
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleAddPower = (id: number) => {
    const foundPower = powers.find((p) => p.id === id)
    if (foundPower && !selectedPowers.find((p) => p.id === foundPower.id)) {
      setSelectedPowers([...selectedPowers, foundPower])
    }
  }
  const handleRemovePower = (id: number) => {
    setSelectedPowers(selectedPowers.filter((p) => p.id !== id))
  }
  const handleSubmit = () => {
    if (!name || !breed || !type || selectedPowers.length === 0) {
      alert("Completa todos los campos")
      return
    }
    const newWarrior = Warrior.create(
      name,
      image || "",
      life,
      energy,
      breed,
      type,
      selectedPowers
    )
    onCreate(newWarrior)
    onClose()
  }

  return (
    <div style={modalOverlay}>
      <div style={modalContainer}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Crear Guerrero</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Vida"
          value={life}
          onChange={(e) => setLife(Number(e.target.value))}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Energía"
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
          style={inputStyle}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} style={inputStyle} />
        {image && (
          <img
            src={image}
            alt="Preview"
            style={{ width: "100%", height: "auto", marginBottom: "12px", borderRadius: "8px" }}
          />
        )}
        <select
          onChange={(e) => setBreed(breeds.find((b) => b.id === Number(e.target.value)) || null)}
          style={inputStyle}
        >
          <option value="">Selecciona Raza</option>
          {breeds.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
        <select
          onChange={(e) => setType(types.find((t) => t.id === Number(e.target.value)) || null)}
          style={inputStyle}
        >
          <option value="">Selecciona Tipo</option>
          {types.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <select
          onChange={(e) => handleAddPower(Number(e.target.value))}
          style={inputStyle}
        >
          <option value="">Selecciona Poder</option>
          {powers.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <div style={{ marginBottom: "12px" }}>
          {selectedPowers.map((p) => (
            <div key={p.id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f0f0f0",
              padding: "6px 10px",
              marginBottom: "6px",
              borderRadius: "6px"
            }}>
              <span>{p.name}</span>
              <button
                onClick={() => handleRemovePower(p.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={onClose} style={buttonSecondary}>Cancelar</button>
          <button onClick={handleSubmit} style={buttonPrimary}>Crear</button>
        </div>
      </div>
    </div>
  )
}

const modalOverlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
}

const modalContainer: React.CSSProperties = {
  background: "#fff",
  padding: "30px",
  borderRadius: "16px",
  width: "420px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
}

const buttonPrimary: React.CSSProperties = {
  padding: "10px 20px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
}

const buttonSecondary: React.CSSProperties = {
  padding: "10px 20px",
  background: "#ccc",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
}
