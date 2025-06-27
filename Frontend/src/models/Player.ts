export class Player {
  constructor(
    public id: string,
    public name: string,
    public nickname: string,
    public life: number,
    public record: number,
  ) {}
  static fromJson(data: any): Player {
    return new Player(
      data.id_player,
      data.name ?? "", // si no llega el campo name, por fallback
      data.nickname,
      data.life,
      data.record
    )
  }
}
