from abc import ABC, abstractmethod
from loobys.infrastructure.looby_schema import LoobyCreate, LoobyUpdate

class ILoobyService(ABC):

    @abstractmethod
    def create(self, data: LoobyCreate):
        pass

    @abstractmethod
    def get_all(self):
        pass

    @abstractmethod
    def get_by_id(self, looby_id: int):
        pass

    @abstractmethod
    def update(self, looby_id: int, data: LoobyUpdate):
        pass

    @abstractmethod
    def delete(self, looby_id: int):
        pass
