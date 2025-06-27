from src.breed.infrastructure.breed_schema import BreedCreate, BreedUpdate
from src.breed.domain.port import BreedRepositoryPort

class BreedService:
    def __init__(self, repo: BreedRepositoryPort):
        self.repo = repo

    def create(self, breed_data: BreedCreate):
        return self.repo.create(breed_data)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, id_: int):
        return self.repo.get_by_id(id_)

    def update(self, id_: int, breed_data: BreedUpdate):
        return self.repo.update(id_, breed_data)

    def delete(self, id_: int):
        return self.repo.delete(id_)
