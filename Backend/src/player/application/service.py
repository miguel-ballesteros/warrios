from src.player.domain.port import PlayerRepositoryPort
from src.player.infrastructure.player_schema import PlayerCreate, PlayerUpdate


class PlayerService:
    def __init__(self, repo: PlayerRepositoryPort):
        self.repo = repo

    def create(self, command: PlayerCreate):
        return self.repo.create(command)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, id_: str):
        return self.repo.get_by_id(id_)

    def update(self, id_: str, command: PlayerUpdate):
        return self.repo.update(id_, command)

    def delete(self, id_: str):
        return self.repo.delete(id_)
