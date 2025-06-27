import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  createPlayer,
  assignPlayerToUser,
  getPlayersByUser,
  getPlayerById,
  getWarriorsByPlayer,
} from "./service/service";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [players, setPlayers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [warriors, setWarriors] = useState<any[]>([]);

  const navigate = useNavigate();
  const userRaw = localStorage.getItem("User");
  const user = userRaw ? JSON.parse(userRaw) : null;
  const userId = user?.id;

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!userId) return;

      try {
        const res = await getPlayersByUser(userId);
        const relations = res.data.players || [];

        const playerDataPromises = relations.map((rel: any) =>
          getPlayerById(rel.player_id).then((res) => res.data)
        );

        const detailedPlayers = await Promise.all(playerDataPromises);
        setPlayers(detailedPlayers);

        console.log("Jugadores detallados:", detailedPlayers);
      } catch (err) {
        console.error("Error al obtener jugadores:", err);
        setPlayers([]);
      }
    };

    fetchPlayers();
  }, [userId]);
  const handleCreateAndAssign = async (values: any, { resetForm }: any) => {
    if (!userId) return setMessage("No se pudo obtener el ID del usuario.");
    setIsLoading(true);
    setMessage("");

    try {
      const newPlayer = {
        id_player: `player_${Date.now()}`,
        nickname: values.nickname,
        life: Number(values.life),
        record: Number(values.record),
        player_live: Number(values.player_live),
      };

      const response = await createPlayer(newPlayer);
      const createdId = response.data.id_player;

      await assignPlayerToUser(userId, createdId);

      setMessage("Jugador creado y asignado correctamente.");
      resetForm();
      setShowForm(false);
      window.location.reload();

    } catch (err) {
      console.error(err);
      setMessage("Error al crear o asignar jugador.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="bg-white text-black flex flex-col font-mono">
      <nav className="m-2 p-2 border-4 border-black rounded-2xl bg-white shadow-lg flex justify-between items-center text-black font-mono tracking-wide">
        <h1 className="text-4xl font-extrabold mb-8 uppercase tracking-wide">Perfiles del jugador</h1>
        <div className="w-full max-w-6xl flex justify-end mb-4 px-4">
          <button
            onClick={() => {
              localStorage.removeItem("User");
              window.location.href = "/login";
            }}
            className="py-2 px-4 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition text-sm font-semibold"
          >
            Cerrar sesión
          </button>
        </div>

      </nav>
      <div className="min-h-screen bg-white text-black flex flex-col items-center py-10 px-4 font-mono">
        <div className="border border-black rounded-xl p-6 w-full max-w-md shadow-md text-center mb-10">
          <p className="text-lg mb-2">👤 <strong>{user?.user_name || "Invitado"}</strong></p>
          <p className="text-sm text-gray-600">📧 {user?.user_email || "correo no disponible"}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
          {players?.map((p, i) => (
            <div
              key={i}
              onClick={() => navigate(`/warriors/player/${p.id_player}`)}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-black shadow hover:bg-black hover:text-white transition flex flex-col items-center justify-center text-center text-sm font-semibold cursor-pointer"
            >
              Nombre {p.nickname}
              <span className="text-xs font-normal">Vida {p.life}</span>
            </div>
          ))}
          <div
            onClick={() => setShowForm(true)}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-black text-5xl font-bold flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition shadow"
            title="Crear nuevo perfil"
          >
            +
          </div>
        </div>

        {selectedPlayer && (
          <div className="max-w-xl w-full border border-black rounded-xl p-6 shadow mb-10">
            <h2 className="text-xl font-bold mb-2">Jugador seleccionado:</h2>
            <p>🎮 <strong>{selectedPlayer.nickname}</strong></p>
            <p>❤️ Vida: {selectedPlayer.life}</p>
            <p>🏆 Record: {selectedPlayer.record}</p>
            <p>🟢 Estado: {selectedPlayer.player_live ? "Activo" : "Inactivo"}</p>

            <h3 className="text-lg font-semibold mt-4">🛡 Guerreros asignados:</h3>
            {warriors.length > 0 ? (
              <ul className="list-disc pl-5 mt-2">
                {warriors.map((w, i) => (
                  <li key={i}>
                    {w.name} (ID: {w.id_warrior})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 mt-2">No hay guerreros asignados.</p>
            )}
          </div>
        )}

        {showForm && (
          <div className="mt-6 border border-black rounded-xl p-6 w-full max-w-md shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Crear nuevo perfil</h2>
            <Formik
              initialValues={{ nickname: "", life: 100, record: 0, player_live: 1 }}
              onSubmit={handleCreateAndAssign}
            >
              {({ resetForm }) => (
                <Form className="space-y-4 text-left">
                  <div>
                    <label className="block text-sm font-medium">Nickname</label>
                    <Field name="nickname" className="w-full px-4 py-2 border border-black rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Vida</label>
                    <Field name="life" type="number" className="w-full px-4 py-2 border border-black rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Record</label>
                    <Field name="record" type="number" className="w-full px-4 py-2 border border-black rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Activo (1 / 0)</label>
                    <Field name="player_live" type="number" className="w-full px-4 py-2 border border-black rounded-lg" />
                  </div>

                  <div className="flex justify-between gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                      }}
                      className="w-full py-2 border border-black rounded-full hover:bg-black hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2 border-2 border-black rounded-full text-black hover:bg-black hover:text-white"
                    >
                      {isLoading ? "Creando..." : "Crear perfil"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            {message && <p className="mt-4 text-sm font-semibold">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
