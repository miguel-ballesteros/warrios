import { Breed } from "../models/Breed";
import { Power } from "../models/Power";
import { TypeWarrior } from "../models/TypeWarrior";

// Crea una raza (Breed)
export const createBreed = (id: number, name: string): Breed => {
  return new Breed(
    id,
    name,
    `Descripción de la raza ${name}`,
    "Alta resistencia mágica"
  );
};

export const createTypeWarrior = (id: number, name: string): TypeWarrior => {
  return new TypeWarrior(
    id,
    name,
    `Tipo de guerrero especializado: ${name}`
  );
};

export const createPower = (id: number, name: string): Power => {
  return new Power(
    id,
    name,
    Math.floor(Math.random() * 100),
    `Efecto especial de ${name}`
  );
};
