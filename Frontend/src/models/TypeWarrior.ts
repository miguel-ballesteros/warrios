export class TypeWarrior {
  constructor(public id: number, public name: string) {}

  static fromJson(json: any): TypeWarrior {
    return new TypeWarrior(json.id, json.name)
  }
}

export interface CreateTypeWarrior {
  name: string
  description: string
}

export interface EditTypeWarrior {
  id: number
  name: string
  description: string
}