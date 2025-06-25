
import { useState } from "react"
import { Player } from "../../../models/Player"

interface Props {
  player: Player
  onClose: () => void
  onSave: (updatedPlayer: Player) => void
}
export function EditPlayerModal({ player, onClose, onSave }: Props) {
  const [name, setName] = useState(player.name)
  const [nickname, setNickname] = useState(player.nickname)
  const handleSave = () => {
    const updatedPlayer = new Player(
      player.id,
      name,
      nickname,
      player.record,
      player.life,
      player.warriors
    )
    onSave(updatedPlayer)
    onClose()
  }
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Editar Jugador</h3>
        <div style={styles.field}>
          <label>Nombre:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={styles.field}>
          <label>Nickname:</label>
          <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div style={styles.actions}>
          <button onClick={handleSave} style={styles.saveBtn}> Guardar</button>
          <button onClick={onClose} style={styles.cancelBtn}> Cancelar</button>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "300px",
    fontFamily: "'Press Start 2P', cursive",
  },
  field: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
    fontSize: "12px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  saveBtn: {
    background: "#00cc66",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#ccc",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
}
