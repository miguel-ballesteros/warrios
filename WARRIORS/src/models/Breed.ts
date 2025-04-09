export class Breed {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public breedResistance: string
  ) {}

  static allBreeds: Breed[] = [
    new Breed(1, "Felino", "Ágil y sigiloso", "Alta"),
    new Breed(2, "Canino", "Leal y fuerte", "Media"),
  ];

  static getAll(): Breed[] {
    return this.allBreeds;
  }

  static deleteById(id: number): void {
    this.allBreeds = this.allBreeds.filter(b => b.id !== id);
  }

  static updateBreed(updated: Breed): void {
    this.allBreeds = this.allBreeds.map(b => (b.id === updated.id ? updated : b));
  }

  static create(newBreed: Breed): void {
    const nextId = this.allBreeds.length > 0 ? Math.max(...this.allBreeds.map(b => b.id)) + 1 : 1;
    newBreed.id = nextId;
    this.allBreeds.push(newBreed);
  }
}
