from abc import ABC, abstractmethod
from typing import List, Optional
from breed.infrastructure.breed_schema import BreedCreate, BreedUpdate, BreedOut

class BreedRepositoryPort(ABC):
    @abstractmethod
    def create(self, breed_data: BreedCreate) -> BreedOut:
        pass

    @abstractmethod
    def get_all(self) -> List[BreedOut]:
        pass

    @abstractmethod
    def get_by_id(self, id_: int) -> Optional[BreedOut]:
        pass

    @abstractmethod
    def update(self, id_: int, breed_data: BreedUpdate) -> Optional[BreedOut]:
        pass

    @abstractmethod
    def delete(self, id_: int) -> bool:
        pass
