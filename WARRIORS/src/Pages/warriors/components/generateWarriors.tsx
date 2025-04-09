import { Breed } from "../../../models/Breed"
import { Power } from "../../../models/Power"
import { TypeWarrior } from "../../../models/TypeWarrior"
import { Warrior } from "../../../models/Warrior"

export async function generateWarriors(): Promise<Warrior[]> {
  const breeds: Breed[] = [
    new Breed(1, "Elfo", "Ágil y silencioso", "Resistencia mágica"),
    new Breed(2, "Orco", "Fuerte y bruto", "Resistencia física"),
    new Breed(3, "Humano", "Equilibrado y adaptable", "Resistencia al cambio"),
    new Breed(4, "Demonio", "Oscuro y poderoso", "Resistencia al fuego"),
  ]

  const types: TypeWarrior[] = [
    new TypeWarrior(1, "Tanque", "Alto nivel de defensa y vida", 20),
    new TypeWarrior(2, "Asesino", "Ataques rápidos y letales", 30),
    new TypeWarrior(3, "Mago", "Control de poderes a distancia", 40),
    new TypeWarrior(4, "Soporte", "Apoya al equipo con curaciones o buffs", 15),
  ]

  const powers: Power[] = [
    new Power(1, "Fuego", 50, "Quema al enemigo"),
    new Power(2, "Hielo", 40, "Ralentiza al enemigo"),
    new Power(3, "Rayo", 60, "Paraliza al enemigo"),
    new Power(4, "Viento", 30, "Empuja al enemigo"),
    new Power(5, "Sombra", 55, "Ciega al enemigo")
  ]

  const warriors: Warrior[] = []

  for (let i = 1; i <= 11; i++) {
    const randomBreed = breeds[Math.floor(Math.random() * breeds.length)]
    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomPowers = [powers[Math.floor(Math.random() * powers.length)]]
  
    warriors.push(new Warrior(
      Date.now() + i,
      `Guerrero ${i}`,
      `https://api.dicebear.com/7.x/adventurer/svg?seed=warrior-${i}`,
      100 + Math.floor(Math.random() * 50),
      50 + Math.floor(Math.random() * 50),
      randomBreed,
      randomType,
      randomPowers
    ))
  }

  return warriors
}
