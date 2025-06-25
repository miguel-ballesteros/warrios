from abc import ABC, abstractmethod
from games.infrastructure.game_schema import GameCreate, GameUpdate

class IGameService(ABC):

    @abstractmethod
    def create(self, data: GameCreate):
        pass

    @abstractmethod
    def get_all(self):
        pass

    @abstractmethod
    def get_by_id(self, game_id: int):
        pass

    @abstractmethod
    def update(self, game_id: int, data: GameUpdate):
        pass

    @abstractmethod
    def delete(self, game_id: int):
        pass
