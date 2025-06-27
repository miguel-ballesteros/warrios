import { Formik, Form, Field, ErrorMessage } from "formik"
import { EditBrred } from "../../../models/Breed"

interface Props {
  breed: EditBrred
  onSave: (updated: EditBrred) => void
  onCancel: () => void
}

export default function EditBreedModal({ breed, onSave, onCancel }: Props) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">
          Editar Raza: {breed.name}
        </h2>

        <Formik
          initialValues={{
            name: breed.name,
            breedResistance: breed.breedResistance,
          }}
          onSubmit={(values) => {
            const updatedBreed: EditBrred = {
              id: breed.id,
              name: values.name,
              breedResistance: values.breedResistance,
            }
            onSave(updatedBreed)
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="name"
                  placeholder="Nombre"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="breedResistance"
                  placeholder="Resistencia"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="breedResistance"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  Guardar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
