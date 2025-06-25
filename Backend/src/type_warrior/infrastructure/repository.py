from sqlalchemy.orm import Session
from models.models import TypeWarrior
from typing import Optional, List, Dict
from type_warrior.infrastructure.typewarrior_schema import TypeWarriorUpdate
from type_warrior.domain.port import TypeWarriorRepositoryPort


class TypeWarriorRepository(TypeWarriorRepositoryPort):
    def __init__(self, db: Session):
        self.db = db

    def create(self, name: str, description: str) -> Dict:
        db_item = TypeWarrior(name=name, description=description)
        self.db.add(db_item)
        self.db.commit()
        self.db.refresh(db_item)
        return db_item.__dict__

    def get_all(self) -> List[Dict]:
        return [item.__dict__ for item in self.db.query(TypeWarrior).all()]

    def get_by_id(self, id_: int) -> Optional[Dict]:
        db_item = self.db.query(TypeWarrior).filter(TypeWarrior.id == id_).first()
        return db_item.__dict__ if db_item else None

    def update(self, id_: int, name: str, description: str) -> Optional[Dict]:
        db_item = self.db.query(TypeWarrior).filter(TypeWarrior.id == id_).first()
        if db_item:
            db_item.name = name
            db_item.description = description
            self.db.commit()
            self.db.refresh(db_item)
            return db_item.__dict__
        return None

    def delete(self, id_: int) -> bool:
        db_item = self.db.query(TypeWarrior).filter(TypeWarrior.id == id_).first()
        if db_item:
            self.db.delete(db_item)
            self.db.commit()
            return True
        return False
