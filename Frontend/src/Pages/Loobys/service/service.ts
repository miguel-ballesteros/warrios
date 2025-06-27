import axios from "axios"

const API_URL = "http://127.0.0.1:8000/api/v1"

export function getLoobyById(id: number) {
  return axios.get(`${API_URL}/loobys/${id}`)
}

export const getWarrior = () => {
  return axios.get(`${API_URL}/warriors/`).then(res => res.data)
}


export async function getWarriorsByPlayer(playerId: string) {
  const response = await axios.get(`${API_URL}/relations/player/${playerId}/warriors`);
  return response
}

export function getAllPlayers() {
  return axios.get(`${API_URL}/players/`).then(res => res.data)
}