import { useEffect, useState } from "react"
import { Breed, EditBrred } from "../../../models/Breed"
import EditBreedModal from "./EditBreedModal"
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal"
import CreateBreedModal from "./CreateBreedModal"
import {
  getAllBreeds,
  createBreed,
  updateBreed,
  deleteBreed,
} from "../service/service"

export default function BreedList() {
  const [breeds, setBreeds] = useState<EditBrred[]>([])
  const [selectedBreed, setSelectedBreed] = useState<EditBrred | null>(null)
  const [editingBreed, setEditingBreed] = useState<EditBrred | null>(null)
  const [creatingNew, setCreatingNew] = useState<boolean>(false)

  useEffect(() => {
    fetchBreeds()
  }, [])

  const fetchBreeds = async () => {
    const data = await getAllBreeds()
    setBreeds(data)
  }

  const handleDelete = async (id: number) => {
    await deleteBreed(id)
    fetchBreeds()
    setSelectedBreed(null)
  }

  const handleSaveEdit = async (updated: Breed) => {
    if (updated.id === 0) {
      await createBreed(updated)
    } else {
      await updateBreed(updated)
    }
    fetchBreeds()
    setEditingBreed(null)
    setCreatingNew(false)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          className="bg-white border border-black rounded-2xl p-6 text-black font-bold text-3xl flex items-center justify-center hover:bg-gray-100 cursor-pointer transition"
          onClick={() => setCreatingNew(true)}
        >
          ＋
        </div>

        {breeds.map((breed) => (
          <div
            key={breed.id}
            className="bg-white border border-black rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-black mb-2">
              🧬 {breed.name}
            </h2>
            <p className="text-gray-800 mb-4">
              <strong>Resistencia:</strong> {breed.breed_Resistance}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingBreed(breed)}
                className="bg-black text-white px-4 py-1 rounded hover:bg-gray-900 transition"
              >
                Editar
              </button>
              <button
                onClick={() => setSelectedBreed(breed)}
                className="bg-white border border-black text-black px-4 py-1 rounded hover:bg-gray-200 transition"
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
          onCreate={async (newBreed) => {
            await createBreed(newBreed)
            fetchBreeds()
            setCreatingNew(false)
          }}
          onCancel={() => setCreatingNew(false)}
        />
      )}
    </div>
  )
}
