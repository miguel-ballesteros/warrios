import { Breed } from "./Breed";
import { Power } from "./Power";
import { TypeWarrior } from "./TypeWarrior";

export class Warrior {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public health: number,
    public energy: number,
    public breed: Breed,
    public typeWarrior: TypeWarrior,
    public powers: Power[] = []
  ) {}

  assignBreed(breed: Breed) {
    this.breed = breed;
  }

  assignTypeWarrior(type: TypeWarrior) {
    this.typeWarrior = type;
  }

  addPower(power: Power) {
    if (this.powers.length < 5) {
      this.powers.push(power);
    } else {
      throw new Error("Un guerrero no puede tener más de 5 poderes.");
    }
  }

  assignPowers(powers: Power[]) {
    if (powers.length > 5) {
      throw new Error("Un guerrero no puede tener más de 5 poderes.");
    }
    this.powers = powers;
  }

  static create(
    name: string,
    image: string,
    health: number,
    energy: number,
    breed: Breed,
    typeWarrior: TypeWarrior,
    powers: Power[]
  ): Warrior {
    if (powers.length > 5) {
      throw new Error("Un guerrero no puede tener más de 5 poderes.");
    }

    return new Warrior(
      Date.now(),
      name,
      image,
      health,
      energy,
      breed,
      typeWarrior,
      powers
    );
  }

  update(
    name: string,
    health: number,
    energy: number,
  ) {
    this.name = name;
    this.health = health;
    this.energy = energy;
  }

  static deleteById(list: Warrior[], warriorId: number): Warrior[] {
    return list.filter(w => w.id !== warriorId);
  }

  static searchByName(warriors: Warrior[], searchTerm: string): Warrior[] {
    return warriors.filter(warrior =>
      warrior.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
