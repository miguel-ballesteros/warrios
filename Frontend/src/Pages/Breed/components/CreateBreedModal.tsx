import { Formik, Form, Field, ErrorMessage } from "formik"
import { CreateBreed } from "../../../models/Breed"

interface Props {
  onCreate: (newBreed: CreateBreed) => void
  onCancel: () => void
}

export default function CreateBreedModal({ onCreate, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border border-black">
        <h2 className="text-xl font-bold text-black mb-4 text-center">
          Crear nueva raza
        </h2>

        <Formik
          initialValues={{ name: "", resistance: "" }}
          onSubmit={(values, { resetForm }) => {
            const newBreed: CreateBreed = {
              name: values.name,
              breedResistance: values.resistance,
            }
            onCreate(newBreed)
            resetForm()
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="name"
                  placeholder="Nombre"
                  className="w-full px-4 py-2 border border-black text-black rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="resistance"
                  placeholder="Resistencia"
                  className="w-full px-4 py-2 border border-black text-black rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
                />
                <ErrorMessage
                  name="resistance"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-white border border-black text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
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
