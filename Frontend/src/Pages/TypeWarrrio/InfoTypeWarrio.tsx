import LeftHalfModal from "../../components/LeftHalfModal"
import TypeWarriorList from "./components/TypeWarriorList"

interface InfoTypeWarrioProps {
  onClose: () => void
}

export default function InfoTypeWarrio({ onClose }: InfoTypeWarrioProps) {
  return (
    <LeftHalfModal onClose={onClose}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black">Tipos de Guerreros</h2>
        <button
          onClick={onClose}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          Cerrar
        </button>
      </div>

      <TypeWarriorList />
    </LeftHalfModal>
  )
}
