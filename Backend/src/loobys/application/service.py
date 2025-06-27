from src.loobys.infrastructure.repository import LoobyRepository
from src.loobys.infrastructure.looby_schema import LoobyCreate, LoobyUpdate
from src.loobys.domain.port import ILoobyService

class LoobyService(ILoobyService):
    def __init__(self, repo: LoobyRepository):
        self.repo = repo

    def create(self, data: LoobyCreate):
        return self.repo.create(data)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, looby_id: int):
        return self.repo.get_by_id(looby_id)

    def update(self, looby_id: int, data: LoobyUpdate):
        return self.repo.update(looby_id, data)

    def delete(self, looby_id: int):
        return self.repo.delete(looby_id)
