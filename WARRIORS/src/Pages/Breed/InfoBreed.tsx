import LeftHalfModal from "../../components/LeftHalfModal";
import BreedList from "./components/BreedList";

interface InfoBreedProps {
  onClose: () => void;
}

export default function InfoBreed({ onClose }: InfoBreedProps) {
  return (
    <>
      <LeftHalfModal onClose={onClose}>
        <h2 style={{ marginTop: 0, fontSize: "24px" }}>
          🧬 Información de la Raza
        </h2>
        <BreedList />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "30px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              backgroundColor: "#7e22ce",
              color: "#ffffff",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#6b21a8";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#7e22ce";
            }}
          >
            Cerrar
          </button>
        </div>
      </LeftHalfModal>
    </>
  );
}
