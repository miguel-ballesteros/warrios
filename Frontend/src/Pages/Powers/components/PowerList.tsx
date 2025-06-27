import { useEffect, useState } from "react"
import { CreatePower,  UpdatePower } from "../../../models/Power"
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal"
import EditPowerModal from "./EditPowerModal"
import CreatePowerModal from "./CreatePowerModal"
import {
  getAllPowers,
  createPower,
  updatePower,
  deletePower
} from "../service/service"

export default function PowerList() {
  const [powers, setPowers] = useState<UpdatePower[]>([])
  const [selectedPower, setSelectedPower] = useState<UpdatePower | null>(null)
  const [editingPower, setEditingPower] = useState<UpdatePower | null>(null)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchPowers()
  }, [])

  const fetchPowers = async () => {
    const data = await getAllPowers()
    setPowers(data)
  }

  const handleDelete = async (id: number) => {
    await deletePower(id)
    fetchPowers()
    setSelectedPower(null)
  }

  const handleSaveEdit = async (updated: UpdatePower) => {
    await updatePower(updated)
    fetchPowers()
    setEditingPower(null)
  }

  const handleCreate = async (newPower: CreatePower) => {
    await createPower(newPower)
    fetchPowers()
    setCreating(false)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {/* Crear nuevo poder */}
      <div
        onClick={() => setCreating(true)}
        className="flex items-center justify-center h-40 min-w-[250px] border-2 border-dashed border-gray-400 bg-gray-100 rounded-2xl shadow hover:shadow-md cursor-pointer transition"
      >
        <span className="text-4xl text-gray-800">＋</span>
      </div>

      {/* Lista de poderes */}
      {powers.map((power) => (
        <div
          key={power.id}
          className="bg-white border border-gray-300 p-5 rounded-2xl shadow hover:shadow-md transition flex flex-col justify-between h-40"
        >
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">💥 {power.name}</h2>
            <p className="text-sm text-gray-700">
              <strong>Daño:</strong> {power.attack_power}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Efecto:</strong> {power.power_effect}
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setEditingPower(power)}
              className="bg-gray-800 text-white text-sm px-4 py-1 rounded-lg hover:bg-gray-900 transition"
            >
              Editar
            </button>
            <button
              onClick={() => setSelectedPower(power)}
              className="bg-red-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-red-700 transition"
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
