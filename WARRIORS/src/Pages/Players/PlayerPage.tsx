import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PlayerPage.css";
import { Warrior } from "../../models/Warrior";
import { Player } from "../../models/Player";


interface Player {
  id: number;
  name: string;
  nickname: string;
  record: number;
  life: number;
  warriors: Warrior[];
}

export default function PlayerPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    nickname: "",
    record: 0,
    life: 100,
  });

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
  }, []);

  const savePlayersToStorage = (playersToSave: Player[]) => {
    localStorage.setItem("players", JSON.stringify(playersToSave));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreatePlayer = () => {
    const newPlayer: Player = {
      id: Date.now(),
      name: form.name,
      nickname: form.nickname,
      record: Number(form.record),
      life: Number(form.life),
      warriors: [],
    };

    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    savePlayersToStorage(updatedPlayers);

    setForm({ name: "", nickname: "", record: 0, life: 100 });
    setIsOpen(false);
  };

  const handlePlayerClick = (player: Player) => {
    localStorage.setItem("selectedPlayerId", String(player.id));
    navigate(`/warriors/player/${player.id}`);
  };
  const handleDeletePlayer = (playerId: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este jugador?");
    if (!confirmDelete) return;

    const updatedPlayers = Player.deletePlayerById(playerId);
    setPlayers(updatedPlayers);
  };
  return (
    <div className="page-container">
      <div className="card-container">
        <div className="players-section">
          <h2>Jugadores</h2>
          {players.map((player) => (
            <div
              key={player.id}
              className="player-card"
              onClick={() => handlePlayerClick(player)}
            >
              <div className="card-header">
                <h3>{player.nickname}</h3>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePlayer(player.id);
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="card-body">
                <p><strong>Nombre:</strong> {player.name}</p>
                <p><strong>Record:</strong> {player.record}</p>
                <p><strong>Vida:</strong> {player.life}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="create-section" onClick={() => setIsOpen(true)}>
          <div className="create-card">
            <div className="plus-icon">+</div>
            <p>Crear jugador</p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal modal-large">
            <h2>Nuevo jugador</h2>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="nickname"
              placeholder="Nickname"
              value={form.nickname}
              onChange={handleChange}
            />
            <input
              type="number"
              name="record"
              placeholder="Record"
              value={form.record}
              onChange={handleChange}
            />
            <input
              type="number"
              name="life"
              placeholder="Vida"
              value={form.life}
              onChange={handleChange}
            />
            <div className="modal-actions">
              <button onClick={() => setIsOpen(false)} className="cancel-button">
                Cancelar
              </button>
              <button onClick={handleCreatePlayer} className="submit-button">
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
