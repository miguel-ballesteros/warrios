export interface Breed {
  name: string;
}

export interface TypeWarrior {
  name: string;
}

export interface Power {
  name: string;
}

export interface Warrior {
  id: number;
  name: string;
  life: number;
  energy: number;
  breed: Breed;
  type: TypeWarrior;
  power: Power;
}
