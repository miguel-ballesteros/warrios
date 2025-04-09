import LeftHalfModal from "../../components/LeftHalfModal"
import PowerList from "./components/PowerList"


interface InfoPowerProps {
  onClose: () => void
}

export default function InfoPower({ onClose }: InfoPowerProps) {
  return (
    <LeftHalfModal onClose={onClose}>
      <h2 style={{ marginTop: 0 }}>⚔️ Poderes</h2>
      <PowerList />
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
