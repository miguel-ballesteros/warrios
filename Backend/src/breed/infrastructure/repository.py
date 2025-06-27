from sqlalchemy.orm import Session
from models.models import Breed
from src.breed.infrastructure.breed_schema import BreedCreate, BreedUpdate

class BreedRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, breed_data: BreedCreate):
        db_item = Breed(**breed_data.dict())
        self.db.add(db_item)
        self.db.commit()
        self.db.refresh(db_item)
        return db_item

    def get_all(self):
        return self.db.query(Breed).all()

    def get_by_id(self, id_: int):
        return self.db.query(Breed).filter(Breed.id == id_).first()

    def update(self, id_: int, breed_data: BreedUpdate):
        db_item = self.get_by_id(id_)
        if db_item:
            for key, value in breed_data.dict(exclude_unset=True).items():
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
