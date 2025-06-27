import axios from "axios"
import { Breed, CreateBreed, EditBrred } from "../../../models/Breed"


const API_URL = "http://127.0.0.1:8000/api/v1/breed"

export const getAllBreeds = async (): Promise<Breed[]> => {
  const res = await axios.get(API_URL)
  return res.data
}

export const createBreed = async (breed: Partial<CreateBreed>): Promise<Breed> => {
  const res = await axios.post(`${API_URL}/`, {
    name: breed.name,
    breed_Resistance: breed.breedResistance,
  })
  return res.data
}

export const updateBreed = async (breed: EditBrred): Promise<Breed> => {
  const res = await axios.put(`${API_URL}/${breed.id}`, {
    name: breed.name,
    breed_Resistance: breed.breedResistance,
  })
  return res.data
}

export const deleteBreed = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`)
}
