import { Formik, Form } from "formik"
import React from "react"

interface Props {
  warriorName: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDeleteModal: React.FC<Props> = ({
  warriorName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm text-center">
        <h3 className="text-xl font-bold text-black mb-2">¿Eliminar guerrero?</h3>
        <p className="text-gray-700 mb-4">
          ¿Estás seguro que deseas eliminar <strong>{warriorName}</strong>?
        </p>

        <Formik initialValues={{}} onSubmit={onConfirm}>
          {() => (
            <Form className="flex justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg"
              >
                Eliminar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
