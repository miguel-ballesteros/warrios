import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Breed } from "../../../models/Breed"
import { Power } from "../../../models/Power"
import { TypeWarrior } from "../../../models/TypeWarrior"
import { CreateWarrior, Warrior } from "../../../models/Warrior"
import {
  getAllBreeds,
  getAllTypeWarriors,
  getAllPowers,
  createWarrior
} from "../service/service"

interface Props {
  onClose: () => void
  onCreate: (warrior: Warrior) => void
}

export const CreateWarriorModal: React.FC<Props> = ({ onClose, onCreate }) => {
  const [image, setImage] = useState<string | null>(null)
  const [breed, setBreed] = useState<Breed | null>(null)
  const [type, setType] = useState<TypeWarrior | null>(null)
  const [selectedPower, setSelectedPower] = useState<Power | null>(null)
  const [breeds, setBreeds] = useState<Breed[]>([])
  const [types, setTypes] = useState<TypeWarrior[]>([])
  const [powers, setPowers] = useState<Power[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [breedsRes, typesRes, powersRes] = await Promise.all([
        getAllBreeds(),
        getAllTypeWarriors(),
        getAllPowers()
      ])
      setBreeds(breedsRes)
      setTypes(typesRes)
      setPowers(powersRes)
    }
    fetchData()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (values: any) => {
    const newWarrior: CreateWarrior = {
      warrior_name: values.name,
      warriors_image: image || "",
      warriors_health: Number(values.life),
      warriors_energy: Number(values.energy),
      breed_fk: breed?.id,
      type_Warrior_fk: type?.id,
      power_fk: selectedPower?.id // ✅ solo uno
    }

    const created = await createWarrior(newWarrior)
    onCreate(created)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-black">Crear Guerrero</h2>

        <Formik
          initialValues={{ name: "", life: 100, energy: 50 }}
          validate={values => {
            const errors: Record<string, string> = {}
            if (!values.name) errors.name = "Requerido"
            if (!values.life || Number(values.life) <= 0) errors.life = "Debe ser positivo"
            if (!values.energy || Number(values.energy) <= 0) errors.energy = "Debe ser positivo"
            return errors
          }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="name"
                  placeholder="Nombre"
                  className="w-full p-2 border rounded-md text-black"
                />
                <ErrorMessage name="name" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              <div>
                <Field
                  name="life"
                  type="number"
                  placeholder="Vida"
                  className="w-full p-2 border rounded-md text-black"
                />
                <ErrorMessage name="life" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              <div>
                <Field
                  name="energy"
                  type="number"
                  placeholder="Energía"
                  className="w-full p-2 border rounded-md text-black"
                />
                <ErrorMessage name="energy" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded-md text-black"
              />
              {image && <img src={image} alt="Preview" className="w-full h-48 object-cover rounded-md" />}

              <select
                onChange={e => setBreed(breeds.find(b => b.id === Number(e.target.value)) || null)}
                className="w-full p-2 border rounded-md text-black"
              >
                <option value="">Selecciona Raza</option>
                {breeds.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>

              <select
                onChange={e => setType(types.find(t => t.id === Number(e.target.value)) || null)}
                className="w-full p-2 border rounded-md text-black"
              >
                <option value="">Selecciona Tipo</option>
                {types.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>

              <select
                onChange={e =>
                  setSelectedPower(powers.find(p => p.id === Number(e.target.value)) || null)
                }
                className="w-full p-2 border rounded-md text-black"
              >
                <option value="">Selecciona Poder</option>
                {powers.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
                >
                  Crear
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
