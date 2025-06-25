from sqlalchemy.orm import Session
from models.models import Loobys
from loobys.infrastructure.looby_schema import LoobyCreate, LoobyUpdate

class LoobyRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: LoobyCreate):
        db_looby = Loobys(**data.dict())
        self.db.add(db_looby)
        self.db.commit()
        self.db.refresh(db_looby)
        return db_looby

    def get_all(self):
        return self.db.query(Loobys).all()

    def get_by_id(self, looby_id: int):
        return self.db.query(Loobys).filter(Loobys.looby_id == looby_id).first()

    def update(self, looby_id: int, data: LoobyUpdate):
        db_looby = self.get_by_id(looby_id)
        if db_looby:
            for key, value in data.dict(exclude_unset=True).items():
                setattr(db_looby, key, value)
            self.db.commit()
            self.db.refresh(db_looby)
            return db_looby
        return None

    def delete(self, looby_id: int):
        db_looby = self.get_by_id(looby_id)
        if db_looby:
            self.db.delete(db_looby)
            self.db.commit()
            return True
        return False
