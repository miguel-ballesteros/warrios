import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  getLoobyById,
  getWarriorsByPlayer,
  getAllPlayers,
  getWarrior
} from "./service/service"

interface Warrior {
  warrior_id: number
  warrior_name: string
  warriors_health: number
  warriors_energy: number
  warriors_image: string | null
  breed?: { name: string }
  typeWarrior?: { name: string }
  powers?: { name: string }[]
}

interface Looby {
  id: number
  looby_code: string
  looby_player_1: string
  looby_player_2: string
  looby_result: string
  looby_created: string
}

export default function LoobysPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [looby, setLooby] = useState<Looby | null>(null)
  const [player1Warriors, setPlayer1Warriors] = useState<Warrior[]>([])
  const [player2Warriors, setPlayer2Warriors] = useState<Warrior[]>([])
  const [winner, setWinner] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [players, setPlayers] = useState<any[]>([])

  const [winnerId, setWinnerId] = useState<string | null>(null)
  const [loserId, setLoserId] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const loadData = async () => {
      try {
        const loobyRes = await getLoobyById(Number(id))
        const loobyData = loobyRes.data
        setLooby(loobyData)

        const allPlayers = await getAllPlayers()
        setPlayers(allPlayers)

        const allWarriors = await getWarrior()

        const player1 = allPlayers.find(p => p.nickname === loobyData.looby_player_1)
        const player2 = allPlayers.find(p => p.nickname === loobyData.looby_player_2)

        if (!player1 || !player2) {
          setWinner("❌ Jugador no encontrado")
          setShowModal(true)
          return
        }

        const [res1, res2] = await Promise.all([
          getWarriorsByPlayer(player1.id_player),
          getWarriorsByPlayer(player2.id_player),
        ])

        const filterWarriors = (data: any) => {
          return data.warriors.map((w: any) =>
            allWarriors.find((full: Warrior) => full.warrior_id === w.warrior_id)
          ).filter(Boolean)
        }

        setPlayer1Warriors(filterWarriors(res1.data))
        setPlayer2Warriors(filterWarriors(res2.data))
      } catch (err) {
        console.error("❌ Error cargando la información", err)
      }
    }

    loadData()
  }, [id])

  const handleBattle = () => {
    if (!looby) return

    const count1 = player1Warriors.length
    const count2 = player2Warriors.length

    const player1 = players.find(p => p.nickname === looby.looby_player_1)
    const player2 = players.find(p => p.nickname === looby.looby_player_2)

    if (count1 === count2) {
      setWinner("⚔️ ¡Empate!")
      setWinnerId(null)
      setLoserId(null)
    } else {
      const isPlayer1Winner = count1 > count2
      const ganador = isPlayer1Winner ? looby.looby_player_1 : looby.looby_player_2
      setWinner(`🏆 Ganador: ${ganador}`)
      setWinnerId(isPlayer1Winner ? player1.id_player : player2.id_player)
      setLoserId(isPlayer1Winner ? player2.id_player : player1.id_player)
    }

    setShowModal(true)
  }

  const handleCloseModal = async () => {
    setShowModal(false)

    if (!winnerId || !loserId) return

    const today = new Date().toISOString().split("T")[0]
    const winnerName = players.find(p => p.id_player === winnerId)?.nickname
    const loserName = players.find(p => p.id_player === loserId)?.nickname

    try {
      await axios.post("http://127.0.0.1:8000/api/v1/games/", {
        games_nick_name: winnerName,
        games_status: "Ganado",
        games_score: 1,
        games_created: today
      })

      await axios.post("http://127.0.0.1:8000/api/v1/games/", {
        games_nick_name: loserName,
        games_status: "Perdido",
        games_score: 0,
        games_created: today
      })

      navigate(`/warriors/player/${winnerId}`)
    } catch (err) {
      console.error("❌ Error guardando los resultados", err)
    }
  }

  const renderWarriorCard = (warrior: Warrior) => (
    <div
      key={warrior.warrior_id}
      className="p-4 rounded-xl shadow-md border border-black bg-white"
    >
      {warrior.warriors_image ? (
        <img
          src={warrior.warriors_image}
          alt={warrior.warrior_name}
          className="w-full h-28 object-cover rounded-md mb-2"
        />
      ) : (
        <div className="w-full h-28 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md mb-2">
          Sin imagen
        </div>
      )}
      <div className="font-bold text-lg mb-1">{warrior.warrior_name}</div>
      <div className="text-sm space-y-1">
        <p>Vida: {warrior.warriors_health}</p>
        <p>Energía: {warrior.warriors_energy}</p>
        <p>Raza: {warrior.breed?.name ?? "Sin raza"}</p>
        <p>Tipo: {warrior.typeWarrior?.name ?? "Sin tipo"}</p>
        <p>
          Poderes: {warrior.powers?.length
            ? warrior.powers.map(p => p.name).join(", ")
            : "Sin poderes"}
        </p>
      </div>
    </div>
  )

  if (!looby) return <p className="p-4">Cargando sala...</p>

  return (
    <div className="min-h-screen p-6 bg-gray-100 font-mono">
      <h1 className="text-3xl font-bold text-center mb-8">
        Sala: {looby.looby_code}
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Jugador {looby.looby_player_1 || "Jugador 1"}
          </h2>
          <div className="space-y-4">
            {player1Warriors.map(renderWarriorCard)}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleBattle}
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-white hover:text-black border-2 border-black transition"
          >
            ⚔️ Pelear
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Jugador {looby.looby_player_2 || "Jugador 2"}
          </h2>
          <div className="space-y-4">
            {player2Warriors.map(renderWarriorCard)}
          </div>
        </div>
      </div>

      {/* Modal de resultado */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-black relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-black"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">Resultado</h2>
            <p className="text-center text-xl">{winner}</p>
          </div>
        </div>
      )}
    </div>
  )
}
