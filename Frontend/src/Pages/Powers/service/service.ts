import axios from "axios"
import { CreatePower, Power } from "../../../models/Power"

const API_URL = "http://127.0.0.1:8000/api/v1/powers"

export const getAllPowers = async (): Promise<Power[]> => {
  const res = await axios.get(`${API_URL}/`)
  return res.data
}

export const createPower = async (power: CreatePower) => {
  await axios.post(`${API_URL}/`, power)
}

export const updatePower = async (power: Power) => {
  await axios.put(`${API_URL}/${power.id}`, power)
}

export const deletePower = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`)
}
