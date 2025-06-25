from .command import CreateTypeWarriorCommand, UpdateTypeWarriorCommand
from ..domain.port import TypeWarriorRepositoryPort


class TypeWarriorService:
    def __init__(self, repo: TypeWarriorRepositoryPort):
        self.repo = repo

    def create(self, command: CreateTypeWarriorCommand):
        return self.repo.create(command.name, command.description)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, id_: int):
        return self.repo.get_by_id(id_)

    def update(self, id_: int, command: UpdateTypeWarriorCommand):
        return self.repo.update(id_, command.name, command.description)

    def delete(self, id_: int):
        return self.repo.delete(id_)
