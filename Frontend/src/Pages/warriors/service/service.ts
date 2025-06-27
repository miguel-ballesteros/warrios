import axios from "axios"
import { CreateWarrior, Warrior } from "../../../models/Warrior"
import { Breed } from "../../../models/Breed"
import { Power } from "../../../models/Power"
import { TypeWarrior } from "../../../models/TypeWarrior"
import { Player } from "../../../models/Player"

const API_URL = "http://127.0.0.1:8000/api/v1"

// 🧠 Jugador
export async function loginUser(id: string) {
  const response = await axios.get(`${API_URL}/players/${id}`)
  return {
    ...response,
    data: Player.fromJson(response.data),
  }
}

export async function getWarriorsByPlayer(playerId: string) {
  const response = await axios.get(`${API_URL}/relations/player/${playerId}/warriors`);
  return response.data; // ✅ devuelve solo los datos
}

export async function assignWarriorToPlayer(playerId: string, warriorId: number) {
  return axios.post(`${API_URL}/relations/player/${playerId}/warrior/${warriorId}`)
}

export async function unassignWarriorFromPlayer(playerId: string, warriorId: number) {
  return axios.delete(`${API_URL}/relations/player/${playerId}/warrior/${warriorId}`)
}

export async function getWarrior(): Promise<Warrior[]> {
  const response = await axios.get(`${API_URL}/warriors`)
  return response.data // ✅ Devuelve un array
}

// 🧬 Razas (Breeds)
export async function getAllBreeds(): Promise<Breed[]> {
  const response = await axios.get(`${API_URL}/breed/`)
  return response.data.map((b: any) => Breed.fromJson(b))
}

// 🧠 Tipos de guerrero (TypeWarrior)
export async function getAllTypeWarriors(): Promise<TypeWarrior[]> {
  const response = await axios.get(`${API_URL}/type-warriors/`)
  return response.data.map((t: any) => TypeWarrior.fromJson(t))
}

// ⚡ Poderes (Powers)
export async function getAllPowers(): Promise<Power[]> {
  const response = await axios.get(`${API_URL}/powers/`)
  return response.data.map((p: any) => Power.fromJson(p))
}

export async function deleteWarrior(id: number) {
  return axios.delete(`${API_URL}/warriors/${id}`)
}

export async function createWarrior(data: CreateWarrior) {
  return axios.post(`${API_URL}/warriors/`, data)
}

export async function updateWarrior(id: number, data: any) {
  return axios.put(`${API_URL}/warriors/${id}`, data)
}
export async function createLooby(data) {
  return (await axios.post(`${API_URL}/loobys/`, data)).data
}

export async function updateLooby(loobyId: number, payload: any) {
  return fetch(`${API_URL}/loobys/${loobyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then(res => res.json())
}

export async function getLoobyById(code:string) {
  const allLoobys = (await axios.get(`${API_URL}/loobys/`)).data
  return allLoobys.find((l) => l.looby_code === code)
}

export async function getGames() {
  return (await axios.get(`${API_URL}/games/`)).data
}