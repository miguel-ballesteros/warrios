from sqlalchemy.orm import Session
from models.models import Warriors
from warrior.infrastructure.warrior_schema import WarriorCreate, WarriorUpdate

class WarriorRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: WarriorCreate):
        db_item = Warriors(**data.dict())
        self.db.add(db_item)
        self.db.commit()
        self.db.refresh(db_item)
        return db_item

    def get_all(self):
        return self.db.query(Warriors).all()

    def get_by_id(self, id_: int):
        return self.db.query(Warriors).filter(Warriors.warrior_id == id_).first()

    def update(self, id_: int, data: WarriorUpdate):
        db_item = self.get_by_id(id_)
        if db_item:
            for key, value in data.dict(exclude_unset=True).items():
                setattr(db_item, key, value)
            self.db.commit()
            self.db.refresh(db_item)
            return db_item
        return None

    def delete(self, id_: int):
        db_item = self.get_by_id(id_)
        if db_item:
            self.db.delete(db_item)
            self.db.commit()
            return True
        return False