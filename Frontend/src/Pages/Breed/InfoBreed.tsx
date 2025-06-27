import LeftHalfModal from "../../components/LeftHalfModal"
import BreedList from "./components/BreedList"

interface InfoBreedProps {
  onClose: () => void
}

export default function InfoBreed({ onClose }: InfoBreedProps) {
  return (
    <LeftHalfModal onClose={onClose}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black">Información de la Raza</h2>
        <button
          onClick={onClose}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          Cerrar
        </button>
      </div>

      <BreedList />
    </LeftHalfModal>
  )
}
