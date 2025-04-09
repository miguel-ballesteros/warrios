import React, { useEffect, useState } from "react"
import { Warrior } from "../../../models/Warrior"
import { Player } from "../../../models/Player"
import { CreateWarriorModal } from "./CreateWarriorModal"
import { EditWarriorModal } from "./EditWarriorModal"
import { generateWarriors } from "./generateWarriors"
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal"
import InfoBreed from "../../Breed/InfoBreed"
import InfoTypeWarrio from "../../TypeWarrrio/InfoTypeWarrio"
import InfoPower from "../../Powers/InfoPower"

interface Props {
  player: Player
  onAssign: (warrior: Warrior) => void
}

export const AssignWarriorSection: React.FC<Props> = ({
  player,
  onAssign,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [availableWarriors, setAvailableWarriors] = useState<Warrior[]>([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [showBreedModal, setShowBreedModal] = useState(false)
  const [editingWarrior, setEditingWarrior] = useState<Warrior | null>(null)
  const [deletingWarrior, setDeletingWarrior] = useState<Warrior | null>(null)
  const [showTypeWarrioModal, setShowTypeWarrioModal] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(false)
  const [showModalPower, setShowModalPower] = useState(false)
  console.log('availableWarriors:', availableWarriors);
  useEffect(() => {
    const fetchWarriors = async () => {
      const warriors = await generateWarriors();
      setAvailableWarriors(warriors);
    };
    fetchWarriors();
  }, []);
  const handleCreate = (newWarrior: Warrior) => {
    setAvailableWarriors(prev => [...prev, newWarrior])
    onAssign(newWarrior)
    setShowCreateModal(false)
  }

  const handleUpdate = (updated: Warrior) => {
    setAvailableWarriors(prev =>
      prev.map(w => (w.id === updated.id ? updated : w))
    )
    setEditingWarrior(null)
  }

  const handleDelete = (warriorId: number) => {
    setAvailableWarriors(prev => Warrior.deleteById(prev, warriorId))
    setDeletingWarrior(null)
  }

  const filteredWarriors = availableWarriors.filter(warrior =>
    warrior.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
console.log(filteredWarriors)
  return (
    <div>
      <h2>Asignar nuevo guerrero</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Buscar guerrero por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
        <button
          onClick={() => setOpenMenuId(!openMenuId)}
          style={{
            padding: "6px 8px",
            borderRadius: "50%",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            cursor: "pointer",
            fontSize: "18px",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Opciones"
        >
          ⚙️
        </button>

        {openMenuId && (
          <div
            style={{
              position: "absolute",
              top: "80px",
              right: "0px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              zIndex: 100,
              width: "200px",
            }}
          >
            <button
              onClick={() => {
                setShowTypeWarrioModal(true)
                setOpenMenuId(false)
              }}
              style={menuItemStyle}
            >
              Tipo de Guerrero
            </button>
            <button
              onClick={() => {
                setShowBreedModal(true)
                setOpenMenuId(false)
              }}
              style={menuItemStyle}
            >
              Raza
            </button>
            <button
              onClick={() => {
                setShowModalPower(true)
                setOpenMenuId(false)
              }}
              style={menuItemStyle}
            >
              Poderes
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          padding: "10px",
        }}
      >
        <div
          onClick={() => setShowCreateModal(true)}
          style={{
            border: "2px dashed #aaa",
            padding: "10px",
            width: "270px",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            transition: "transform 0.2s ease-in-out",
          }}
        >
          ➕
        </div>

        {filteredWarriors.map((warrior) => {
          const isAssigned = player.warriors.some((w) => w.id === warrior.id)
          return (
            <div
              key={warrior.id}
              style={{
                backgroundColor: isAssigned ? "#f0f0f0" : "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                padding: "16px",
                transition: "transform 0.2s ease-in-out",
                cursor: isAssigned ? "not-allowed" : "pointer",
                position: "relative",
                border: "1px solid #ddd",
                height: "300px",
              }}
              onClick={() => !isAssigned && onAssign(warrior)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)"
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"
              }}
            >
              {warrior.image && (
                <img
                  src={warrior.image}
                  alt={warrior.name}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              )}

              <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "8px" }}>
                {warrior.name}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: "12px",
                  rowGap: "6px",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                <div>Vida: {warrior.health}</div>
                <div>Energía: {warrior.energy}</div>
                <div>Raza: {warrior.breed?.name ?? "Sin raza"}</div>
                <div>Tipo: {warrior.typeWarrior?.name ?? "Sin tipo"}</div>
                <div style={{ gridColumn: "1 / -1" }}>
                  Poderes:{" "}
                  {warrior.powers && warrior.powers.length > 0
                    ? warrior.powers.map((power) => power.name).join(", ")
                    : "Sin poderes"}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditingWarrior(warrior)
                  }}
                  style={{
                    fontSize: "12px",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "1px solid #999",
                    backgroundColor: "#f8f8f8",
                    cursor: "pointer",
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setDeletingWarrior(warrior)
                  }}
                  style={{
                    fontSize: "12px",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "1px solid #d33",
                    backgroundColor: "#ffe6e6",
                    color: "#d33",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {showCreateModal && (
        <CreateWarriorModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      )}

      {editingWarrior && (
        <EditWarriorModal
          warrior={editingWarrior}
          onClose={() => setEditingWarrior(null)}
          onUpdate={handleUpdate}
        />
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

const menuItemStyle: React.CSSProperties = {
  display: "block",
  padding: "10px 15px",
  textAlign: "left",
  backgroundColor: "white",
  border: "none",
  width: "100%",
  cursor: "pointer",
  fontSize: "14px",
  borderBottom: "1px solid #eee",
}
