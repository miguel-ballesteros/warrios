import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Warrior } from "../../models/Warrior"
import { Player } from "../../models/Player"
import { AssignWarriorSection } from "./components/AssignWarriorSection"
import {
  loginUser,
  getWarriorsByPlayer,
  assignWarriorToPlayer,
  unassignWarriorFromPlayer,
  getWarrior,
  createLooby,
  updateLooby,
  getLoobyById,
  getGames,
} from "./service/service"

export default function WarriosPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [player, setPlayer] = useState<Player | null>(null)
  const [isJoining, setIsJoining] = useState(false)
  const [loobyCode, setLoobyCode] = useState("")
  const [loobyInfo, setLoobyInfo] = useState<any | null>(null)
  const [createdCode, setCreatedCode] = useState("")
  const [showHistory, setShowHistory] = useState(false)
  const [historyGames, setHistoryGames] = useState([])

  useEffect(() => {
    if (!id) return
    loginUser(id).then(async (userPlayer) => {
      try {
        const { warriors: assignedList } = await getWarriorsByPlayer(id)
        const allWarriors = await getWarrior()
        const assignedWarriors = assignedList
          .map((assigned: any) => allWarriors.find(w => w.warrior_id === assigned.warrior_id))
          .filter(Boolean)
        userPlayer.warriors = assignedWarriors
        setPlayer({ ...userPlayer })
      } catch (err) {
        console.error("❌ Error al obtener guerreros", err)
      }
    })
  }, [id])

  const assignWarrior = async (warrior: Warrior) => {
    if (!player) return
    if (player.warriors.length >= 10) return alert("Máximo 10 guerreros.")
    if (player.warriors.find(w => w.id === warrior.id)) return alert("Ya tienes este guerrero.")
    try {
      await assignWarriorToPlayer(id, warrior.id)
      player.warriors.push(warrior)
      setPlayer({ ...player })
    } catch {
      alert("No se pudo asignar el guerrero.")
    }
  }

  const removeWarrior = async (warriorId: number) => {
    if (!player) return
    try {
      await unassignWarriorFromPlayer(id, warriorId)
      player.warriors = player.warriors.filter(w => w.id !== warriorId)
      setPlayer({ ...player })
    } catch {
      alert("No se pudo eliminar el guerrero.")
    }
  }

  const handleCreateLooby = async () => {
    if (!player) return
    const today = new Date().toISOString().split("T")[0]
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    try {
      const loobyData = {
        looby_code: randomCode,
        looby_player_1: player.data.nickname,
        looby_player_2: "",
        looby_result: "",
        looby_created: today,
      }
      const response = await createLooby(loobyData)
      setLoobyInfo(response)
      setCreatedCode(response.looby_code)
      setIsJoining(true)
    } catch {
      alert("Error al crear la sala.")
    }
  }

  const handleJoinLooby = async () => {
    if (!player) return
    try {
      const allLoobys = await getLoobyById(loobyCode)
      if (!allLoobys) throw new Error("Sala no encontrada")
      if (allLoobys.looby_player_1 && allLoobys.looby_player_2)
        return alert("La sala ya tiene 2 jugadores.")
      const updatedLooby = {
        ...allLoobys,
        looby_player_2: player.data.nickname,
      }
      await updateLooby(allLoobys.looby_id, updatedLooby)
      navigate(`/loobys/${allLoobys.looby_id}`)
      setIsJoining(false)
    } catch {
      alert("No se pudo unir a la sala.")
    }
  }

  const handleShowHistory = async () => {
    if (!player) return
    try {
      const allGames = await getGames()
      const filtered = allGames.filter((g: any) => g.games_nick_name === player.data.nickname)
      setHistoryGames(filtered)
      setShowHistory(true)
    } catch {
      alert("No se pudo cargar el historial.")
    }
  }

  if (!player) {
    return <p className="p-4 text-center font-mono text-black">No se encontró el jugador.</p>
  }
  console.log(player.data)
  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* NAVBAR */}
      <nav className="m-2 p-2 border-4 border-black rounded-2xl bg-white shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-extrabold uppercase">🛡️ Guerreros</h1>
        <div className="space-x-2">
          <button onClick={handleCreateLooby} className="bg-black text-white hover:bg-white hover:text-black px-4 py-2 rounded-full text-sm font-bold border-2 border-black">Crear sala</button>
          <button onClick={() => setIsJoining(true)} className="bg-black text-white hover:bg-white hover:text-black px-4 py-2 rounded-full text-sm font-bold border-2 border-black">Unirse a sala</button>
          <button onClick={handleShowHistory} className="bg-black text-white hover:bg-white hover:text-black px-4 py-2 rounded-full text-sm font-bold border-2 border-black">Historial</button>
        </div>
      </nav>

      {/* JUGADOR */}
      <div className="p-4">
<div className="bg-white p-6 rounded-2xl shadow-md border-2 border-black mb-8">
  <h2 className="text-2xl font-extrabold text-black mb-2 flex items-center gap-2">
    🎮 {player.data.nickname}
    <span className="text-sm text-gray-500 font-medium">(Vida: {player.data.life})</span>
  </h2>
  <div className="text-gray-700 text-base">
    <p><span className="font-semibold">Nombre real:</span> {player.data.name}</p>
    <p><span className="font-semibold">Record:</span> {player.data.record}</p>
  </div>
</div>

        {/* GUERREROS */}
        <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-black">
          <p className="text-xl font-semibold mb-4">Guerreros asignados ({player.warriors.length}/10)</p>
          {player.warriors.length === 0 ? (
            <p>No hay guerreros asignados.</p>
          ) : (
            <ul className="space-y-2">
              {player.warriors.map((w) => (
                <li key={w.id} className="flex justify-between items-center p-2 border-b border-gray-200">
                  <span>⚔️ {w.warrior_name} (vida: {w.warriors_health}, energía: {w.warriors_energy})</span>
                  <button onClick={() => removeWarrior(w.warrior_id)} className="text-red-600 hover:text-red-800 text-lg">🗑️</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8">
          <AssignWarriorSection player={player} onAssign={assignWarrior} />
        </div>
      </div>

      {/* MODAL UNIRSE */}
      {isJoining && !createdCode && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative border-2 border-black">
            <button onClick={() => setIsJoining(false)} className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-black">×</button>
            <h2 className="text-xl font-bold text-center mb-4">Unirse a una sala</h2>
            <input value={loobyCode} onChange={(e) => setLoobyCode(e.target.value)} placeholder="Código de sala" className="w-full border p-2 rounded mb-4" />
            <button onClick={handleJoinLooby} className="w-full bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border-2 border-black">Unirse</button>
          </div>
        </div>
      )}

      {/* MODAL SALA CREADA */}
      {isJoining && createdCode && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border-2 border-black relative">
            <button onClick={() => {
              setIsJoining(false)
              setCreatedCode("")
              navigate(`/loobys/${loobyInfo.looby_id}`)
            }} className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-black">×</button>
            <h2 className="text-2xl font-bold mb-4 text-center">Sala creada</h2>
            <p className="text-center text-gray-700 mb-2">Comparte este código:</p>
            <div className="text-3xl text-center font-mono font-bold p-4 border border-black rounded bg-gray-100 mb-4">
              {createdCode}
            </div>
            <button onClick={() => navigator.clipboard.writeText(createdCode)} className="mx-auto block px-4 py-2 bg-black text-white rounded-full hover:bg-white hover:text-black border-2 border-black">Copiar código</button>
          </div>
        </div>
      )}

      {/* MODAL HISTORIAL */}
      {showHistory && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl relative border-2 border-black">
            <button onClick={() => setShowHistory(false)} className="absolute top-2 right-4 text-2xl text-gray-600 hover:text-black">×</button>
            <h2 className="text-2xl font-bold text-center mb-4">🧾 Historial de partidas</h2>
            {historyGames.length === 0 ? (
              <p className="text-center text-gray-500">No hay partidas registradas.</p>
            ) : (
              <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                {historyGames.map((g: any) => (
                  <li key={g.games_id} className="border p-3 rounded-md">
                    <p><strong>Estado:</strong> {g.games_status}</p>
                    <p><strong>Puntaje:</strong> {g.games_score}</p>
                    <p><strong>Fecha:</strong> {g.games_created}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
