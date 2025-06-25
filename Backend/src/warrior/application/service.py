from warrior.infrastructure.warrior_schema import WarriorCreate, WarriorUpdate
from warrior.infrastructure.repository import WarriorRepository

class WarriorService:
    def __init__(self, repo: WarriorRepository):
        self.repo = repo

    def create(self, command: WarriorCreate):
        return self.repo.create(command)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, id_: int):
        return self.repo.get_by_id(id_)

    def update(self, id_: int, command: WarriorUpdate):
        return self.repo.update(id_, command)

    def delete(self, id_: int):
        return self.repo.delete(id_)