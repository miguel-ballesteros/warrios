import { Breed } from "./Breed"
import { TypeWarrior } from "./TypeWarrior"
import { Power } from "./Power"

export class Warrior {
  constructor(
    public id: number,
    public name: string,
    public health: number,
    public energy: number,
    public image?: string,
    public breed?: Breed,
    public typeWarrior?: TypeWarrior,
    public powers: Power[] = []
  ) {}


  static fromJson(json: any): Warrior {
    return new Warrior(
      json.id,
      json.name,
      json.health,
      json.energy,
      json.image,
      json.breed ? Breed.fromJson(json.breed) : undefined,
      json.typeWarrior ? TypeWarrior.fromJson(json.typeWarrior) : undefined,
      json.powers ? json.powers.map((p: any) => Power.fromJson(p)) : []
    )
  }
}

export interface CreateWarrior {
  warrior_name: string,
  image: string,
  warriors_health: number,
  warriors_energy: number,
  breed_fk: number,
  type_Warrior_fk: number,
  power_fk: number
}
export interface UpdateWarrior {
  id: number,
  warrior_name: string,
  warriors_health: number,
  warriors_energy: number,
  breed_fk: number,
  type_Warrior_fk: number,
  power_fk: number
}