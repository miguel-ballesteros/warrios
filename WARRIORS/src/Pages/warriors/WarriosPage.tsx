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
          background: "rgb(148, 146, 146)",
          padding: "25px 35px",
          borderRadius: "16px",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          fontFamily: "'Press Start 2P', cursive",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50px",
            left: "-50px",
            width: "150px",
            height: "150px",
            background: "rgba(70, 67, 68, 0.2)",
            borderRadius: "50%",
            filter: "blur(60px)",
            zIndex: 0,
          }}
        ></div>

        <div style={{ zIndex: 1 }}>
          <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
            🎮 {player.name}{" "}
            <span style={{ fontSize: "12px", opacity: 0.8 }}>
              ({player.nickname})
            </span>
          </p>
          <p style={{ margin: "8px 0 0", fontSize: "13px" }}>📊 Record: {player.record}</p>

          <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <span style={{ marginRight: "10px", fontSize: "13px" }}>❤️ Vida:</span>
            <div
              style={{
                background: "#333",
                borderRadius: "8px",
                width: "180px",
                height: "18px",
                overflow: "hidden",
                border: "1px solid #666",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${player.life}%`,
                  background:
                    player.life > 50
                      ? "linear-gradient(to right, #0f0, #8f8)"
                      : player.life > 25
                        ? "linear-gradient(to right, #ffa500, #ffcc70)"
                        : "linear-gradient(to right, #f00, #f88)",
                  height: "100%",
                  transition: "width 0.3s ease-in-out",
                }}
              ></div>
            </div>
            <span style={{ marginLeft: "10px", fontSize: "13px" }}>
              {player.life}%
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", zIndex: 1 }}>
          <button
            onClick={() => setShowEditModal(true)}
            style={{
              background: "#44aaff",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "10px 18px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1c89e5")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#44aaff")}
          >
            ✏️ Editar
          </button>

          <button
            onClick={deletePlayer}
            style={{
              background: "#ff4444",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "10px 18px",
              cursor: "pointer",
              fontSize: "12px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#cc0000")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ff4444")}
          >
            🗑️ Eliminar
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
