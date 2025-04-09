import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Warrior } from "../../models/Warrior"
import { Player } from "../../models/Player"
import { AssignWarriorSection } from "./components/AssignWarriorSection"
import { EditPlayerModal } from "./components/EditPlayerModal"

export default function WarriosPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [player, setPlayer] = useState<Player | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  useEffect(() => {
    if (!id) return

    const playersStorage = localStorage.getItem("players")
    if (!playersStorage) return

    const parsedPlayersRaw = JSON.parse(playersStorage)
    const parsedPlayers: Player[] = parsedPlayersRaw.map(
      (p: any) =>
        new Player(p.id, p.name, p.nickname, p.life, p.record, p.warriors)
    )

    const foundPlayer = parsedPlayers.find((p) => p.id.toString() === id)

    if (foundPlayer) {
      setPlayer(foundPlayer)
    } else {
      console.warn("Jugador no encontrado en localStorage.")
    }
  }, [id])
  const updateLocalStoragePlayer = (updated: Player) => {
    const playersStorage = localStorage.getItem("players")
    if (!playersStorage) return
    const parsedPlayersRaw = JSON.parse(playersStorage)
    const parsedPlayers: Player[] = parsedPlayersRaw.map(
      (p: any) =>
        new Player(p.id, p.name, p.nickname, p.life, p.record, p.warriors)
    )
    const newPlayersList = parsedPlayers.map((p) =>
      p.id === updated.id ? updated : p
    )

    localStorage.setItem("players", JSON.stringify(newPlayersList))
  }
  const handleSavePlayer = (updated: Player) => {
    if (!player) return

    player.updateInfo(updated.name, updated.nickname)
    setPlayer(player)
    updateLocalStoragePlayer(player)
    setShowEditModal(false)
  }
  const removeWarrior = (warriorId: number) => {
    if (!player) return

    player.removeWarrior(warriorId)

    const updatedPlayer = new Player(
      player.id,
      player.name,
      player.nickname,
      player.life,
      player.record,
      [...player.warriors]
    )
    setPlayer(updatedPlayer)
    updateLocalStoragePlayer(updatedPlayer)
  }

  const deletePlayer = () => {
    if (!player) return
    if (confirm(`¿Seguro que deseas eliminar a ${player.name}?`)) {
      const playersStorage = localStorage.getItem("players")
      if (!playersStorage) return
      const parsedPlayers: Player[] = JSON.parse(playersStorage)
      const newList = parsedPlayers.filter((p) => p.id !== player.id)
      localStorage.setItem("players", JSON.stringify(newList))
      navigate("/")
    }
  }

  const assignWarrior = (warrior: Warrior) => {
    if (!player) return
    if (player.warriors.length >= 10) {
      alert("Solo puedes asignar un máximo de 10 guerreros.")
      return
    }
    const alreadyAssigned = player.warriors.find((w) => w.id === warrior.id)
    if (alreadyAssigned) {
      alert("Este guerrero ya ha sido asignado.")
      return
    }
    player.AssignWarriosToPlayer(warrior)
    const updatedPlayer = new Player(
      player.id,
      player.name,
      player.nickname,
      player.life,
      player.record,
      [...player.warriors]
    )
    setPlayer(updatedPlayer)
    updateLocalStoragePlayer(updatedPlayer)
  }
  if (!player)
    return <p>No se encontró el jugador. Intenta de nuevo desde la lista.</p>
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          background: "#f9f9f9",
          padding: "20px 30px",
          borderRadius: "12px",
          border: "1px solid #ddd",
          color: "#333",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          fontFamily: "Arial, sans-serif",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          position: "relative",
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
            {player.name}{" "}
            <span style={{ fontSize: "13px", color: "#777", fontWeight: "normal" }}>
              ({player.nickname})
            </span>
          </p>
          <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#555" }}>
            Record: {player.record}
          </p>
          <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <span style={{ marginRight: "10px", fontSize: "13px", color: "#666" }}>
              Vida:
            </span>
            <div
              style={{
                background: "#e0e0e0",
                borderRadius: "6px",
                width: "160px",
                height: "12px",
                overflow: "hidden",
                position: "relative",
                border: "1px solid #ccc",
              }}
            >
              <div
                style={{
                  width: `${player.life}%`,
                  background:
                    player.life > 50
                      ? "#4caf50"
                      : player.life > 25
                        ? "#ff9800"
                        : "#f44336",
                  height: "100%",
                  transition: "width 0.3s ease-in-out",
                }}
              ></div>
            </div>
            <span style={{ marginLeft: "10px", fontSize: "13px", color: "#444" }}>
              {player.life}%
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setShowEditModal(true)}
            style={{
              backgroundColor: "#f8f8f8",
              color: "#1976d2",
              border: "1px solid #1976d2",
              borderRadius: "6px",
              padding: "8px 14px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f0f8ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Editar
          </button>
          <button
            onClick={deletePlayer}
            style={{
              background: "transparent",
              color: "#e53935",
              border: "1px solid #e53935",
              borderRadius: "6px",
              padding: "8px 14px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff5f5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
      <hr style={{ margin: "30px 0" }} />
      <h2>Guerreros asignados ({player.warriors.length}/10)</h2>
      {player.warriors.length === 0 ? (
        <p>No hay guerreros asignados.</p>
      ) : (
        <ul>
          {player.warriors.map((w) => (
            <li
              key={w.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <span>
                ⚔️ {w.name} (vida: {w.health}, energía: {w.energy})
              </span>
              <button
                onClick={() => removeWarrior(w.id)}
                style={{
                  background: "transparent",
                  color: "#ff6666",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                title="Eliminar guerrero"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
      <hr style={{ margin: "30px 0" }} />
      <AssignWarriorSection
        player={player}
        onAssign={assignWarrior}
      />
      {showEditModal && (
        <EditPlayerModal
          player={player}
          onClose={() => setShowEditModal(false)}
          onSave={handleSavePlayer}
        />
      )}
    </div>
  )
}
