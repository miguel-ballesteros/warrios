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
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const API_URL = "http://127.0.0.1:8000/api/v1"
    try {
      const response = await fetch(`${API_URL}/warriors/${warrior.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          warrior_name: name,
          warriors_health: life,
          warriors_energy: energy,
          breed_fk: warrior.breed?.id ?? 0,
          type_Warrior_fk: warrior.typeWarrior?.id ?? 0,
          power_fk: warrior.powers?.[0]?.id ?? 0, // o ajusta si son múltiples poderes
        }),
      })

      if (!response.ok) {
        throw new Error("Error al actualizar el guerrero")
      }

      const updated = await response.json()
      onUpdate(updated)
      onClose()
    } catch (error) {
      alert("Hubo un error al actualizar el guerrero.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">Editar Guerrero</h2>

        <div className="space-y-4">
          <Field label="Nombre" value={name} onChange={setName} />
          <Field label="Vida" type="number" value={life} onChange={(val) => setLife(Number(val))} />
          <Field label="Energía" type="number" value={energy} onChange={(val) => setEnergy(Number(val))} />
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  value: string | number
  onChange: (val: string) => void
  type?: "text" | "number"
}

const Field: React.FC<FieldProps> = ({ label, value, onChange, type = "text" }) => (
  <div className="flex items-center">
    <label className="w-28 font-semibold">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-black"
    />
  </div>
)
