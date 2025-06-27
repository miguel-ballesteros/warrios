export class Breed {
  constructor(public id: number, public name: string) {}


  static fromJson(json: any): Breed {
    return new Breed(json.id, json.name)
  }
}
 export interface CreateBreed {
  name: string;
  breedResistance: string;
}
export interface EditBrred {
  id: number;
  name: string;
  breedResistance: string;
}