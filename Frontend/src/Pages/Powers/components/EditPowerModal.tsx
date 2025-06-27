import { Formik, Form, Field, ErrorMessage } from "formik"
import { UpdatePower } from "../../../models/Power"

interface EditPowerModalProps {
  power: UpdatePower
  onSave: (updated: UpdatePower) => void
  onCancel: () => void
}

export default function EditPowerModal({ power, onSave, onCancel }: EditPowerModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-center text-black mb-4">✏️ Editar Poder</h2>

        <Formik
          initialValues={{ name: power.name, damage: String(power.attack_power), effect: power.power_effect }}
          validate={(values) => {
            const errors: { [key: string]: string } = {}
            if (!values.name) errors.name = "Requerido"
            if (!values.damage || isNaN(Number(values.damage)) || Number(values.damage) <= 0)
              errors.damage = "Debe ser un número positivo"
            if (!values.effect) errors.effect = "Requerido"
            return errors
          }}
          onSubmit={(values) => {
            const updatedPower:UpdatePower = {
              id: power.id,
               name: values.name,
              attack_power: Number(values.damage),
              power_effect: values.effect
            }
            onSave(updatedPower)
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="name"
                  placeholder="Nombre del poder"
                  className="w-full px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-gray-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <div>
                <Field
                  name="damage"
                  type="number"
                  placeholder="Daño"
                  className="w-full px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-gray-500"
                />
                <ErrorMessage
                  name="damage"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <div>
                <Field
                  name="effect"
                  placeholder="Efecto"
                  className="w-full px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-gray-500"
                />
                <ErrorMessage
                  name="effect"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
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
