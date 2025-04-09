import { Warrior } from "./Warrior";

export class Player {
  constructor(
    public id: number,
    public name: string,
    public nickname: string,
    public record: number,
    public life: number,
    public warriors: Warrior[] = [],

  ) {}

  assignWarrior(warrior: Warrior) {
    this.warriors.push(warrior);
  }

  removeWarrior(warriorId: number) {
    this.warriors = this.warriors.filter(w => w.id !== warriorId);
  }

  listWarriors(): Warrior[] {
    return this.warriors;
  }

  updateInfo(newName: string, newNickname: string, newImage?: string) {
    this.name = newName;
    this.nickname = newNickname;
    if (newImage !== undefined) {
      this.image = newImage;
    }
  }

  static deletePlayerById(playerId: number): Player[] {
    const storedPlayers = localStorage.getItem("players");
    if (!storedPlayers) return [];

    const players: Player[] = JSON.parse(storedPlayers);
    const updatedPlayers = players.filter((player) => player.id !== playerId);

    localStorage.setItem("players", JSON.stringify(updatedPlayers));
    return updatedPlayers;
  }
}
