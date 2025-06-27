from sqlalchemy.orm import Session
from models.models import Users
from src.users.infrastructure.user_schema import UserCreate

class UserRepository:
    def create(self, db: Session, user_data: UserCreate):
        user = Users(**user_data.dict())
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def get_by_email(self, db: Session, email: str):
        return db.query(Users).filter(Users.user_email == email).first()

    def get_all(self, db: Session):
        return db.query(Users).all()

    def get_by_id(self, db: Session, user_id: int):
        return db.query(Users).filter(Users.id == user_id).first()

    def update(self, db: Session, user_id: int, user_data: UserCreate):
        user = self.get_by_id(db, user_id)
        if user:
            for key, value in user_data.dict().items():
                setattr(user, key, value)
            db.commit()
            db.refresh(user)
        return user

    def delete(self, db: Session, user_id: int):
        user = self.get_by_id(db, user_id)
        if user:
            db.delete(user)
            db.commit()
            return True
        return False