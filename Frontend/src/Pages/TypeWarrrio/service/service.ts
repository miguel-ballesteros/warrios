import axios from "axios"
import { CreateTypeWarrior, EditTypeWarrior } from "../../../models/TypeWarrior"

const API_BASE = "http://127.0.0.1:8000/api/v1/type-warriors"

export const getAllTypeWarriors = async (): Promise<EditTypeWarrior[]> => {
  const res = await axios.get(`${API_BASE}/`)
  return res.data
}

export const createTypeWarrior = async (newType: CreateTypeWarrior) => {
  return await axios.post(`${API_BASE}/`, newType)
}

export const updateTypeWarrior = async (updated: EditTypeWarrior) => {
  return await axios.put(`${API_BASE}/${updated.id}`, updated)
}

export const deleteTypeWarrior = async (id: number) => {
  return await axios.delete(`${API_BASE}/${id}`)
}