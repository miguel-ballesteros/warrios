import { useEffect, useState } from "react"
import { EditTypeWarrior, TypeWarrior } from "../../../models/TypeWarrior"
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal"
import EditTypeModal from "./EditTypeModal"
import CreateTypeModal from "./CreateTypeModal"
import {
  getAllTypeWarriors,
  createTypeWarrior,
  updateTypeWarrior,
  deleteTypeWarrior,
} from "../service/service"

export default function TypeWarriorList() {
  const [types, setTypes] = useState<EditTypeWarrior[]>([])
  const [selectedType, setSelectedType] = useState<EditTypeWarrior | null>(null)
  const [editingType, setEditingType] = useState<EditTypeWarrior | null>(null)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchTypes()
  }, [])

  const fetchTypes = async () => {
    const data = await getAllTypeWarriors()
    setTypes(data)
  }

  const handleDelete = async (id: number) => {
    await deleteTypeWarrior(id)
    fetchTypes()
    setSelectedType(null)
  }

  const handleSaveEdit = async (updated: TypeWarrior) => {
    await updateTypeWarrior(updated)
    fetchTypes()
    setEditingType(null)
  }

  const handleCreate = async (newType: TypeWarrior) => {
    await createTypeWarrior(newType)
    fetchTypes()
    setCreating(false)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        onClick={() => setCreating(true)}
        className="bg-white border-2 border-dashed border-black rounded-xl p-6 flex items-center justify-center text-3xl text-black font-bold cursor-pointer hover:bg-gray-50"
      >
        ＋
      </div>

      {types.map((type) => (
        <div
          key={type.id}
          className="bg-white border border-gray-300 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold text-black mb-1">
              ⚔️ {type.name}
            </h2>
            <p className="text-gray-700 text-sm mb-1">
              <strong>Descripción:</strong> {type.description}
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setEditingType(type)}
              className="bg-black text-white px-4 py-1 rounded hover:bg-gray-900 transition"
            >
              Editar
            </button>
            <button
              onClick={() => setSelectedType(type)}
              className="bg-white border border-black text-black px-4 py-1 rounded hover:bg-gray-200 transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

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
