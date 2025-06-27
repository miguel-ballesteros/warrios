import React, { useEffect, useState } from "react"
import { UpdateWarrior, Warrior } from "../../../models/Warrior"
import { Player } from "../../../models/Player"
import { CreateWarriorModal } from "./CreateWarriorModal"
import { EditWarriorModal } from "./EditWarriorModal"
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal"
import InfoBreed from "../../Breed/InfoBreed"
import InfoTypeWarrio from "../../TypeWarrrio/InfoTypeWarrio"
import InfoPower from "../../Powers/InfoPower"
import {
  getWarrior,
  deleteWarrior,
  updateWarrior,
  createWarrior,
} from "../service/service"

interface Props {
  player: Player
  onAssign: (warrior: Warrior) => void
}

export const AssignWarriorSection: React.FC<Props> = ({ player, onAssign }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [availableWarriors, setAvailableWarriors] = useState<UpdateWarrior[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showBreedModal, setShowBreedModal] = useState(false)
  const [editingWarrior, setEditingWarrior] = useState<Warrior | null>(null)
  const [deletingWarrior, setDeletingWarrior] = useState<Warrior | null>(null)
  const [showTypeWarrioModal, setShowTypeWarrioModal] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(false)
  const [showModalPower, setShowModalPower] = useState(false)

  useEffect(() => {
    const fetchWarriors = async () => {
      const data = await getWarrior()

      // Transformar la respuesta en instancias de Warrior
      const transformed = data.map((w: any) =>
        new Warrior(
          w.warrior_id,
          w.warrior_name,
          w.warriors_image,
          w.warriors_health,
          w.warriors_energy,
          { id: w.breed_fk, name: "Raza" }, // puedes remplazar con nombre real si lo tienes
          { id: w.type_Warrior_fk, name: "Tipo" },
          [{ id: w.power_fk, name: "Poder" }] // si solo puede tener 1 poder
        )
      )

      setAvailableWarriors(transformed)
    }
    fetchWarriors()
  }, [])

  const handleCreate = async (newWarriorData: any) => {
    const newWarrior = await createWarrior(newWarriorData)
    setAvailableWarriors((prev) => [...prev, newWarrior])
    onAssign(newWarrior)
    setShowCreateModal(false)
  }

  const handleUpdate = async (updated: Warrior) => {
    const updatedWarrior = await updateWarrior(updated)
    setAvailableWarriors((prev) =>
      prev.map((w) => (w.id === updatedWarrior.id ? updatedWarrior : w))
    )
    setEditingWarrior(null)
  }

  const handleDelete = async (warriorId: number) => {
    await deleteWarrior(warriorId)
    setAvailableWarriors((prev) => prev.filter((w) => w.id !== warriorId))
    setDeletingWarrior(null)
  }

  const filteredWarriors = availableWarriors
    .filter((warrior) => !!warrior.name) // solo los que tienen nombre
    .filter((warrior) =>
      warrior.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="mt-12">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar guerrero por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-black rounded-full w-64"
        />

        {/* Contenedor relativo para el botón y el menú */}
        <div className="relative">
          <button
            onClick={() => setOpenMenuId(!openMenuId)}
            className="border border-black rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-black hover:text-white transition"
          >
            ⚙️
          </button>

          {openMenuId && (
            <div className="absolute right-0 top-full mt-2 bg-white shadow-lg border border-black rounded-lg z-50 w-52">
              <button
                onClick={() => {
                  setShowTypeWarrioModal(true)
                  setOpenMenuId(false)
                }}
                className={menuItemStyle}
              >
                Tipo de Guerrero
              </button>
              <button
                onClick={() => {
                  setShowBreedModal(true)
                  setOpenMenuId(false)
                }}
                className={menuItemStyle}
              >
                Raza
              </button>
              <button
                onClick={() => {
                  setShowModalPower(true)
                  setOpenMenuId(false)
                }}
                className={menuItemStyle}
              >
                Poderes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          onClick={() => setShowCreateModal(true)}
          className="border-2 border-dashed border-gray-400 flex items-center justify-center h-72 rounded-lg cursor-pointer hover:scale-105 transition"
        >
          <span className="text-4xl">➕</span>
        </div>

        {filteredWarriors.map((warrior) => {
          const isAssigned = player.warriors.some((w) => w.id === warrior.id)
          console.log("isAssigned", warrior)
          return (
            <div
              key={warrior.id}
              onClick={() => !isAssigned && onAssign(warrior)}
              className={`p-4 rounded-xl shadow-md border border-black relative transition transform hover:scale-105 ${isAssigned ? "bg-gray-200 cursor-not-allowed" : "bg-white cursor-pointer"}`}
            >
              {warrior.health ? (
                <img
                  src={warrior.health}
                  alt={warrior.name}
                  className="w-full h-28 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="w-full h-28 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md mb-2">
                  Sin imagen
                </div>
              )}
              <div className="font-bold text-lg mb-1">{warrior.name}</div>
              <div className="text-sm space-y-1">
                <p>Vida: {warrior.image}</p>
                <p>Energía: {warrior.energy}</p>
                <p>Raza: {warrior.breed?.name ?? "Sin raza"}</p>
                <p>Tipo: {warrior.typeWarrior?.name ?? "Sin tipo"}</p>
                <p>
                  Poderes: {warrior.powers?.length > 0
                    ? warrior.powers.map((p) => p.name).join(", ")
                    : "Sin poderes"}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={(e) => { e.stopPropagation(); setEditingWarrior(warrior) }}
                  className="text-sm border border-black px-2 py-1 rounded hover:bg-black hover:text-white"
                >
                  Editar
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setDeletingWarrior(warrior) }}
                  className="text-sm border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white"
                >
                  Eliminar
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {showCreateModal && (
        <CreateWarriorModal onClose={() => setShowCreateModal(false)} onCreate={handleCreate} />
      )}
      {editingWarrior && (
        <EditWarriorModal warrior={editingWarrior} onClose={() => setEditingWarrior(null)} onUpdate={handleUpdate} />
      )}
      {deletingWarrior && (
        <ConfirmDeleteModal
          warriorName={deletingWarrior.name}
          onConfirm={() => handleDelete(deletingWarrior.id)}
          onCancel={() => setDeletingWarrior(null)}
        />
      )}
      {showBreedModal && <InfoBreed onClose={() => setShowBreedModal(false)} />}
      {showTypeWarrioModal && <InfoTypeWarrio onClose={() => setShowTypeWarrioModal(false)} />}
      {showModalPower && <InfoPower onClose={() => setShowModalPower(false)} />}
    </div>
  )
}

const menuItemStyle =
  "block w-full text-left px-4 py-2 hover:bg-black hover:text-white transition border-b border-gray-200 text-sm"
