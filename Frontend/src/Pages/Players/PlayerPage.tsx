import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Warrior } from "../../models/Warrior"
import { Formik, Form, Field } from "formik"
import { loginUser, registerUser } from "./service/service"

interface Player {
  id: number
  name: string
  nickname: string
  record: number
  life: number
  warriors: Warrior[]
}

export default function PlayerPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [isJoining, setIsJoining] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players")
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers))
    }
  }, [])

  const savePlayersToStorage = (playersToSave: Player[]) => {
    localStorage.setItem("players", JSON.stringify(playersToSave))
  }

  const onSubmit = (values: { user_name: string; user_email: string; user_password: string }, { resetForm }: any) => {
    if (isRegistering) {
      const payload = {
        user_name: values.user_name,
        user_email: values.user_email,
        user_password: values.user_password,
        user_created: new Date().toISOString().split("T")[0],
      }
      registerUser(payload)
        .then(() => {
          resetForm()
          setIsRegistering(false)
        })
        .catch((error) => {
          console.error("Error en registro:", error)
          alert("Error al registrarse")
        })
    } else {
      const payload = {
        user_email: values.user_email,
        user_password: values.user_password,
      }
      loginUser(payload)
        .then((resp) => {
          localStorage.setItem("User", JSON.stringify(resp?.data))
          setIsAuthModalOpen(false)
          navigate(`/profile`)
        })
        .catch((error) => {
          console.error("Error en login:", error)
          alert("Credenciales incorrectas o error del servidor")
        })
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="m-2 p-2 border-4 border-black rounded-2xl bg-white shadow-lg flex justify-between items-center text-black font-mono tracking-wide">
        <h1 className="text-3xl font-extrabold flex items-center gap-2 drop-shadow-sm uppercase">
          Guerreros
        </h1>
        <div className="space-x-4">
          <button
            className="px-4 py-2 text-sm font-semibold border border-black rounded-full hover:bg-black hover:text-white transition duration-200"
            onClick={() => {
              setIsRegistering(false)
              setIsAuthModalOpen(true)
            }}
          >
            Iniciar sesión
          </button>
          <button
            className="bg-black text-white hover:bg-white hover:text-black px-4 py-2 rounded-full text-sm font-bold border-2 border-black transition duration-200"
            onClick={() => setIsJoining(true)}
          >
            Unirse a sala
          </button>
        </div>
      </nav>

      <div className="flex-grow flex justify-center items-center p-8">
        <h2 className="text-3xl text-black font-extrabold font-mono tracking-wide uppercase border-4 border-black rounded-xl px-6 py-4 bg-white shadow-md">
          Bienvenido al lobby de guerreros
        </h2>
      </div>

      {isJoining && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl animate-slide-in relative border-4 border-black">
            <button
              className="absolute top-2 right-3 text-black hover:text-white bg-white hover:bg-black border border-black rounded-full w-8 h-8 flex items-center justify-center font-bold transition"
              onClick={() => setIsJoining(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-black mb-6 font-mono uppercase text-center">
              Crea tu perfil de jugador
            </h2>

            <Formik
              initialValues={{ name: "", nickname: "", record: 0, life: 100 }}
              onSubmit={(values) => {
                const newPlayer: Player = {
                  id: Date.now(),
                  name: values.name,
                  nickname: values.nickname,
                  record: Number(values.record),
                  life: Number(values.life),
                  warriors: [],
                }

                const updatedPlayers = [...players, newPlayer]
                setPlayers(updatedPlayers)
                savePlayersToStorage(updatedPlayers)
                localStorage.setItem("selectedPlayerId", String(newPlayer.id))
                setIsJoining(false)
                navigate(`/warriors/player/${newPlayer.id}`)
              }}
            >
              {() => (
                <Form className="space-y-4">
                  <Field
                    name="name"
                    placeholder="Nombre"
                    className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none"
                  />
                  <Field
                    name="nickname"
                    placeholder="Nickname"
                    className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none"
                  />
                  <Field
                    name="record"
                    type="number"
                    placeholder="Record"
                    className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none"
                  />
                  <Field
                    name="life"
                    type="number"
                    placeholder="Vida"
                    className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none"
                  />
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setIsJoining(false)}
                      className="px-4 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-black text-white font-semibold rounded-lg border-2 border-black hover:bg-white hover:text-black transition"
                    >
                      Crear y Unirse
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white border-4 border-black rounded-xl p-8 w-full max-w-md shadow-xl relative animate-slide-in">
            <button
              className="absolute top-2 right-3 text-black hover:text-white bg-white hover:bg-black border border-black rounded-full w-8 h-8 flex items-center justify-center font-bold transition"
              onClick={() => setIsAuthModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-black mb-6 font-mono uppercase text-center">
              {isRegistering ? "Crear cuenta" : "Iniciar sesión"}
            </h2>

            <Formik
              initialValues={{
                user_name: "",
                user_email: "",
                user_password: "",
              }}
              onSubmit={onSubmit}
            >
              {() => (
                <Form className="space-y-4">
                  {isRegistering && (
                    <Field
                      name="user_name"
                      placeholder="Nombre de usuario"
                      className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none"
                    />
                  )}
                  <Field
                    name="user_email"
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none"
                  />
                  <Field
                    name="user_password"
                    type="password"
                    placeholder="Contraseña"
                    className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none"
                  />
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setIsRegistering(!isRegistering)}
                      className="px-4 py-2 border border-black rounded-lg text-black hover:bg-black hover:text-white transition"
                    >
                      {isRegistering ? "¿Ya tienes cuenta?" : "¿Crear cuenta?"}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-black text-white font-semibold rounded-lg border-2 border-black hover:bg-white hover:text-black transition"
                    >
                      {isRegistering ? "Registrarse" : "Entrar"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  )
}
