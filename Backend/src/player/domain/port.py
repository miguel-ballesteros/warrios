from abc import ABC, abstractmethod
from typing import List, Optional
from src.player.infrastructure.player_schema import PlayerCreate, PlayerUpdate


class PlayerRepositoryPort(ABC):
    @abstractmethod
    def create(self, player: PlayerCreate): pass

    @abstractmethod
    def get_all(self) -> List[dict]: pass

    @abstractmethod
    def get_by_id(self, id_: str) -> Optional[dict]: pass

    @abstractmethod
    def update(self, id_: str, data: PlayerUpdate) -> Optional[dict]: pass

    @abstractmethod
    def delete(self, id_: str) -> bool: pass
