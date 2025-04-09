export class TypeWarrior {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public basePower: number,
    
  ) {}

  static all: TypeWarrior[] = [
    new TypeWarrior(1, "Espadachín", "Guerrero ágil con espada", 80),
    new TypeWarrior(2, "Arquero", "Ataques a distancia", 70),
  ];

  static getAll(): TypeWarrior[] {
    return this.all;
  }

  static deleteById(id: number): void {
    this.all = this.all.filter(t => t.id !== id);
  }

  static update(updated: TypeWarrior): void {
    this.all = this.all.map(t => (t.id === updated.id ? updated : t));
  }

  static create(newType: TypeWarrior): void {
    const nextId = this.all.length > 0 ? Math.max(...this.all.map(t => t.id)) + 1 : 1;
    newType.id = nextId;
    this.all.push(newType);
  }
}
