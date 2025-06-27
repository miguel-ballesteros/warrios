import axios from "axios"

const API_URL = "http://127.0.0.1:8000/api/v1"

export const createPlayer = (data: {
  id_player: string
  nickname: string
  life: number
  record: number
  player_live: number
}) => {
  return axios.post(`${API_URL}/players/`, data)
}

export const assignPlayerToUser = (userId: number, playerId: string) => {
  return axios.post(`${API_URL}/relations/user/${userId}/player/${playerId}`)
}

export const getPlayersByUser = (userId: number) =>
  axios.get(`${API_URL}/relations/user/${userId}/players`);

export const getPlayerById = (playerId: string) =>
  axios.get(`${API_URL}/players/${playerId}`);

export const getWarriorsByPlayer = (playerId: string) =>
  axios.get(`${API_URL}/relations/player/${playerId}/warriors`);