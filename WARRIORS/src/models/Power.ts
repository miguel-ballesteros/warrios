export class Power {
  static powers: Power[] = [
    new Power(1, "Fuego", 50, "Quema"),
    new Power(2, "Hielo", 40, "Congela"),
    new Power(3, "Rayo", 60, "Parálisis")
  ];

  constructor(
    public id: number,
    public name: string,
    public damage: number,
    public effect: string
  ) {}

  static getAll(): Power[] {
    return Power.powers;
  }

  static create(power: Power) {
    power.id = Date.now();
    Power.powers.push(power);
  }

  static update(updated: Power) {
    const index = Power.powers.findIndex((p) => p.id === updated.id);
    if (index !== -1) {
      Power.powers[index] = updated;
    }
  }

  static deleteById(id: number) {
    Power.powers = Power.powers.filter((p) => p.id !== id);
  }
}
