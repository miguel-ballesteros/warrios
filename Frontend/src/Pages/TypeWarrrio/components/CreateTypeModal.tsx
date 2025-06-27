import { Formik, Form, Field, ErrorMessage } from "formik"
import { CreateTypeWarrior } from "../../../models/TypeWarrior"

interface CreateTypeModalProps {
  onCreate: (newType: CreateTypeWarrior) => void
  onCancel: () => void
}

export default function CreateTypeModal({ onCreate, onCancel }: CreateTypeModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-4">
          Crear Tipo de Guerrero
        </h2>

        <Formik
          initialValues={{ name: "", description: "", basePower: 0 }}
          onSubmit={(values, { resetForm }) => {
            const newType: CreateTypeWarrior = {
              name: values.name,
              description: values.description,
            }
            onCreate(newType)
            resetForm()
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
                  name="description"
                  placeholder="Descripción"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-black text-white px-4 py-1 rounded hover:bg-gray-900 transition"
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
