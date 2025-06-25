import LeftHalfModal from "../../components/LeftHalfModal"
import TypeWarriorList from "./components/TypeWarriorList"

interface InfoTypeWarrioProps {
  onClose: () => void
}

export default function InfoTypeWarrio({ onClose }: InfoTypeWarrioProps) {
  return (
    <LeftHalfModal onClose={onClose}>
      <h2 style={{ marginTop: 0 }}>Tipos de Guerreros</h2>
      <TypeWarriorList />
      <button
        onClick={onClose}
        style={{
          marginTop: "24px",
          padding: "8px 16px",
          borderRadius: "8px",
          backgroundColor: "#9333ea",
          color: "#fff",
          cursor: "pointer",
          float: "right"
        }}
      >
        Cerrar
      </button>
    </LeftHalfModal>
  )
}
