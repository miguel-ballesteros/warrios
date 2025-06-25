from games.infrastructure.repository import GameRepository
from games.infrastructure.game_schema import GameCreate, GameUpdate
from games.domain.port import IGameService

class GameService(IGameService):
    def __init__(self, repo: GameRepository):
        self.repo = repo

    def create(self, data: GameCreate):
        return self.repo.create(data)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, game_id: int):
        return self.repo.get_by_id(game_id)

    def update(self, game_id: int, data: GameUpdate):
        return self.repo.update(game_id, data)

    def delete(self, game_id: int):
        return self.repo.delete(game_id)
