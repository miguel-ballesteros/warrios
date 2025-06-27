export class Power {
  constructor(public id: number, public name: string) {}

  static fromJson(json: any): Power {
    return new Power(json.id, json.name)
  }
}

export interface CreatePower {
  name: string,
  attack_power: number,
  power_effect: string
}

export interface UpdatePower {
  id: number,
  name: string,
  attack_power: number,
  power_effect: string
}